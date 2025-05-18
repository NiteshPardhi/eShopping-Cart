import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'product-app';
  isCurrentUrl = false;
  CurrentUrl:any = '';

  constructor(private sercice: AuthService, private activateRoute : Router) {
    this.CurrentUrl = this.activateRoute.url;
    console.log(this.CurrentUrl);
    
  }

  ngOnInit() {
    if(this.CurrentUrl !== 'main-login' && this.CurrentUrl != '/' || this.CurrentUrl){
      this.isCurrentUrl = true;
    }
  }

}
