import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { ToastrService } from 'ngx-toastr';

var config={
//   apiKey: "AIzaSyCa7BAYlX56_fqeQaRvMigHYZ6VuBX2tTo",

// authDomain: "phone-auth-a850b.firebaseapp.com",
//     projectId: "phone-auth-a850b",
//   storageBucket: "phone-auth-a850b.appspot.com",
//   messagingSenderId: "396067396560",
//   appId: "1:396067396560:web:560a48362e1ddaaa1b37d5",
//   measurementId: "G-5EHMCRRBCJ"

apiKey: "AIzaSyAFLgDzdFZB12HLTE7aQqjmk0biYrw2y9I",
  authDomain: "digital-wallet-662bc.firebaseapp.com",
  projectId: "digital-wallet-662bc",
  storageBucket: "digital-wallet-662bc.appspot.com",
  messagingSenderId: "1087097038635",
  appId: "1:1087097038635:web:7f74e606c7661fd747476e"

}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone
  ) {}


  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;


  checkValidEmail(event: string) {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend() {
    if (this.checkValidEmail(this.resetPasswordEmail)) {
      console.log(this.resetPasswordEmail);
      this.resetPasswordEmail = "";
      const buttonRef = document.getElementById("closeBtn");
      buttonRef?.click();
    }
  }
  sendResetPasswordEmail() {
    this.afAuth
      .sendPasswordResetEmail(this.resetPasswordEmail)
      .then(() => {
        alert('Password reset email sent successfully.');
        // Redirect the user to the login page or any other desired page after sending the reset email
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        // Handle the error appropriately (e.g., show an error message)
        console.error('Error sending password reset email:', error);
      });
  }
  
  fullName: string = '';
  selectedImage: string = 'https://via.placeholder.com/150';

  tableData:any;
 
  userDetails: any; // Declare a property to store the user details
  walletDetails: any;
  userEmail : any;
  
 CurrentUser:User;
  email:string;
  ngOnInit() {
    firebase.initializeApp(config);
    this.email=localStorage.getItem("email");
  
    this.authService.getUserByEmail(this.email).subscribe(
      (user: any) => {
        console.log(user);
        this.tableData = user;
      },
      (error: any) => {
        console.error('Error fetching user details:', error);
      }
    );

    this.authService.getUserByWaller(this.email).subscribe(
      (wallet: any) => {
       console.log(wallet);
       this.walletDetails = wallet;
      },
   (error: any) => {
     console.error('Error fetching wallet details:', error);
   }
   );
  
  }

  

  onImageSelect(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    // Perform any necessary logic, such as saving data to a backend server

    // Optionally, you can store the fullName in local storage for persistence
    localStorage.setItem('fullName', this.fullName);
    this.router.navigate(['./dashboard'])
  }
}

