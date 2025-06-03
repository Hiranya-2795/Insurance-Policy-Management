import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>(this.cartItems);

  cart$ = this.cartSubject.asObservable();

  getCartItems(): any[] {
    return [...this.cartItems];
  }

  addToCart(policy: any): boolean {
    const exists = this.cartItems.find(item => item.policyID === policy.policyID);
    if (!exists) {
      this.cartItems.push(policy);
      this.cartSubject.next(this.cartItems);
      return true;
    }
    return false;
  }

  removeFromCart(policyID: string): void {
    this.cartItems = this.cartItems.filter(item => item.policyID !== policyID);
    this.cartSubject.next(this.cartItems);
  }
}
