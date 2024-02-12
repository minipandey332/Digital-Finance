import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import ValidateForm from '../../helpers/validationform';
import { User } from 'src/app/models/User.model';
import { Injectable } from '@angular/core'; // Import Injectable
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
repeatPass:string='none';

  type:string ="password";
  isText: boolean = false;
  eyeIcon:string = "fa-eye-slash";
  
  constructor(private formBuilder: FormBuilder, private authService : AuthService,private router: Router, private snackBar: MatSnackBar) {}
  ngOnInit() {
 
  }
  hideShowPass()
{
  this.isText=!this.isText;
  this.isText ? this.eyeIcon ="fa-eye" : this.eyeIcon = "fa-eye-slash";
  this.isText ? this.type = "text" : this.type = "password";
}

// Registeration Code

  password: string = '';
  passwordStrength: string = '';
  displayMsg:string = "";
  isAccountCreated:boolean=false;

  checkPasswordStrength() {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (strongRegex.test(this.password)) {
      this.passwordStrength = 'strong';
    } else if (mediumRegex.test(this.password)) {
      this.passwordStrength = 'medium';
    } else {
      this.passwordStrength = 'weak';
    }
  }

  registerForm = new FormGroup({
    FullName : new FormControl("",[Validators.required, Validators.pattern("[a-zA-Z].*")]),
    Email : new FormControl("",[Validators.required, Validators.email]),
    Date_Of_Birth : new FormControl(""),
    Address : new FormControl(""),
    Password : new FormControl("",[Validators.required, Validators.minLength(6)]),
    
    Mobile : new FormControl("",[Validators.required, Validators.pattern("[0-9]{10}")]),

    Token: new FormControl(""),
 
  });
  
  get FullName(): FormControl{
    return this.registerForm.get("FullName") as FormControl;
  }
 
  get Email(): FormControl{
    return this.registerForm.get("Email") as FormControl;
  }
  get Date_Of_Birth(): FormControl{
    return this.registerForm.get("Date_Of_Birth") as FormControl;
  }
  get Address(): FormControl{
    return this.registerForm.get("Address") as FormControl;
  }
 
  get Password(): FormControl{
    return this.registerForm.get("Password") as FormControl;
  }
 
  get Mobile(): FormControl{
    return this.registerForm.get("Mobile") as FormControl;
  }
  

  registerSubmitted(){
    //console.log(this.registerForm.value);
    if (this.registerForm.valid)
    {
      console.log(this.registerForm.value);
      console.log("Submitted");
      this.repeatPass = 'none';

      this.authService.signUp(this.registerForm.value).subscribe({
      
        next:(res=>{
          console.log(res.message);
          this.registerForm.reset();
          this.router.navigate(['login']);
          // alert(res.message)
          this.snackBar.open('Successfully Registered!', 'Close', {
            duration: 5000,
            horizontalPosition:'center',
            verticalPosition:'top',
            panelClass: ['success-toaster']
          });
          

          this.router.navigate(['./wallet'])
        }),
        error:(err=>{
         // alert(err?.error.message)
         this.snackBar.open('You have NOT filled all details cprrectly.', 'Try Again', {
          duration: 5000,
          horizontalPosition:'center',
          verticalPosition:'top',
          panelClass: ['success-toaster']
        });
        })

      })
    } // if consition ends
    else {
      ValidateForm.validateAllFormFields(this.registerForm); 
    }

}
}