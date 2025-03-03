import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/authentication/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  private readonly _AuthService=inject(AuthService)
  private readonly _Router=inject(Router);


  loading:Boolean=false;
  resText!:string;
 emailForm:FormGroup = new FormGroup({
    email : new FormControl(null, [Validators.required , Validators.email]),

 })

 email():void{
 if(this.emailForm.valid){
  this.loading=true;
  console.log(this.emailForm.value);
  this._AuthService.ForgotPassword(this.emailForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      this.loading=false;
     
     


      this._Router.navigate(['/verify-code']);


    },
    error:(err)=>{
      
      this.resText=err.error.message;
      this.loading=false;
      
      
    }})






 }


 }


}
