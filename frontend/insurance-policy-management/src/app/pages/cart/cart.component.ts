import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { UserPolicyService } from '../../services/userpolicy.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

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
  userID: string | null = null;

  // ✅ Toast configuration with position
  private toastConfig: Partial<IndividualConfig> = {
    positionClass: 'toast-top-center',
    timeOut: 2000,
    closeButton: true,
    progressBar: true
  };

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private userPolicyService: UserPolicyService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.userID = this.userService.getUserId();
    if (!this.userID) {
      this.toastr.info('Please log in to manage your cart.', '', this.toastConfig);
      this.cartItems = [];
    } else {
      this.cartItems = this.cartService.getCartItems();
    }
  }

  openBeneficiaryModal(policy: any): void {
    if (this.isAddingPolicy) return;
    this.currentPolicy = policy;
    this.beneficiaryName = '';
    this.showBeneficiaryModal = true;
  }

  closeBeneficiaryModal(): void {
    this.showBeneficiaryModal = false;
    this.beneficiaryName = '';
    this.currentPolicy = null;
  }

  submitBeneficiary(): void {
    if (!this.beneficiaryName.trim()) {
      this.toastr.info('Beneficiary name is required.', '', this.toastConfig);
      return;
    }

    if (!this.currentPolicy || !this.userID) {
      this.toastr.error('Invalid user or policy.', '', this.toastConfig);
      return;
    }

    this.isAddingPolicy = true;

    const userPolicy = {
      policyID: this.currentPolicy.policyID,
      userID: Number(this.userID),
      beneficiaryName: this.beneficiaryName.trim(),
    };

    this.userPolicyService.addUserPolicy(userPolicy).subscribe({
      next: () => {
        this.toastr.success(`Policy ID ${this.currentPolicy.policyID} added successfully.`, 'Success', this.toastConfig);
        this.removeFromCart(this.currentPolicy.policyID, false);
        this.closeBeneficiaryModal();
        this.isAddingPolicy = false;
      },
      error: (err) => {
        this.toastr.error(err?.error || 'Failed to add policy.', 'Error', this.toastConfig);
        this.isAddingPolicy = false;
      }
    });
  }

  removeFromCart(policyID: string, showToastr = true): void {
    if (this.isRemoving) return;

    this.isRemoving = true;

    this.cartService.removeFromCart(policyID);
    this.cartItems = this.cartService.getCartItems();

    if (showToastr) {
      this.toastr.warning('Policy removed from cart.', '', this.toastConfig);
    }

    setTimeout(() => this.isRemoving = false, 500);
  }

  goBack(): void {
    this.router.navigate(['/explore-policies']);
  }
}
