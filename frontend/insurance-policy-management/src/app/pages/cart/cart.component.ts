import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();

    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(policyID: string): void {
    this.cartService.removeFromCart(policyID);
    this.toastr.warning('Policy removed from cart.');
  }

  proceedToCheckout(): void {
    // Placeholder for checkout logic
    this.toastr.success('Proceeding to checkout...');
    // Navigate to checkout page if implemented
    // this.router.navigate(['/checkout']);
  }

  goBack(): void {
    this.router.navigate(['/explore-policies']);
  }
  addPolicy(policy: any): void {
    this.toastr.success(`Policy ID ${policy.policyID} added successfully.`, 'Success');
  }
}
