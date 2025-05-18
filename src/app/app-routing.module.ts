import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MainLoginComponent } from './main-login/main-login.component';

const routes: Routes = [
  //Default path
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  // { path: '', redirectTo: '/main-login', pathMatch: 'full' },
  // { path: 'main-login', component: MainLoginComponent },

  // Other URLs
  { path: 'content', component: ContentComponent },
  // {path: 'login', component: LoginComponent},
  { path: 'content-details', component: ContentDetailsComponent },
  { path: 'content-details/:id', component: ContentDetailsComponent },
  { path: 'header', component: HeaderComponent },

  //Other wise Redirect To
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
