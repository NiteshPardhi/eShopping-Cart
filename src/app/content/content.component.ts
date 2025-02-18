import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

export interface ProductData {
  id: number,
  name: string
  description: string,
  price: number,
  img: string
}
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  productArray: ProductData[] = [];
  searchInput: string = '';
  filterData: any = [];
  newArray: any = [];

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.productArray = this.cartService.getProductsArray();
    console.log('products array', this.productArray);

    this.newArray = this.productArray;
  }

  onSelectProduct(id: any, name: any, description: any) {
    this.router.navigate(['/content-details', id], {
      queryParams: { name },
      fragment: description,
    });
  }

  async search(event: any) {
    this.searchInput = event.target.value;
    console.log(this.searchInput);

    this.filterData = await this.newArray.filter((item: any) => {
      return item.name.toLowerCase().includes(this.searchInput.toLowerCase().trim());
    });
    this.productArray = this.filterData;
  }
}
