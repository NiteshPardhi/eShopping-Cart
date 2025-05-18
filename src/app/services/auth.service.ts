import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin = false;
  isAuthSubject = new BehaviorSubject<any>([]);
  storeData: any;
  user:any;

  constructor(private router: Router) {
    this.onCheckLogin();
    this.user = JSON.parse(localStorage.getItem('main-loginCrediential') || '{}');

  }

  onLogin(loginUser: { email: string; password: string }) {
    this.isLogin = true;
    this.storeData = JSON.parse(localStorage.getItem('user') || '{}');

    if (
      this.storeData.email == loginUser.email &&
      this.storeData.password == loginUser.password
    ) {
      localStorage.setItem('isLoggedIn', 'true');
      this.onCheckLogin();
      alert('Login Successfull.....!');
    } else {
      alert('Login Failed....Wrong Crediential....!');
    }
  }

  onLogout() {
    this.isLogin = false;
    localStorage.removeItem('isLoggedIn');
    this.isAuthSubject.next(this.isLogin);
    // localStorage.removeItem('cartAddedItem');
  }

  onCheckLogin() {
    let userData = localStorage.getItem('isLoggedIn');
    if (userData) {
      this.isAuthSubject.next(true);
    } else {
      this.isAuthSubject.next(false);
    }
  }

  onMainLogin(loginForm:{userName:string, password:string}){
    // console.log(this.user);
    //this.loggedIn = true;
    if(loginForm.userName != this.user.userName || loginForm.password != this.user.password){
      alert('Login Failed....Wrong Crediential..?');
    } else {
      // this.loggedIn = true;
      alert('Login Successfull....!');
      this.router.navigate(['/home']);
    }

  }

  onMainLogout(){
    localStorage.removeItem('main-loginCrediential');
    this.router.navigate(['/main-login']);

  }
}
