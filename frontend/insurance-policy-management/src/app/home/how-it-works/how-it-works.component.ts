import { Component, OnInit, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

interface Step {
  icon: SafeHtml;
  stepNumber: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss'
})
export class HowItWorksComponent implements OnInit {
  steps: Step[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.steps = [
      {
        // Icon for 'Create Account': A user icon with a plus, indicating new user registration.
        icon: this.sanitizeSvg(`<svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="16" x2="22" y1="11" y2="11"/><line x1="19" x2="19" y1="8" y2="14"/>
        </svg>`),
        stepNumber: 1,
        title: 'Create Account',
        description: 'Sign up for your secure insurance portal account in just a few minutes.'
      },
      {
        // Icon for 'Explore Policies': A notebook with text, signifying reviewing or browsing documents/policies.
        icon: this.sanitizeSvg(`<svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-notebook-text">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/><path d="M10 12H7"/><path d="M13 16H7"/>
        </svg>`),
        stepNumber: 2,
        title: 'Explore Policies',
        description: 'Browse our comprehensive insurance policies and explore options that best fit your needs.'
      },
      {
        // Icon for 'Add Policy': A file icon with a plus, representing adding a new document or policy.
        icon: this.sanitizeSvg(`<svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-plus">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="12" x2="12" y1="18" y2="12"/><line x1="9" x2="15" y1="15" y2="15"/>
        </svg>`),
        stepNumber: 3,
        title: 'Add Policy',
        description: 'Easily select, customize, and add your chosen policy to your account.'
      },
      {
        // Icon for 'Get Protected': A checkmark within a circle, symbolizing completion and security.
        icon: this.sanitizeSvg(`<svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>
        </svg>`),
        stepNumber: 4,
        title: 'Get Protected',
        description: 'Your coverage is now active! Manage details and track claims through your personalized dashboard.'
      }
    ];
  }

  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
