using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InsuranceApi.Data;
using InsuranceApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InsuranceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserPolicyController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserPolicyController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/UserPolicy
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserPolicy>>> GetUserPolicies()
        {
            return await _context.UserPolicies
                .Include(up => up.User)
                .Include(up => up.Policy)
                .ToListAsync();
        }

        // GET: api/UserPolicy/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<UserPolicy>>> GetPoliciesForUser(int userId)
        {
            var userPolicies = await _context.UserPolicies
                .Include(up => up.User)
                .Include(up => up.Policy)
                .Where(up => up.UserID == userId)
                .ToListAsync();

            if (userPolicies == null || userPolicies.Count == 0)
                return NotFound($"No policies found for user ID {userId}.");

            return userPolicies;
        }

        // POST: api/UserPolicy (Only needs userID, policyID, and beneficiaryName)
        [HttpPost]
        public async Task<ActionResult<UserPolicy>> PostUserPolicy(UserPolicy userPolicy)
        {
            if (userPolicy == null)
                return BadRequest("UserPolicy data is required.");

            // Fetch related entities
            var user = await _context.UserProfiles.FindAsync(userPolicy.UserID);
            var policy = await _context.Policies.FindAsync(userPolicy.PolicyID);

            if (user == null)
                return BadRequest($"User with ID {userPolicy.UserID} does not exist.");

            if (policy == null)
                return BadRequest($"Policy with ID {userPolicy.PolicyID} does not exist.");

            var exists = await _context.UserPolicies
                .AnyAsync(up => up.UserID == userPolicy.UserID && up.PolicyID == userPolicy.PolicyID);

            if (exists)
                return BadRequest("UserPolicy entry already exists.");

            // Assign related data
            userPolicy.User = user;
            userPolicy.Policy = policy;

            _context.UserPolicies.Add(userPolicy);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Internal server error: {ex.InnerException?.Message ?? ex.Message}");
            }

            return CreatedAtAction(nameof(GetPoliciesForUser), new { userId = userPolicy.UserID }, userPolicy);
        }

        // DELETE: api/UserPolicy/{userId}/{policyId}
        [HttpDelete("{userId}/{policyId}")]
        public async Task<IActionResult> DeleteUserPolicy(int userId, string policyId)
        {
            var userPolicy = await _context.UserPolicies
                .FirstOrDefaultAsync(up => up.UserID == userId && up.PolicyID == policyId);

            if (userPolicy == null)
                return NotFound();

            _context.UserPolicies.Remove(userPolicy);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Internal server error: {ex.InnerException?.Message ?? ex.Message}");
            }

            return NoContent();
        }

        // GET: api/UserPolicy/search?userId=1&policyId=POL6000&policyType=Travel&premiumFrequency=Monthly
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<UserPolicy>>> SearchUserPolicies(
            [FromQuery] int userId,
            [FromQuery] string? policyId,
            [FromQuery] string? policyType,
            [FromQuery] string? premiumFrequency)
        {
            var query = _context.UserPolicies
                .Include(up => up.Policy)
                .Include(up => up.User)
                .Where(up => up.UserID == userId)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(policyId))
            {
                query = query.Where(up => EF.Functions.Like(up.Policy.PolicyID, $"%{policyId}%"));
            }

            if (!string.IsNullOrWhiteSpace(policyType))
            {
                query = query.Where(up => up.Policy.PolicyType != null &&
                                          up.Policy.PolicyType.ToLower() == policyType.ToLower());
            }

            if (!string.IsNullOrWhiteSpace(premiumFrequency))
            {
                query = query.Where(up => up.Policy.PremiumFrequency != null &&
                                          up.Policy.PremiumFrequency.ToLower() == premiumFrequency.ToLower());
            }

            var results = await query.ToListAsync();

            if (!results.Any())
                return NotFound("No matching policies found for this user.");

            return results;
        }
    }
}