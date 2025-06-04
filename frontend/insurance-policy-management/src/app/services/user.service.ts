import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userProfileUrl = 'https://localhost:7268/api/UserProfile';
  private policyUrl = 'https://localhost:7268/api/UserPolicy';
  private userIdKey = 'userId';
  private tokenKey = 'token';
  private roleKey = 'role';
  private userKey = 'user'; // key for full user object

  constructor(private http: HttpClient) {}

  // LocalStorage helpers
  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  setUserId(id: number): void {
    localStorage.setItem(this.userIdKey, id.toString());
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  setRole(role: string): void {
    localStorage.setItem(this.roleKey, role);
  }

  setUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  getUsername(): string | null {
    const user = this.getUser();
    return user?.username || null;
  }

  logout(): void {
    localStorage.removeItem(this.userIdKey);
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.userKey);
  }

  // API: User profile
  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.userProfileUrl}/${userId}`);
  }

  updateUser(userId: number, data: any) {
    return this.http.put(`${this.userProfileUrl}/${userId}`, data);
  }

  // API: Policies by user
  getPoliciesByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.policyUrl}/user/${userId}`);
  }

}

