import { Component, OnInit, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Feature {
  icon: SafeHtml;
  title: string;
  description: string;
}

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-choose-us.component.html',
  styleUrl: './why-choose-us.component.scss'
})
export class WhyChooseUsComponent implements OnInit {
  whyChooseUsFeatures: Feature[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.whyChooseUsFeatures = [
      {
        // Icon for Enterprise-Grade Security (Shield icon)
        icon: this.sanitizeSvg(`
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feature-icon">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
          </svg>
        `),
        title: 'Enterprise-Grade Security',
        description: 'Bank-level encryption and security protocols protect your sensitive information and ensure complete privacy.'
      },
      {
        // Icon for Dedicated Support Team (User with headset icon)
        icon: this.sanitizeSvg(`
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feature-icon">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            <line x1="17" y1="10" x2="17" y2="13"/>
            <line x1="21" y1="10" x2="21" y2="13"/>
          </svg>
        `),
        title: 'Dedicated Support Team',
        description: 'Access to licensed insurance professionals with decades of experience in risk management and policy optimization.'
      },
      {
        // Icon for Competitive Pricing (Trending up graph with percentage)
        icon: this.sanitizeSvg(`
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feature-icon">
            <path d="M2 16.9A5 5 0 0 1 5 13a5 5 0 0 1 7 0 5 5 0 0 1 7 0 5 5 0 0 1 3 3.9"/>
            <path d="M12 13V2"/>
            <circle cx="12" cy="13" r="1"/>
            <path d="M17 8l-5-5-5 5"/>
          </svg>
        `),
        title: 'Competitive Pricing',
        description: 'Transparent, market-leading rates with no hidden fees. Get comprehensive coverage that fits your budget.'
      }
    ];
  }

  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}