import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 // userDetails:User=new User();
  userDetails: any; // Declare a property to store the user details
  walletDetails: any;
  userEmail : any;
  
  CurrentUser:User;
  email:string;
  constructor(private authService : AuthService, private snackBar: MatSnackBar){}
  ngOnInit(): void {
    // this.authService.getUserByUserName(this.authService.currentUser.email).subscribe((value)=>{
    
    //   this.userDetails=value;
      
    //   })

   // const userEmail = this.authService.getfullNameFromToken(); // Replace with the user's email you want to fetch
    //const token = this.authService.getToken(); // Get the token for the currently logged-in user
//const tokenPayload = this.authService.decodedToken(token); // Decode the token



this.userEmail = localStorage.getItem("email");
    //console.log("emailwanted: ", userEmail);
    this.authService.getUserByEmail(this.userEmail).subscribe(
      (user: any) => {
        // this.snackBar.open('Hi! Welcome To Dashboard', 'Close', {
        //   duration: 3000,
        //   horizontalPosition:'center',
        //   verticalPosition:'bottom',
        //   panelClass: ['success-toaster']
        // });
        console.log(user);
        this.userDetails = user;
      },
      (error: any) => {
        console.error('Error fetching user details:', error);
      }
    );

    this.authService.getUserByWaller(this.userEmail).subscribe(
       (wallet: any) => {
        console.log(wallet);
        this.walletDetails = wallet;
       },
    (error: any) => {
      console.error('Error fetching wallet details:', error);
    }
    );
  }
  onSignOut() {
    this.authService.signOut();
  }
}
function logoutButton() {
  throw new Error('Function not implemented.');
}


