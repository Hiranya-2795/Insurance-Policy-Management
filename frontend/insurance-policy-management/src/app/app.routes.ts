import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CustomerDashboardComponent } from './pages/customer-dashboard/customer-dashboard.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { SearchPolicyComponent } from './pages/search-policy/search-policy.component';
import { ViewPolicyComponent } from './pages/view-policy/view-policy.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { AddPolicyComponent } from './pages/add-policy/add-policy.component';  
import { EditPolicyComponent } from './pages/edit-policy/edit-policy.component';  
import { RegisterComponent } from './pages/register/register.component';
import { ExplorePoliciesComponent } from './pages/explore-policies/explore-policies.component';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomePageComponent } from './home/Home.component';


export const routes: Routes = [
  { path: '', component: HomePageComponent },
  
  { path: 'login', component: LoginComponent },
  { path: 'customer-dashboard', component: CustomerDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'search-policy', component: SearchPolicyComponent },
  { path: 'view-policy/:id', component: ViewPolicyComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'add-policy', component: AddPolicyComponent },  
  { path: 'edit-policy/:id', component: EditPolicyComponent }, 
  { path: 'register', component: RegisterComponent }, 
  { path: 'register/:mode', component: RegisterComponent },
  { path: 'explore-policies', component: ExplorePoliciesComponent },
  { path: 'admin-profile', component: AdminProfileComponent },
  {path: 'cart',
  loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent)},
];
