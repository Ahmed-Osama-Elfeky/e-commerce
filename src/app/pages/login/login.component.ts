import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loading:Boolean=false;
  resText!:string;

  private readonly _AuthService= inject(AuthService);
  private readonly _Router=inject(Router);
 
  loginForm:FormGroup = new FormGroup({

    email : new FormControl(null, [Validators.required , Validators.email]),
    password: new FormControl(null , [Validators.required, Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?(?:\W|_)).{8,})$/), Validators.min(6)]),



  })

  login():void{
    
   
    
    if(this.loginForm.valid){
      this.loading=true;
      console.log(this.loginForm.value);
      this._AuthService.signIn(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.loading=false;
          sessionStorage.setItem('token',res.token);
          this._AuthService.decodeToken();
         


          this._Router.navigate(['/home']);

    
        },
        error:(err)=>{
          
          this.resText=err.error.message;
          this.loading=false;
          
        }
      
        
      })
      
    }else{
      this.loginForm.setErrors({missMatch:true});
      this.loginForm.markAllAsTouched();
    }
        
        
      }


}
