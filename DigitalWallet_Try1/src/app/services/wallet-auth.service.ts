import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WalletAuthService {

  constructor(private http : HttpClient) { }

  // private url = 'https://localhost:7134/api/UserWallets/';
  private url = 'https://localhost:7222/api/User/CreateWallet';

  wallet(userObj: any){
    // return this.http.post<any>('${this.url}CreateWallet', userObj);
    return this.http.post<any>(this.url, userObj);
  }
}
