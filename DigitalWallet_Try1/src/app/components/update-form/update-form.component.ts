import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent {
  constructor(private authservice : AuthService, private router : Router,private snackBar: MatSnackBar){}
  updateForm = new FormGroup({
    FullName : new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z].*")]),
    Email : new FormControl("",[Validators.required, Validators.email]),
    Date_Of_Birth : new FormControl(""),
    Address : new FormControl(""),
    Mobile : new FormControl("",[Validators.required, Validators.pattern("[0-9]{10}")]),
    
  });

  
  get FullName(): FormControl{
    return this.updateForm.get("FullName") as FormControl;
  }
 
  get Email(): FormControl{
    return this.updateForm.get("Email") as FormControl;
  }
  get Date_Of_Birth(): FormControl{
    return this.updateForm.get("Date_Of_Birth") as FormControl;
  }
  get Address(): FormControl{
    return this.updateForm.get("Address") as FormControl;
  }
 
  get Mobile(): FormControl{
    return this.updateForm.get("Mobile") as FormControl;
  }



  updateSubmit()
  {
    console.log(this.updateForm.value);
    this.authservice.updateUser(this.updateForm.value).subscribe({
      next:(res)=>{
        console.log(this.updateForm.value);
       
         //alert("Your Profile is successfully updated !");
         this.snackBar.open('Update Successfull !!', 'Close', {
          duration: 4000,
          horizontalPosition:'center',
          verticalPosition:'top',
          panelClass: ['error-toaster']
        });
         this.router.navigate(['/dashboard'])
      },
      error:(err)=>{
       // alert(err?.error.message)
       this.snackBar.open('Kindly Fill All Details Properly', 'Try Again', {
        duration: 4000,
        horizontalPosition:'center',
        verticalPosition:'top',
        panelClass: ['error-toaster']
      });
      }
    })

  }
}
