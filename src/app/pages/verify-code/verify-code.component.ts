import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/authentication/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss'
})
export class VerifyCodeComponent {
private readonly _AuthService=inject(AuthService)
  private readonly _Router=inject(Router);


  loading:Boolean=false;
  resText!:string;
 codeForm:FormGroup = new FormGroup({
    code : new FormControl(null, Validators.required ),

 })

 code():void{
 if(this.codeForm.valid){
  this.loading=true;
  console.log(this.codeForm.value);
  this._AuthService.ResetPassword(this.codeForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      this.loading=false;
     
     


      this._Router.navigate(['/reset-password']);


    },
    error:(err)=>{
      
      this.resText=err.error.message;
      this.loading=false;
      
      
    }})






 }


 }
}
