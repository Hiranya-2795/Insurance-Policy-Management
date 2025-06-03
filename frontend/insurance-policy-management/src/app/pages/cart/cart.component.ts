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
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    } else {
      this.cartItems = [];
    }
  }

  isRemoving = false;

  removeFromCart(policyID: string): void {
    if (this.isRemoving) return;
    this.isRemoving = true;

    this.cartItems = this.cartItems.filter(item => item.policyID !== policyID);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.toastr.warning('Policy removed from cart.');

    setTimeout(() => this.isRemoving = false, 500); // re-enable after half sec
  }


  goBack(): void {
    this.router.navigate(['/explore-policies']);
  }

  isAddingPolicy = false;

  addPolicy(policy: any): void {
    if (this.isAddingPolicy) return;
    this.isAddingPolicy = true;

    this.toastr.success(`Policy ID ${policy.policyID} added successfully.`, 'Success');

    setTimeout(() => this.isAddingPolicy = false, 500); // allow again after 0.5s
  }

}
