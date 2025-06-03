import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPolicyService {
  private apiUrl = 'https://localhost:7268/api/UserPolicy';  // Adjust to your backend URL

  constructor(private http: HttpClient) {}

  addUserPolicy(userPolicy: { policyID: string; userID: number; beneficiaryName: string }): Observable<any> {
    return this.http.post(this.apiUrl, userPolicy);
  }
}
