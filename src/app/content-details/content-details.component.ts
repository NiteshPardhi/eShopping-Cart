import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
export interface ProductData{
  id:number,
  name: string
  description: string,
  price: number,
  img: string
}
@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.css'],
})
export class ContentDetailsComponent implements OnInit, OnDestroy {
  inputForm!: FormGroup;
  authSubscription!: Subscription;
  isLoggedIn: any;
  isSubmit = false;
  newId: any;
  selectedData: any = [];
  productData: ProductData[] = [];
  totalProductPrice: any = 0;

  constructor(
    public dialog: MatDialog,
    private cartService: CartService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inputForm = new FormGroup({
      qty: new FormControl('', [
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$'),
      ]),
    });

    this.authSubscription = this.authService.isAuthSubject.subscribe(
      (auth: any) => {
        this.isLoggedIn = auth;
        console.log('isLoggedIn', this.isLoggedIn);
      }
    );

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.newId = params.get('id');

      this.selectedData = this.cartService.productArray.filter((data: any) => {
        return data.id == this.newId;
      });

      this.productData = this.cartService.productArray.filter((data: any) => {
        return data.id != this.newId;
      });
    });
  }

  openAddToCart(product: any) {
    product.qty = this.inputForm.value.qty;
    this.cartService._prodSubject.next(product);
    // console.log('product', product);

    if (this.inputForm.invalid) {
      this.isSubmit = true;
      return;
    }

    if (!this.isLoggedIn) {
      this.dialog.open(LoginComponent, {
        width: '40%',
      });
    } else {
      this.cartService.addToCart(product, this.inputForm.value.qty);
    }
  }

  onChangeProduct(id: any, name: any, description: any) {
    this.router.navigate(['/content-details', id], {
      queryParams: { name },
      fragment: description,
    });
    this.totalProductPrice = 0;
    this.inputForm.reset();
  }

  onCheckQty(product: any) {
    this.totalProductPrice = product.price * this.inputForm.value.qty;
  }

  onChechOperator(value: any) {
    if (
      value.key == 'e' ||
      value.key == 'E' ||
      value.key == '.' ||
      value.key == '-'
    ) {
      return false;
    } else {
      return true;
    }
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
