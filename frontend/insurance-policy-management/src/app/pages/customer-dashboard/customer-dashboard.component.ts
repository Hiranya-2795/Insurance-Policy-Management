import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {
  allPolicies: any[] = [];
  filteredPolicies: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  searchQuery = '';

  userFullName: string = '';
  userEmail: string = '';
  userGender: string = '';
  userPhone: string = '';
  userDob: string = '';
  showDropdown = false;
  private mouseLeaveTimeout?: any;

  constructor(
    public userService: UserService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    const userId = this.userService.getUserId();
    if (userId) {
      this.userService.getUserById(+userId).subscribe({
        next: (user) => {
          this.userFullName = user.fullName;
          this.userEmail = user.email;
          this.userGender = user.gender;
          this.userPhone = user.phoneNumber;
          this.userDob = user.dateOfBirth
            ? new Date(user.dateOfBirth).toISOString().split('T')[0]
            : '';
        },
        error: (err) => {
          console.error('Failed to fetch user profile', err);
        }
      });

      this.userService.getPoliciesByUserId(userId).subscribe({
        next: (data) => {
          this.allPolicies = data;
          this.filteredPolicies = data;
        },
        error: (err) => {
          console.error('Failed to load policies:', err);
        }
      });
    }
  }

  searchPolicies(): void {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredPolicies = this.allPolicies.filter(policy =>
      (policy.policyID && policy.policyID.toLowerCase().includes(query)) ||
      (policy.policy?.policyType && policy.policy.policyType.toLowerCase().includes(query)) ||
      (policy.policy?.premiumFrequency && policy.policy.premiumFrequency.toLowerCase().includes(query)) ||
      (policy.beneficiaryName && policy.beneficiaryName.toLowerCase().includes(query))
    );
    this.setPage(1);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPolicies.length / this.itemsPerPage);
  }

  get paginatedPolicies(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPolicies.slice(start, start + this.itemsPerPage);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  onIconMouseEnter() {
    if (this.mouseLeaveTimeout) {
      clearTimeout(this.mouseLeaveTimeout);
    }
    this.showDropdown = true;
  }

  onIconMouseLeave() {
    this.mouseLeaveTimeout = setTimeout(() => {
      this.showDropdown = false;
    }, 5000);
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
    if (!this.showDropdown && this.mouseLeaveTimeout) {
      clearTimeout(this.mouseLeaveTimeout);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdownElement = this.elementRef.nativeElement.querySelector('.user-info-dropdown');
    if (this.showDropdown && dropdownElement && !dropdownElement.contains(target)) {
      this.showDropdown = false;
    }
  }
}
