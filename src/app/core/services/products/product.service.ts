import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _HttpClient=inject(HttpClient);
  constructor() { }
  getAllproducts():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`)

  }
  getSpecificPeoducts(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
  }

}
