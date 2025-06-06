// src/app/home/footer/footer.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for Angular directives
import { RouterModule } from '@angular/router'; // Required for routerLink

@Component({
  selector: 'app-footer', // The selector to use this component in HTML
  standalone: true, // Marks this as a standalone component
  imports: [
    CommonModule,
    RouterModule // Import RouterModule to use routerLink
  ],
  templateUrl: './footer.component.html', // Links to the HTML template
  styleUrl: './footer.component.scss' // Links to the SCSS styles
})
export class FooterComponent implements OnInit {
  currentYear: number;

  // Social media SVG icons - these should be outlines
  // Ensure fill="none" and stroke="currentColor" for these to be white outlines
  linkedinIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`;
  twitterIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17-19 11.6 9.2-3.4 11.2-10.2 13.2-12.2z"/></svg>`;
  facebookIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`;
  instagramIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.5" y1="6.5" y2="6.5"/></svg>`;

  constructor() {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }
}
