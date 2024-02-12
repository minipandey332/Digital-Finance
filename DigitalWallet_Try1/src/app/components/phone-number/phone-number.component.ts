import { Component, NgZone } from '@angular/core';
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



var config={
  // apiKey: "AIzaSyAkldaJUwOXVlu_vcwqaYjqFVQiNstS4Uo",
  // authDomain: "landing-page-9369c.firebaseapp.com",
  // projectId: "landing-page-9369c",
  // storageBucket: "landing-page-9369c.appspot.com",
  // messagingSenderId: "692378368838",
  // appId: "1:692378368838:web:5bf8c777917dc82bd00347"
  apiKey: "AIzaSyCa7BAYlX56_fqeQaRvMigHYZ6VuBX2tTo",
  authDomain: "phone-auth-a850b.firebaseapp.com",
  projectId: "phone-auth-a850b",
  storageBucket: "phone-auth-a850b.appspot.com",
  messagingSenderId: "396067396560",
  appId: "1:396067396560:web:560a48362e1ddaaa1b37d5",
  measurementId: "G-5EHMCRRBCJ"

}
@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.css']
})
export class PhoneNumberComponent {
  phoneNumber: any;
  email: any;
  password:any;
  reCaptchaVerifier!: any;
  error: any;

  constructor(private router: Router, private ngZone: NgZone, private toastr: ToastrService) {}


  ngOnInit() {

    firebase.initializeApp(config);

  }

  getOTP() {
    this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
      }
    );
    console.log(this.reCaptchaVerifier);

    console.log(this.phoneNumber);
    firebase
      .auth()
      .signInWithPhoneNumber(this.phoneNumber, this.reCaptchaVerifier)
      .then((confirmationResult: { verificationId: any; }) => {
        localStorage.setItem(
          'verificationId',
          JSON.stringify(confirmationResult.verificationId)
        );
        this.ngZone.run(() => {
          this.router.navigate(['/code']);
        });
      })
      .catch((error: { message: any; }) => {
        console.log(error.message);
        this.toastr.error(error.message, 'Error');
        setTimeout(() => {
          window.location.reload();
        }, 10000);
      });
  }
}