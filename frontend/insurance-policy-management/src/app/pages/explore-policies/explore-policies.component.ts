import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PolicyService } from '../../services/policy.service';

@Component({
  selector: 'app-explore-policies',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './explore-policies.component.html',
  styleUrls: ['./explore-policies.component.scss']
})
export class ExplorePoliciesComponent implements OnInit {
  allPolicies: any[] = [];
  filteredPolicies: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  searchQuery = '';

  constructor(private policyService: PolicyService, private router: Router) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.policyService.getPolicies().subscribe({
      next: (data) => {
        this.allPolicies = data;
        this.filteredPolicies = data;
        this.setPage(1); // reset pagination
      },
      error: (err) => console.error('Failed to load policies', err)
    });
  }

  searchPolicies(): void {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredPolicies = this.allPolicies.filter(policy =>
      (policy.policyID && policy.policyID.toLowerCase().includes(query)) ||
      (policy.policyType && policy.policyType.toLowerCase().includes(query)) ||
      (policy.premiumFrequency && policy.premiumFrequency.toLowerCase().includes(query))
    );
    this.setPage(1); // reset to first page on search
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPolicies.length / this.itemsPerPage);
  }

  get paginatedPolicies(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPolicies.slice(start, start + this.itemsPerPage);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  addToCart(policyId: number): void {
    this.policyService.addToCart(policyId).subscribe({
      next: () => alert(`Policy ${policyId} added to cart successfully!`),
      error: () => alert('Failed to add policy to cart.')
    });
  }

  goBack(): void {
    this.router.navigate(['/customer-dashboard']);
  }
}
