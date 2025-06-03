import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = this.loadCartFromStorage();
  private cartSubject = new BehaviorSubject<any[]>(this.cartItems);

  cart$ = this.cartSubject.asObservable();

  constructor() {
    // Ensure cart is loaded from storage when the service is initialized
    this.cartSubject.next(this.cartItems);
  }

  private loadCartFromStorage(): any[] {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  }

  private saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getCartItems(): any[] {
    return [...this.cartItems];
  }

  addToCart(policy: any): boolean {
    const exists = this.cartItems.find(item => item.policyID === policy.policyID);
    if (!exists) {
      this.cartItems.push(policy);
      this.saveCartToStorage();
      this.cartSubject.next(this.cartItems);
      return true;
    }
    return false;
  }

  removeFromCart(policyID: string): void {
    this.cartItems = this.cartItems.filter(item => item.policyID !== policyID);
    this.saveCartToStorage();
    this.cartSubject.next(this.cartItems);
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCartToStorage();
    this.cartSubject.next(this.cartItems);
  }
}

