
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/products/product.service';
import { IProuduct } from '../../core/interfaces/product/iprouduct';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ICategory } from '../../core/interfaces/category/icategory';
import { CategoryService } from '../../core/services/categories/category.service';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import{FormsModule} from '@angular/forms'
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { WhishlistComponent } from '../whishlist/whishlist/whishlist.component';
import { WhishlistService } from '../../core/services/whishlist/whishlist.service';

@Component({
  selector: 'app-products',
  imports: [CarouselModule,SearchPipe, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    autoplayTimeout:2000,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }

    },
    nav: false
  }

  categoriesSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    autoplayTimeout:2000,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1280:{
        items: 6
      }
    },
    nav: false
  }

  searchValue:string=''
  
  categoryData!:ICategory[];
  categorySub!:Subscription;

  productsData!:IProuduct[];
  productsSub!:Subscription;


  constructor(private _ProductService:ProductService , private _CategoryService:CategoryService, private _CartService:CartService, private _ToastrService:ToastrService , private _NgxSpinnerService:NgxSpinnerService , private _WhishlistService:WhishlistService){}

  ngOnInit(): void {

   this.productsSub =this._ProductService.getAllproducts().subscribe({
      next: (res) => {
        this._NgxSpinnerService.hide();

        this.productsData=res.data;
        console.log(res.data);
      },
      error: (err) => {
        console.error(err);
      }
    });



    }


    addToCart(p_id:string){
      this._CartService.AddProductToCart(p_id).subscribe({

        next:(res)=>{
          console.log(res);
          
          //next() to set value in behaviour subject
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


    addToWhishlist(w_id:string){
      this._WhishlistService.AddProductToWhishlist(w_id).subscribe({
        next:(res)=>{
          console.log(res);
          this._ToastrService.success(res.message,'Fresh Cart',
            {
              closeButton:true,
              timeOut:1500,
              progressBar:true,
              progressAnimation:'decreasing',
              positionClass:'toast-position'


            }
          )




        }




      })
    }

ngOnDestroy(): void {
  this.productsSub.unsubscribe();

}







  }

{

}
