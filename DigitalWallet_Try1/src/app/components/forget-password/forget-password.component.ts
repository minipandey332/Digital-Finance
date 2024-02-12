import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
 
  email : string = '';

  constructor(private auth : ApiService, private router : Router) { }

  ngOnInit(): void {
  }

  forgotPassword() {
    this.auth.forgotPassword(this.email);
    this.email = '';
  }

    // email varification
    sendEmailForVarification(user : any) {
      console.log(user);
      user.sendEmailVerification().then((res : any) => {
        this.router.navigate(['/varify-email']);
      }, (err : any) => {
        alert('Something went wrong. Not able to send mail to your email.')
      })
    }

}
