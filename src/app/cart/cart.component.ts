import { Component, EventEmitter, Inject, OnDestroy, OnInit, Optional, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ContentComponent } from '../content/content.component';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  totalProductPrice: any;
  cartData: any = [];
  cartSubscription! : Subscription;
  isLoggin = false;

  constructor(public dialog: MatDialog, private cartService: CartService, private authService: AuthService) { }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.setCartProdSubject.subscribe((data: any) => {
      this.cartData = data;
      this.getTotal();
    })
    
    this.cartSubscription = this.authService.isAuthSubject.subscribe((auth: any) => {
      this.isLoggin = auth;
      if(!this.isLoggin){
        this.cartData = [];
        this.totalProductPrice = 0;
      }
    })
  }

  onCancel(){
    this.dialog.closeAll();
  }

  getTotal(){
    this.totalProductPrice = this.cartData.reduce((total:any, item: any) => {
      return total + (item.addedQty * item.price)
    }, 0);
  }

  removeProduct(product: any){
   this.cartService.addToCart(product, -1)
  }

  addProduct(product: any){
    this.cartService.addToCart(product, +1)
  }

  // onDelete(product: any){
  //   this.cartService.deleteProduct(product);
  // }

  ngOnDestroy(): void {
      this.cartSubscription.unsubscribe();
  }

}
