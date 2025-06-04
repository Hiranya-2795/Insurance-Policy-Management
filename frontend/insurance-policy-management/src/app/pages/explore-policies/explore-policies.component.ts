import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PolicyService } from '../../services/policy.service';
import { CartService } from '../../services/cart.service';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

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
  cartCount: number = 0;
  isAdding = false;

  // ✅ Toast configuration
  private toastConfig: Partial<IndividualConfig> = {
    positionClass: 'toast-top-center',
    timeOut: 2000,
    closeButton: true,
    progressBar: true
  };

  constructor(
    private policyService: PolicyService,
    private router: Router,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadPolicies();
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  loadPolicies(): void {
    this.policyService.getPolicies().subscribe({
      next: (data) => {
        this.allPolicies = data;
        this.filteredPolicies = data;
        this.setPage(1);
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
    this.setPage(1);
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

  addToCart(policy: any): void {
    if (this.isAdding) return;
    this.isAdding = true;

    const alreadyInCart = this.cartService.getCartItems().some((item: any) => item.policyID === policy.policyID);

    if (!alreadyInCart) {
      this.cartService.addToCart(policy);
      this.toastr.success('Policy added to cart!', '', this.toastConfig); // ✅ using toastConfig
    } else {
      this.toastr.info('This policy is already in the cart.', '', this.toastConfig); // ✅ using toastConfig
    }

    setTimeout(() => this.isAdding = false, 500);
  }

  goBack(): void {
    this.router.navigate(['/customer-dashboard']);
  }
}
