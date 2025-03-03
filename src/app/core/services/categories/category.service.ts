import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _HttpClient=inject(HttpClient);

  constructor() { }

  GetAllCategories():Observable<any>{

    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`);


  }

  GetSpecificCategory(c_id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${c_id}`)
  }




}
