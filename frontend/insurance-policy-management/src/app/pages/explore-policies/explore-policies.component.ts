import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
  ownedPolicies: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  searchQuery = '';
  cartCount: number = 0;
  isAdding = false;
  userId: number = 0;

  private toastConfig: Partial<IndividualConfig> = {
    positionClass: 'toast-top-center',
    timeOut: 2000,
    closeButton: true,
    progressBar: true
  };

  constructor(
    private policyService: PolicyService,
    private cartService: CartService,
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      this.userId = userObj.userId || userObj.id || 0;
    }

    this.loadPolicies();
    this.loadOwnedPolicies();

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

  loadOwnedPolicies(): void {
    if (!this.userId) return;

    const apiUrl = `https://localhost:7268/api/UserPolicy/user/${this.userId}`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.ownedPolicies = data || [];
      },
      error: (err) => {
        console.error('Failed to fetch owned policies:', err);
        this.toastr.error('Could not load your owned policies', '', this.toastConfig);
      }
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

    const alreadyInCart = this.cartService.getCartItems().some(
      (item: any) => item.policyID === policy.policyID
    );

    const alreadyOwned = this.ownedPolicies.some(
      (owned: any) => owned.policyID === policy.policyID
    );

    if (alreadyOwned) {
      this.toastr.info('You already own this policy.', '', this.toastConfig);
    } else if (alreadyInCart) {
      this.toastr.info('This policy is already in the cart.', '', this.toastConfig);
    } else {
      this.cartService.addToCart(policy);
      this.toastr.success('Policy added to cart!', '', this.toastConfig);
    }

    setTimeout(() => this.isAdding = false, 500);
  }

  goBack(): void {
    this.router.navigate(['/customer-dashboard']);
  }
}
