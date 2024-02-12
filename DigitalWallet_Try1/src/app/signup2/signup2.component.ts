import { Component } from '@angular/core';
import {FormBuilder,Validators, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-signup2',
  templateUrl: './signup2.component.html',
  styleUrls: ['./signup2.component.css']
})
export class Signup2Component {


  // registerForm: FormGroup | undefined;
  // firstFormGroup: FormGroup | undefined;
  // secondFormGroup: FormGroup | undefined;

  // isAccountCreated: boolean = false;
  // displayMsg: string = '';

  // constructor(private formBuilder: FormBuilder) { }

  // ngOnInit(): void {
  //   this.firstFormGroup = this.formBuilder.group({
  //     rname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
  //     remail: ['', [Validators.required, Validators.email]]
  //     // Add other form controls for Step 1
  //   });

  //   this.secondFormGroup = this.formBuilder.group({
  //     // Add form controls for Step 2
  //   });

  //   this.registerForm = this.formBuilder.group({
  //     firstFormGroup: this.firstFormGroup,
  //     secondFormGroup: this.secondFormGroup
  //   });
  // }

  // get RName() {
  //   return this.firstFormGroup.controls['rname'];
  // }

  // get REmail() {
  //   return this.firstFormGroup.controls['remail'];
  // }

  // onSubmit() {
  //   if (this.registerForm.invalid) {
  //     return;
  //   }

  //   // Process the form data and create account
  //   // Example: Call an API or perform necessary actions

  //   this.isAccountCreated = true;
  //   this.displayMsg = 'Account created successfully!';
  // }
}
