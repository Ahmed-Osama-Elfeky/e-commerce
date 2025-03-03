import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../core/interfaces/cart/icart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly _CartService=inject(CartService);

  cartData:ICart | null = null;

  ngOnInit(): void {

    this._CartService.GetLoggedUserCart().subscribe({
      next:(res)=>{

        console.log(res.data);
        this.cartData=res.data;


      }

    })
  }

  deleteFormCart(p_id:string){
    this._CartService.RemoveSpecificCartItem(p_id).subscribe({

      next:(res)=>{
        console.log(res);
        this._CartService.cartCount.next(res.numOfCartItems);
        this.cartData=res.data;


      }

    })
  }

  updateCount(p_id:string, count:number){
    this._CartService.UpdateCartProductQuantity(p_id,count).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartData=res.data;

      },

    })

  }

  clearCart(){
    this._CartService.ClearUserCart().subscribe({
      next:(res)=>{
        console.log(res);
        this._CartService.cartCount.next(res.numOfCartItems);
        this.cartData=null;
      },

    })
  }



}
