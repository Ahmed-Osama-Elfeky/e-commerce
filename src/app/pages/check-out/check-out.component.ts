import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../core/services/order/payment.service';

@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent implements OnInit {


private readonly _ActivatedRoute=inject(ActivatedRoute)
private readonly _PaymentService=inject(PaymentService)
private readonly _Router=inject(Router)



cartId!:string;

detailsForm:FormGroup = new FormGroup({

details: new FormControl(null , Validators.required),
phone: new FormControl(null , Validators.required),
city: new FormControl(null , Validators.required),



})


ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(param)=>{
      this.cartId=param.get('c_id')!
    },
    error:(err)=>{
      console.log(err);
      

    }
  })



  
}

detailsSubmit(){
  console.log(this.detailsForm.value);
  if(this.detailsForm.valid){
    this._PaymentService.CheckOutSession(this.cartId , this.detailsForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === 'success'){
          window.open(res.session.url,'_self')
        }
      },
      error:(err)=>{
        console.log(err);
      
      }


      
    }

  )


  }
  
 


}

Cash(){
  if(this.detailsForm.valid){
    this._PaymentService.CreateCashOrder(this.cartId , this.detailsForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === 'success'){
        console.log(res);
        this._Router.navigate(['/allorders'])
        

          
        }
      },
      error:(err)=>{
        console.log(err);
      
      }
    })
  }
}


  

  

  



}
