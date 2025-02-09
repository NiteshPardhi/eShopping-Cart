import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginData: any = [];
  submitted = false;
  product: any;
  productQty: any;
  loginSubscription!: Subscription;
  isLogged = false;

  setUser: any = {
    email: 'dev@gmail.com',
    password: 'abcd',
  };

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loginSubscription = this.cartService._prodSubject.subscribe(
      (data: any) => {
        this.product = data;
        this.productQty = data.qty;
        console.log('new data',this.product);
      }
    );

    localStorage.setItem('user', JSON.stringify(this.setUser));

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.loginSubscription = this.authService.isAuthSubject.subscribe((auth: any) => {
      this.isLogged = auth;
      if(this.isLogged){
        this.cartService.addeddProductsNo = 0;
        this.cartService.addeddProductList = [];
      }
    })
  }

  onSubmit() {
    this.submitted = true;
    this.loginData = this.loginForm.value;
    console.log('Login data', this.loginData);

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.onLogin(this.loginData);
    if(this.isLogged){
      if(this.productQty != undefined){
        this.cartService.addToCart(this.product, this.productQty);
      }
    }

    this.dialog.closeAll();
  }

  onCancel() {
    this.dialog.closeAll();
  }
}
