import { Component, OnInit, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Policy {
  icon: SafeHtml;
  title: string;
  description: string[];
  price: string;
  isMostPopular: boolean;
}

@Component({
  selector: 'app-insurance-policies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './insurance-policies.component.html',
  styleUrl: './insurance-policies.component.scss'
})
export class InsurancePoliciesComponent implements OnInit {
  policies: Policy[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.policies = [
      {
        icon: this.sanitizeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="policy-icon">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>`),
        title: 'Life Insurance',
        description: [
          'Secure your family\'s financial future with comprehensive life insurance coverage.',
          'Term & Whole Life Options',
          'Flexible Premium Payments',
          'Tax Benefits',
          '24/7 Support'
        ],
        price: 'Starting from $29/month',
        isMostPopular: false
      },
      {
        icon: this.sanitizeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="policy-icon">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
        </svg>`),
        title: 'Health Insurance',
        description: [
          'Complete medical coverage for you and your family with nationwide network.',
          'Cashless Treatment',
          'Pre & Post Hospitalization',
          'Maternity Coverage',
          'Annual Health Checkup'
        ],
        price: 'Starting from $45/month',
        isMostPopular: true // <--- THIS IS TRUE
      },
      {
        icon: this.sanitizeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="policy-icon">
          <path d="M19 6H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/>
        </svg>`),
        title: 'VechicleInsurance',
        description: [
          'Protect your vehicle with comprehensive auto insurance coverage.',
          'Comprehensive Coverage',
          '3rd Party Protection',
          'Roadside Assistance',
          'Quick Claim Settlement'
        ],
        price: 'Starting from $35/month',
        isMostPopular: false
      },
      {
        icon: this.sanitizeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="policy-icon">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
        </svg>`), // Reusing the shield icon for simplicity here, replace with house icon if you have one
        title: 'Home Insurance',
        description: [
          'Safeguard your home and belongings against unexpected events.',
          'Structure Protection',
          'Personal Property Coverage',
          'Liability Protection',
          'Temporary Living Expenses'
        ],
        price: 'Starting from $40/month',
        isMostPopular: false
      }
    ];
  }

  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}