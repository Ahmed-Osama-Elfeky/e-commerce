import { Component, inject, OnInit } from '@angular/core';
import { PaymentService } from '../../core/services/order/payment.service';
import { IOrder } from '../../core/interfaces/orders/iorder';
import { ActivatedRoute } from '@angular/router';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {


private readonly _PaymentService=inject(PaymentService);
  private readonly _ActivatedRoute=inject(ActivatedRoute);
  orderId!:string
 

AllOrders:IOrder| null= null;
SpecificOrders:IOrder| null= null;

ngOnInit(): void {
  this._PaymentService.GetAllOrders().subscribe({

      next:(res)=>{

          // console.log(res.data[0].cartItems[0].product);
          console.log(res.data);
          this.AllOrders=res.data;
          
      },
      error:(err)=>{
        console.log(err);
        

      }


  })

//   this._ActivatedRoute.paramMap.subscribe({
//     next:(param)=>{

//       this.orderId=param.get('o_id') !;

//     }
//   })

// this._PaymentService.GetUserOrder(this.orderId).subscribe({
//   next:(res)=>{
//     console.log(res);
//     this.SpecificOrders=res;
    
//   },
// })




}





}
