import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerData = {
    FullName: '',
    DateOfBirth: '',
    Gender: '',
    PhoneNumber: '',
    Email: '',
    AadharNumber: '',
    Password: '',
    Role: 'User'  // default
  };

  pageTitle = 'Register';
  buttonText = 'Register';

  message: string | null = null;
  messageType: 'success' | 'error' | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const mode = this.route.snapshot.paramMap.get('mode');
    if (mode === 'admin') {
      this.registerData.Role = 'Admin';
      this.pageTitle = 'Register New Admin';
      this.buttonText = 'Register New Admin';
    } else {
      this.registerData.Role = 'User';
      this.pageTitle = 'Register';
      this.buttonText = 'Register';
    }
  }

  showMessage(msg: string, type: 'success' | 'error' = 'error') {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = null;
      this.messageType = null;
    }, 4000);
  }

  register() {
    console.log('Sending registration data:', this.registerData);

    const apiUrl = 'https://localhost:7268/api/Auth/register';

    this.http.post(apiUrl, this.registerData, { responseType: 'text' }).subscribe({
      next: (response) => {
        this.showMessage('Registered successfully', 'success');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        if (err.status === 400) {
          this.showMessage('Invalid input or user already exists.', 'error');
        } else if (err.status === 0) {
          this.showMessage('Cannot reach server. Is your API running and CORS enabled?', 'error');
        } else {
          this.showMessage('Registration failed. Try again later.', 'error');
        }
      }
    });
  }
}
