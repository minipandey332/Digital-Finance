import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService : AuthService, private router: Router) { }
  // canActivate(): boolean {
  //   if (this.authService.isLoggedIn()) {
  //     return true; // User is not logged in, allow access to login page
  //   } else {
  //     alert("login here first");
  //     this.router.navigate(['login']); // Redirect to landing page if already logged in
  //     return false;
  //   }
  // }

//   canActivate():boolean{
//     if(this.authService.isLoggedIn()){
//         return true;
//     }else{
//         this.router.navigate(['/login'])
//         alert("Please login first!")
//         return false;
//     }
// }
canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean {
  if (this.authService.isLoggedIn()) {
    return true;
  } else {
    this.router.navigate(['login']); // Redirect to login page if not logged in
    return false;
  }
}
}