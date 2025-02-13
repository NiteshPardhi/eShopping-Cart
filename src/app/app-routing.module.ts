import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  //Default path
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },

  // Other URLs
  { path: 'content', component: ContentComponent },
  // {path: 'login', component: LoginComponent},
  { path: 'content-details', component: ContentDetailsComponent },
  { path: 'content-details/:id', component: ContentDetailsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'header', component: HeaderComponent},

  //Other wise Redirect To
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
