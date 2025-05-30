import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { PolicyService, Policy } from '../../services/policy.service';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-view-policy',
  templateUrl: './view-policy.component.html',
  styleUrls: ['./view-policy.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class ViewPolicyComponent implements OnInit {
  policy: Policy | null = null;
  loading = true;
  userRole: 'ADMIN' | 'CUSTOMER' | null = null;

  constructor(
    private route: ActivatedRoute,
    private policyService: PolicyService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRole();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.policyService.getPolicyById(id).subscribe({
        next: (data: Policy) => {
          this.policy = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching policy:', error);
          this.loading = false;
        }
      });
    } else {
      console.warn('No policy ID found in route.');
      this.loading = false;
    }
  }

  goBack(): void {
    if (this.userRole === 'ADMIN') {
      this.router.navigate(['/admin-dashboard']);
    } else if (this.userRole === 'CUSTOMER') {
      this.router.navigate(['/customer-dashboard']);
    } else {
      this.router.navigate(['/']); // fallback
    }
  }
}
