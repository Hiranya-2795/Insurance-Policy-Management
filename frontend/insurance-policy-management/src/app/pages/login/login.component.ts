import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service'; // ✅ Adjust the path if needed

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  role: string = '';

  message: string = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService // ✅ Inject UserService
  ) {}

  login() {
    if (!this.username || !this.password || !this.role) {
      this.setMessage('Please fill in all fields', 'error');
      return;
    }

    const loginData = {
      email: this.username,
      password: this.password,
      role: this.role
    };

    this.http.post<any>('https://localhost:7268/api/Auth/login', loginData).subscribe({
      next: (res) => {
        this.setMessage('Login successful', 'success');

        const decodedToken: any = jwtDecode(res.token);

        // ✅ Extract and store full user info
        const user = {
          id: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
          email: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
          username: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
          role: res.role.toUpperCase()
        };

        localStorage.setItem('token', res.token);
        localStorage.setItem('role', user.role);
        localStorage.setItem('userId', user.id.toString());

        this.userService.setUser(user); // ✅ Store full user in localStorage

        setTimeout(() => {
          if (res.role.toLowerCase() === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/customer-dashboard']);
          }
        }, 2000);
      },
      error: (err) => {
        console.error('Login error:', err);
        if (err.status === 404) {
          this.setMessage('Email not found. Please register.', 'error');
          setTimeout(() => this.router.navigate(['/register']), 1500);
        } else if (err.status === 401) {
          this.setMessage('Incorrect password or role mismatch.', 'error');
        } else if (err.status === 400) {
          this.setMessage('Invalid input. Please check your details.', 'error');
        } else {
          this.setMessage('Login failed. Please try again later.', 'error');
        }
      }
    });
  }

  setMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 3000);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
