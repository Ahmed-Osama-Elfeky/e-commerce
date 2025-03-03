import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { error, log } from 'console';
import { AuthService } from '../../core/services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  resText!:string;
  loading:boolean=false;
  private readonly _AuthService=inject(AuthService);
  private readonly _Router=inject(Router);


  registerForms:FormGroup = new FormGroup({
    name:  new FormControl(null , [Validators.required , Validators.minLength(3), Validators.maxLength(20)]),
    email : new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null , [Validators.required, Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?(?:\W|_)).{8,})$/), Validators.min(6)]),
    
    rePassword:new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])

  }, this.compare)

  
  
  register():void{
   
    
if(this.registerForms.valid){
  this.loading=true;
  console.log(this.registerForms.value);
  this._AuthService.signUp(this.registerForms.value).subscribe({
    next:(res)=>{
      console.log(res);
      this.loading=false;
      this._Router.navigate(['/login'])

    },
    error:(err)=>{
      
      this.resText=err.error.message;
      this.loading=false;
      
    }
    
  })
  
}else{
  this.registerForms.setErrors({missMatch:true});
  this.registerForms.markAllAsTouched();
}
    
    
  }

  compare(group:AbstractControl){
    
   return (group.get('password')?.value === group.get('rePassword')?.value) ? null : {missMath:true}

}
}
