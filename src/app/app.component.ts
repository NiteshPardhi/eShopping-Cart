import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  title = 'product-app';

  constructor(private sercice: AuthService) {}

  // ngOnInit(): void {}

  ngOnDestroy(){
    localStorage.clear();
    this.sercice.isLogin = false;
    localStorage.removeItem('isLoggedIn');
    this.sercice.isAuthSubject.next(this.sercice.isLogin);
    localStorage.removeItem('cartAddedItem');
  }
}
