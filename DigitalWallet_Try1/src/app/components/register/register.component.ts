import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor(){}
  ngOnInit():void{

  }
  registerForm = new FormGroup({
    FullName : new FormControl("",[Validators.required, Validators.pattern("[a-zA-Z].*")]),
   // lastname : new FormControl("",[Validators.required, Validators.pattern("[a-zA-Z].*")]),
   Email : new FormControl("",[Validators.required, Validators.email]),
   Mobile : new FormControl(""),
    gender : new FormControl(""),
    Password : new FormControl(""),
    rpwd : new FormControl(""),
  });



  registerSubmitted(){
    console.log(this.registerForm.value);
  }

  get FirstName(): FormControl{
    return this.registerForm.get("FullName") as FormControl;
  }
  // get LastName(): FormControl{
  //   return this.registerForm.get("lastname") as FormControl;
  // }
  get Email(): FormControl{
    return this.registerForm.get("Email") as FormControl;
  }
  get Mobile(): FormControl{
    return this.registerForm.get("Mobile") as FormControl;
  }
  get Gender(): FormControl{
    return this.registerForm.get("gender") as FormControl;
  }
  get Password(): FormControl{
    return this.registerForm.get("Password") as FormControl;
  }

  get RPassword(): FormControl{
    return this.registerForm.get("rpwd") as FormControl;
  }
}
