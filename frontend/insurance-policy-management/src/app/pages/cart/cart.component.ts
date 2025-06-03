import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { UserPolicyService } from '../../services/userpolicy.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  isAddingPolicy = false;

  showBeneficiaryModal = false;
  beneficiaryName = '';
  currentPolicy: any = null;

  isRemoving = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private userPolicyService: UserPolicyService
  ) {}

  ngOnInit(): void {
    const savedCart = localStorage.getItem('cart');
    this.cartItems = savedCart ? JSON.parse(savedCart) : [];

    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  openBeneficiaryModal(policy: any) {
    if (this.isAddingPolicy) return;
    this.currentPolicy = policy;
    this.beneficiaryName = '';
    this.showBeneficiaryModal = true;
  }

  closeBeneficiaryModal() {
    this.showBeneficiaryModal = false;
    this.beneficiaryName = '';
    this.currentPolicy = null;
  }

  submitBeneficiary() {
    if (!this.beneficiaryName.trim()) {
      this.toastr.info('Beneficiary name is required.');
      return;
    }
    if (!this.currentPolicy) return;

    this.isAddingPolicy = true;

    const userID = Number(this.userService.getUserId());
    if (!userID) {
      this.toastr.error('User not logged in or invalid user ID.');
      this.isAddingPolicy = false;
      return;
    }

    const userPolicy = {
      policyID: this.currentPolicy.policyID,
      userID: userID,
      beneficiaryName: this.beneficiaryName.trim(),
    };

    this.userPolicyService.addUserPolicy(userPolicy).subscribe({
      next: () => {
        this.toastr.success(`Policy ID ${this.currentPolicy.policyID} added successfully.`, 'Success');
        // Remove added policy from cart
        this.removeFromCart(this.currentPolicy.policyID, false); // false = no toastr on remove here
        this.closeBeneficiaryModal();
        this.isAddingPolicy = false;
      },
      error: (err) => {
        this.toastr.error(err?.error || 'Failed to add policy.', 'Error');
        this.isAddingPolicy = false;
      }
    });
  }

  removeFromCart(policyID: string, showToastr = true): void {
    if (this.isRemoving) return;
    this.isRemoving = true;

    this.cartItems = this.cartItems.filter(item => item.policyID !== policyID);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    if (showToastr) this.toastr.warning('Policy removed from cart.');

    setTimeout(() => this.isRemoving = false, 500);
  }

  goBack(): void {
    this.router.navigate(['/explore-policies']);
  }
}
