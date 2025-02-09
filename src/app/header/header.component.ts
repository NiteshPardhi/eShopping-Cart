import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CartComponent } from '../cart/cart.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  noOfAddedProducts: any = 0;
  subscription! : Subscription;
  isAuthenticated = false;
  addeddProductList: any = [];
  
  constructor(public dialog: MatDialog, private cartService: CartService, private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.cartService.setTotalNoSubject.subscribe((number:any) => {
      this.noOfAddedProducts = number;
      console.log('noOfAddedProducts',this.noOfAddedProducts)
    })

    this.subscription = this.authService.isAuthSubject.subscribe((user: any) => {
      this.isAuthenticated = user;
    })
  }

  openCartDialog() {
    this.dialog.open(CartComponent, {
      width: '60%'
    });
  }

  openLogin(){
    this.cartService._prodSubject.next({});
    this.cartService.addeddProductsNo = 0;
    this.cartService.addeddProductList = [];
    this.cartService.setCartProdSubject.next(this.addeddProductList.slice());

    this.dialog.open(LoginComponent, {
      width: '40%'
    })
  }
  
  OnLogout(){
    this.noOfAddedProducts = null;
    this.authService.onLogout();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
