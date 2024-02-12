import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
// import { faSmile, faMeh, faFrown } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import ValidateForm from '../../helpers/validationform';
import { UserStoreService } from 'src/app/services/user-store.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-login3',
  templateUrl: './login3.component.html',
  styleUrls: ['./login3.component.css']
})
export class Login3Component  implements OnInit{
  type:string ="password";
  isText: boolean = false;
  eyeIcon:string = "fa-eye-slash";
  

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder, private authService : AuthService, private router: Router, private userStore: UserStoreService, private snackBar: MatSnackBar) {}
  ngOnInit() {
}
hideShowPass()
{
  this.isText=!this.isText;
  this.isText ? this.eyeIcon ="fa-eye" : this.eyeIcon = "fa-eye-slash";
  this.isText ? this.type = "text" : this.type = "password";
}
loginForm = new FormGroup({
  email : new FormControl("",[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
  password : new FormControl("",[Validators.required, Validators.minLength(6)]),

  Token : new FormControl(""),

});

// onSubmit(){
//   if(this.loginForm.valid){
//     console.log(this.loginForm.value);
//   // send the object using database
//   this.router.navigate(['./phone']);
//   }
//   else{
//     // throw error using toater
//     console.log("Form is invalid");
//     //this.validateAllFormFields(this.loginForm);
//     alert("Your form is incomplete");
//   }
// }

get Email(): FormControl{
  return this.loginForm.get("email") as FormControl;
}
get Password(): FormControl{
  return this.loginForm.get("password") as FormControl;
}
public resetPasswordEmail!: string;
public isValidEmail!: boolean;

checkValidEmail(event: string){
const value = event;
const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
this.isValidEmail = pattern.test(value);
return this.isValidEmail;
}

confirmToSend(){
  if(this.checkValidEmail(this.resetPasswordEmail)){
    console.log(this.resetPasswordEmail);
    this.resetPasswordEmail="";
    const buttonRef = document.getElementById("closeBtn");
    buttonRef?.click()
  }
}
 
  LoginSubmitted(){
 
    if (this.loginForm.valid) {
      
      console.log(this.loginForm.value);
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.loginForm.reset();
          this.authService.storeToken(res.accessToken);
          //this.authService.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.authService.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role);
         localStorage.setItem("email",tokenPayload.name) // 
         
         //alert({detail:"SUCCESS", summary:res.message, duration: 5000});
         this.snackBar.open('Verify Yourself First', 'Ok', {
          duration: 5000,
          horizontalPosition:'center',
          verticalPosition:'top',
          panelClass: ['success-toaster']
        });
         this.loginForm.reset();
          this.router.navigate(['phone'])
        },
        error: (err) => {
          //alert({detail:"ERROR", summary:"Something when wrong!", duration: 5000});
          this.snackBar.open('Login Failed !! Enter Correct Username & Password', 'Try Again', {
            duration: 5000,
            horizontalPosition:'center',
            verticalPosition:'top',
            panelClass: ['success-toaster']
          });
          console.log(err);
        },
      });
    } 

  }

 }

