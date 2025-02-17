import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  productArray = [
    {
      id: 1,
      description: 'The best quality ever india',
      price: 20,
      name: 'Jins',
      img: 'assets/jins.jpeg',
    },
    {
      id: 2,
      description: 'Perfect to all size',
      price: 90,
      name: 'Sirt',
      img: 'assets/sirt.jpg',
    },
    {
      id: 3,
      description: 'The best stylish for men',
      price: 50,
      name: 'Watch',
      img: 'assets/watch.jpg',
    },
    {
      id: 4,
      description: 'Any time favorites',
      price: 40,
      name: 'T-sirt',
      img: 'assets/tsrt.jpeg',
    },
    {
      id: 5,
      description: 'The best quality ever india',
      price: 20,
      name: 'Jins',
      img: 'assets/tsrt1.jpeg',
    },
    {
      id: 6,
      description: 'Perfect to all size',
      price: 90,
      name: 'Sirt',
      img: 'assets/srt1.jpeg',
    },
    {
      id: 7,
      description: 'The best stylish for men',
      price: 50,
      name: 'Bracelate',
      img: 'assets/bracelate.jpg',
    },
    {
      id: 8,
      description: 'Any time favorites',
      price: 40,
      name: 'T-sirt',
      img: 'assets/girls fashion.jpeg',
    },
    {
      id: 9,
      description: 'The best stylish for men',
      price: 50,
      name: 'LCD',
      img: 'assets/electronics.jpeg',
    },
    {
      id: 10,
      description: 'Any time favorites',
      price: 40,
      name: 'iphone 15',
      img: 'assets/mobile.jpg',
    },
    {
      id: 11,
      description: 'Any time favorites',
      price: 40,
      name: 'Neck Chain',
      img: 'assets/neck-chain.jpeg',
    },
  ];

  addeddProductList: any = [];
  addedQty: any;
  addeddProductsNo: any = 0;

  public setCartProdSubject = new BehaviorSubject<any>([]);
  public setTotalNoSubject = new BehaviorSubject<any>([]);
  _prodSubject = new BehaviorSubject<any>([]);

  constructor() {
    //for never remove added data from cart
    let existProd = localStorage.getItem('cartAddedItem');
    if (existProd) {
      let checkData = JSON.parse(existProd);

      let totalProd = checkData
        .map((item: any) => {
          return item['addedQty'];
        })
        .reduce((num: any, data: any) => {
          return +num + +data;
        }, 0);

      this.setCartProdSubject.next(checkData.slice());
      this.addeddProductList = [...checkData];
      this.addeddProductsNo = totalProd;
      this.setTotalNoSubject.next(totalProd);
    }
  }

  //for get product original array
  getProductsArray() {
    return this.productArray;
  }

  //for add to cart
  addToCart(product: any, qty: number) {
    let index = this.addeddProductList.findIndex(
      (x: any) => x.name == product.name
    );
    if (index == -1) {
      this.addeddProductList.push({ ...product, addedQty: qty });
    } else {
      this.addeddProductList[index].addedQty += qty;
      // console.log('added products', this.addeddProductList);
      if (this.addeddProductList[index].addedQty <= 0) {
        this.addeddProductList.splice(index, 1);
      }
    }

    localStorage.setItem(
      'cartAddedItem',
      JSON.stringify(this.addeddProductList.slice())
    );

    this.addeddProductsNo = this.addeddProductsNo + qty;

    this.setCartProdSubject.next(this.addeddProductList.slice());
    this.setTotalNoSubject.next(this.addeddProductsNo);
  }
}
