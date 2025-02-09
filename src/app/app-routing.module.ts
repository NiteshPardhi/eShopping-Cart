import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // {path: '', component: ContentComponent},
  {path: 'content', component: ContentComponent},
  {path: 'login', component: LoginComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'content-details', component: ContentDetailsComponent},
  {path: 'content-details/:id', component: ContentDetailsComponent},
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
