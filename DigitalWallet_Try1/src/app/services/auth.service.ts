import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'
import { TokenApiModel } from '../models/token-api.model';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/User.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7222/api/User/';
  user:string
  //https://localhost:7222/api/User/authenticate
  private userPayload:any;
  constructor(private http: HttpClient, private router: Router) {
    // this.userPayload = this.decodedToken();
    // this.user=this.userPayload.name;
    // console.warn(this.userPayload.name);
   }

   currentUser:User = new User();
   //private baseUrl: string = 'https://localhost:7138/api/User/';
   getUserByUserName(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}GetCustomerByUserName/${email}`)
  }

   private apiUrl = 'https://localhost:7222/api/User/updates';
   updateUser(updatedUser: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<any>(this.apiUrl, updatedUser, { headers: headers })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
   }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj)
  }

  signIn(loginObj : any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)
  }

  deposit(depositObj: any){
 return this.http.post<any>( 'https://localhost:7222/api/User/DepositMoney' ,depositObj );
  }


  withdraw(withdrawObj: any){
    return this.http.post<any>( 'https://localhost:7222/api/User/withdraw' ,withdrawObj );
     }
  
  transferMoney(transferObj: any){
    return this.http.post<any>( 'https://localhost:7222/api/User/transfer' ,transferObj );
     }

  resetPassword(email: string, newPassword: string) {
    const url = `https://localhost:7222/api/User/reset-password`;
    const body = {
      email: email,
      newPassword: newPassword
    };
    return this.http.put(url, body);
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['landing'])
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }
  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(token);
    
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  // getfullNameFromToken(){
  //   if(this.userPayload)
  //   return this.userPayload.name;
  // }
  getfullNameFromToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    if (token) {
      const decodedToken = jwtHelper.decodeToken(token);
      return decodedToken.name;
    }
    return null;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  renewToken(tokenApi : TokenApiModel){
    return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi)
  }
  getTableData(){
    return this.http.get<any[]>('https://localhost:7244/api/TransactionHistories/api/AllTransaction');
  }

  getbyemail = 'https://localhost:7222/api/User/user';
  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.getbyemail}/${email}`);
  }

  getbywallet = 'https://localhost:7222/api/User/wallet';
  getUserByWaller(email: string): Observable<any> {
    return this.http.get<any>(`${this.getbywallet}/${email}`);
  }

  getTable='https://localhost:7222/api/User/transactionHistoryapi';
  getTransactionTable(email:string):Observable<any>{
    return this.http.get<any>(`${this.getTable}/${email}`);
  }

}
