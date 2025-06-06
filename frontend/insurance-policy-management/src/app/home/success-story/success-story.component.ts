import { Component, OnInit, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Stat {
  icon: SafeHtml;
  value: string;
  label: string;
}

@Component({
  selector: 'app-success-story',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-story.component.html',
  styleUrl: './success-story.component.scss'
})
export class SuccessStoryComponent implements OnInit {
  stats: Stat[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.stats = [
      {
        icon: this.sanitizeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stat-icon">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>`),
        value: '500K+',
        label: 'Happy Customers'
      },
      {
        icon: this.sanitizeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stat-icon">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
        </svg>`),
        value: '$2.5B',
        label: 'Coverage Provided'
      },
      {
        icon: this.sanitizeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stat-icon">
          <polyline points="20 6 9 17 4 12"/>
        </svg>`),
        value: '98.5%',
        label: 'Claim Success Rate'
      },
      {
        icon: this.sanitizeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stat-icon">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>`),
        value: '24/7',
        label: 'Customer Support'
      }
    ];
  }

  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}