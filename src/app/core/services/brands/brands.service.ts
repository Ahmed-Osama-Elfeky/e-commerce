import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService   {
  private readonly _HttpClient=inject(HttpClient)

  constructor( ) { }


  GetAllBrands():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands`)

  }


GetSpecificBrand(b_id:string):Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands/${b_id}`)
}






}
