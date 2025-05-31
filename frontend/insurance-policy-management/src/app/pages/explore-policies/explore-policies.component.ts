import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PolicyService } from '../../services/policy.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './explore-policies.component.html',
  styleUrls: ['./explore-policies.component.scss']
})
export class ExplorePoliciesComponent implements OnInit {
  allPolicies: any[] = [];

  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.getAllPolicies();
  }

  getAllPolicies(): void {
    this.policyService.getPolicies().subscribe({
      next: (res) => {
        this.allPolicies = res;
      },
      error: (err) => {
        console.error('Error fetching policies', err);
      }
    });
  }

  addToCart(policyId: number): void {
    // Logic to add to cart (implement later)
    console.log('Adding policy', policyId);
  }
}
