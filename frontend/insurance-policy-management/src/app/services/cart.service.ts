import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private userService: UserService) {
    this.updateCartCount();
  }

  private getCartKey(): string {
    const userID = this.userService.getUserId();
    return userID ? `cart_${userID}` : 'cart_guest';
  }

  getCartItems(): any[] {
    const cartData = localStorage.getItem(this.getCartKey());
    return cartData ? JSON.parse(cartData) : [];
  }

  addToCart(item: any): void {
    const items = this.getCartItems();
    const exists = items.some(i => i.policyID === item.policyID);
    if (!exists) {
      items.push(item);
      localStorage.setItem(this.getCartKey(), JSON.stringify(items));
      this.updateCartCount();
    }
  }

  removeFromCart(policyID: string): void {
    let items = this.getCartItems();
    items = items.filter(item => item.policyID !== policyID);
    localStorage.setItem(this.getCartKey(), JSON.stringify(items));
    this.updateCartCount();
  }

  clearCart(): void {
    localStorage.removeItem(this.getCartKey());
    this.updateCartCount();
  }

  updateCartCount(): void {
    const count = this.getCartItems().length;
    this.cartCountSubject.next(count);
  }
}
