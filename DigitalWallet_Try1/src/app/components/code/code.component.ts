import { Component, OnInit, NgZone } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import 'firebase/auth';
import 'firebase/firestore';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
//import * as firebase from 'firebase/app';
//import { initializeApp, getApps } from "firebase/app";
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {
otp!:string
verify:any;
  constructor (private router: Router, private ngZone: NgZone,   private toastr: ToastrService, private snackBar: MatSnackBar){}
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };

  ngOnInit() {
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
    console.log(this.verify);
  }

  onOtpChange(otp: string) {
    this.otp = otp;
  }

  handleClick() {
    console.log(this.otp);
    var credential = firebase.auth.PhoneAuthProvider.credential(
      this.verify,
      this.otp
    );

    console.log(credential);
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((response) => {
        console.log(response);
        localStorage.setItem('user_data', JSON.stringify(response));
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
          
        });
      })
      .catch((error) => {
        console.log(error);
        //this.toastr.error(error.message, 'Error');
        this.snackBar.open('WRONG OTP !', 'Please Try Again', {
          duration: 5000,
          horizontalPosition:'center',
          verticalPosition:'top',
          panelClass: ['success-toaster']
        });
      });
  }
}