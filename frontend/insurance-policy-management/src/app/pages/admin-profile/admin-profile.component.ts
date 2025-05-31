import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Import Router
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  adminData: any = null;
  loading = true;
  error = '';
  previewImage: string | null = null;

  constructor(private userService: UserService, private router: Router) {} // Inject Router

  ngOnInit(): void {
    const userId = this.userService.getUserId();
    if (userId) {
      this.userService.getUserById(Number(userId)).subscribe({
        next: (data) => {
          this.adminData = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load admin profile.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'User ID not found.';
      this.loading = false;
    }
  }

  goBack(): void {
    window.history.back();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/']); 
  }
}
