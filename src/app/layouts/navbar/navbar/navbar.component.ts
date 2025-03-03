import { Component, inject, input, InputSignal, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/authentication/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit , OnDestroy{
  navbarCount!:number;
  cancel!:Subscription;
  check:InputSignal<boolean>=input(false)

  private readonly _Router=inject(Router);
  private readonly _AuthService=inject(AuthService);
  private readonly _CartService=inject(CartService)

  logOut(){
    sessionStorage.removeItem('token');
    this._Router.navigate(['/login']);
    this._AuthService.userInfo=null;
  }

  ngOnInit(): void {

this._CartService.GetLoggedUserCart().subscribe({
  next:(res)=>{
    this.navbarCount =res.numOfCartItems;


  }
})

    this.cancel=this._CartService.cartCount.subscribe({
      next:(value)=>{
        this.navbarCount=value;


      }
    })
  }

  ngOnDestroy(): void {
    this.cancel?.unsubscribe()
  }


}
