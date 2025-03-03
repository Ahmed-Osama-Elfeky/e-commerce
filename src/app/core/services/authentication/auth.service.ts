import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';
import { jwtDecode } from 'jwt-decode';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfo:any;

  constructor(private _HttpClient:HttpClient) { }
  decodeToken(){
    if(sessionStorage.getItem('token')){

    this.userInfo= jwtDecode(sessionStorage.getItem('token')!);
    }
  }

 signUp(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data);
 }

signIn(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data);

}

ForgotPassword(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
}

VerifyResetCode(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
}
UpdateLoggedUserPassword(data:object):Observable<any>{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/users/changeMyPassword`,data)
}

ResetPassword(data:object):Observable<any>{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
}

UpdateLoggedUserData(data:object):Observable<any>{
  return this._HttpClient.put(`${environment.baseUrl}api/v1/users/updateMe/`,data)
}

}
