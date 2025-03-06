import { CartService } from './../../../core/services/cart/cart.service';
import { Component, inject, OnInit } from '@angular/core';

import { WhishlistService } from '../../../core/services/whishlist/whishlist.service';
import { ProductService } from '../../../core/services/products/product.service';
import { ICart } from '../../../core/interfaces/cart/icart';
import { ToastrService } from 'ngx-toastr';
import { IWishlist } from '../../../core/interfaces/whishlist/iwishlist';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-whishlist',
  imports: [],
  templateUrl: './whishlist.component.html',
  styleUrl: './whishlist.component.scss'
})
export class WhishlistComponent implements OnInit {


  private readonly _WhishlistService=inject(WhishlistService)
  private readonly _CartService=inject(CartService)
  private readonly _ProductService=inject(ProductService)
  private readonly _ToastrService=inject(ToastrService)




  whishlistData!:IWishlist[]
  
ngOnInit(): void {

this._WhishlistService.GetLoggedUserWishlist().subscribe({

  next:(res)=>{

    console.log(res.data);
    this.whishlistData=res.data;

  }

})

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

deleteFormWishlist(p_id:string){
  this._WhishlistService.RemoveProductFromWishlist(p_id).subscribe({

    next:(res)=>{
      console.log(res);
      this.whishlistData=res.data;
    




    },error:(err)=>{

      console.log(err);
    }

  })
}




}
