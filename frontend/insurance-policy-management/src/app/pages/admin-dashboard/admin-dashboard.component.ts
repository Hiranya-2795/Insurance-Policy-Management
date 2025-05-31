import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PolicyService,Policy } from '../../services/policy.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  allPolicies: any[] = [];
  filteredPolicies: any[] = [];
  policies: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  searchQuery = '';
  loading: boolean = false;
  error: string = '';


  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.fetchPolicies();
  }

  fetchPolicies(): void {
    this.loading = true;
    this.policyService.getPolicies().subscribe({
      next: (data) => {
        this.policies = data;
        this.filteredPolicies = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching policies:', err);
        this.error = 'Failed to load policies.';
        this.loading = false;
      }
    });
  }

  searchPolicies(): void {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredPolicies = this.policies.filter(policy =>
      policy.policyID.toLowerCase().includes(query) ||
      policy.policyType.toLowerCase().includes(query) ||
      policy.premiumFrequency.toLowerCase().includes(query)
    );

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

}