import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {
  allPolicies: any[] = [];
  filteredPolicies: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  searchQuery = '';

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const userId = this.userService.getUserId();
    if (userId) {
      this.userService.getPoliciesByUserId(userId).subscribe({
        next: (data) => {
          this.allPolicies = data;
          this.filteredPolicies = data;
        },
        error: (err) => {
          console.error('Failed to load policies:', err);
        }
      });
    }
  }

  searchPolicies(): void {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredPolicies = this.allPolicies.filter(policy =>
      (policy.policyID && policy.policyID.toLowerCase().includes(query)) ||
      (policy.policyType && policy.policyType.toLowerCase().includes(query)) ||
      (policy.premiumFrequency && policy.premiumFrequency.toLowerCase().includes(query)) ||
      (policy.policy?.policyType && policy.policy.policyType.toLowerCase().includes(query)) ||
      (policy.policy?.premiumFrequency && policy.policy.premiumFrequency.toLowerCase().includes(query)) ||
      (policy.beneficiaryName && policy.beneficiaryName.toLowerCase().includes(query))
    );
    this.currentPage = 1; // Reset to first page on search
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

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
