// src/app/home/home-page/home-page.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed if this component uses Angular directives
// Import your section components
import { HeaderComponent } from 'C:/Users/prash/Documents/Insurance-Policy-Management/frontend/insurance-policy-management/src/app/home/header/header.component';
import { HeroComponent } from 'C:/Users/prash/Documents/Insurance-Policy-Management/frontend/insurance-policy-management/src/app/home/Hero/hero.component';
import { WhyChooseUsComponent } from 'C:/Users/prash/Documents/Insurance-Policy-Management/frontend/insurance-policy-management/src/app/home/why-choose-us/why-choose-us.component'; // Assuming you have this
import { InsurancePoliciesComponent } from 'C:/Users/prash/Documents/Insurance-Policy-Management/frontend/insurance-policy-management/src/app/home/insurance-policies/insurance-policies.component';
import { SuccessStoryComponent } from 'C:/Users/prash/Documents/Insurance-Policy-Management/frontend/insurance-policy-management/src/app/home/success-story/success-story.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { FooterComponent } from 'C:/Users/prash/Documents/Insurance-Policy-Management/frontend/insurance-policy-management/src/app/home/footer/footer.component'; // Example

@Component({
  selector: 'app-home-page',
  standalone: true, 
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    WhyChooseUsComponent,
    InsurancePoliciesComponent,
    SuccessStoryComponent,
    HowItWorksComponent,
    FooterComponent,
    // Add other section components here
    // FooterComponent // Example
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss' // Optional, if you have specific styles for the home page wrapper
})
export class HomePageComponent {
  // Your home page logic (if any)
}