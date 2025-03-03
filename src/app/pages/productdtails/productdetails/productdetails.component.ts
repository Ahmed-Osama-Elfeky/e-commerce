import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/products/product.service';
import { IProuduct } from '../../../core/interfaces/product/iprouduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productdetails',
  imports: [CarouselModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent implements OnInit  {
  productDetailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }
  private readonly _ActivatedRoute=inject(ActivatedRoute);
  private readonly _CartService=inject(CartService)
  constructor(private _ProductService:ProductService, private _ToastrService:ToastrService){}
  productId!: string;
  productDetials:IProuduct|null = null;
  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{

        this.productId=param.get('p_id') !;

      }
    })

    this._ProductService.getSpecificPeoducts(this.productId).subscribe({
      next:(res)=>{
        this.productDetials=res.data

      },
      error:(err)=>{
        console.log(err);

      }
    })


  }

  addToCart(){
    this._CartService.AddProductToCart(this.productId).subscribe({
      next:(res)=>{

        console.log(res);
        this._CartService.cartCount.next(res.numOfCartItems);
        this._ToastrService.success(res.message,'Fresh Cart',
          {
            closeButton:true,
            timeOut:1500,
            progressBar:true,
            progressAnimation:'decreasing',
            positionClass:'toast-position'


          }
        )

      },

      error:(err)=>{

        console.log(err);


      }

    })
  }
}
