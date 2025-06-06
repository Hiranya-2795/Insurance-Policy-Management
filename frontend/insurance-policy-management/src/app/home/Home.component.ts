// src/app/home/home-page/home-page.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed if this component uses Angular directives
// Import your section components
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './Hero/hero.component';
import { WhyChooseUsComponent } from './why-choose-us/why-choose-us.component';
import { InsurancePoliciesComponent } from './insurance-policies/insurance-policies.component';
import { SuccessStoryComponent } from './success-story/success-story.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { FooterComponent } from './footer/footer.component'; // Example

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