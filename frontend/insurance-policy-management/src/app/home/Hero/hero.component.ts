import { Component, OnInit, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule,
    RouterModule
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit {

  trustedCustomersIcon: SafeHtml = '';
  coverageProvidedIcon: SafeHtml = '';
  aiRatingIcon: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // Sanitize SVG content for safety
    this.trustedCustomersIcon = this.sanitizeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-blue-600">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>`);
    this.coverageProvidedIcon = this.sanitizeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-blue-600">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
    </svg>`);
    this.aiRatingIcon = this.sanitizeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-blue-600">
      <path d="m14 7 5-5 3 3-5 5"/><path d="m13 17 5-5 3 3-5 5"/><path d="m16 21 5-5 3 3-5 5"/><path d="M21 16V9c0-.7-.3-1.5-.8-2l-3.6-3.6c-.5-.5-1.3-.8-2-.8H9.8c-.7 0-1.5.3-2 .8L4.2 7.2c-.5.5-.8 1.3-.8 2V16c0 .7.3 1.5.8 2l3.6 3.6c.5.5 1.3.8 2 .8H16c.7 0 1.5-.3 2-.8l3.6-3.6c.5-.5.8-1.3.8-2Z"/>
    </svg>`);
  }

  // Helper function to sanitize SVG HTML
  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}