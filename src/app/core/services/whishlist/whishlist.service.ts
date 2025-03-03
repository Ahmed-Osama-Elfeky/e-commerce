import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {
  



  userToken:any
  constructor(private _HttpClient:HttpClient,  @Inject(PLATFORM_ID) private _PLATFORM_ID:any ) {
    if(isPlatformBrowser(this._PLATFORM_ID)){

      this.userToken={'token': sessionStorage.getItem('token')};

      }else{
        this.userToken={}
      }
  }

  GetLoggedUserWishlist():Observable<any>{
    return  this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`)

  }

  AddProductToWhishlist(w_id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,{"productId":w_id})
  }

  RemoveProductFromWishlist(w_id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${w_id}`)

  }

}




