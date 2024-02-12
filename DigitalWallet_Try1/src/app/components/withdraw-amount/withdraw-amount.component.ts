import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-withdraw-amount',
  templateUrl: './withdraw-amount.component.html',
  styleUrls: ['./withdraw-amount.component.css']
})
export class WithdrawAmountComponent {
  email:string;
  userData:any;
  senderMobileNumber:string='';
  senderName:string;
  senderCardNumber:string;
  constructor(private authservice : AuthService, private router : Router, private snackBar: MatSnackBar){}
  ngOnInit(): void {
    this.email=localStorage.getItem("email");
  
    this.authservice.getUserByEmail(this.email).subscribe(
      (user: any) => {
        console.log(user);
        this.userData = user;
        this.senderMobileNumber = this.userData.mobile;
        this.senderName = this.userData.fullName;
        this.senderCardNumber = this.userData.cardNumber;

      },
      (error: any) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
  withdrawForm = new FormGroup({
    CardNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{12}$')]),
    Mobile : new FormControl("",[Validators.required, Validators.pattern("[0-9]{10}")]),
    Amount : new FormControl('')
  });
  
  get CardNumber(): FormControl {
    return this.withdrawForm.get('CardNumber') as FormControl;
  }

  get Mobile(): FormControl {
    return this.withdrawForm.get('Mobile') as FormControl;
  }

 
  get Amount(): FormControl {
    return this.withdrawForm.get('Amount') as FormControl;
  }
  WithdrawSubmitted(){
    
    this.authservice.withdraw(this.withdrawForm.value).subscribe({
        next:(res)=>{
        
         console.log(res.message);
         this.snackBar.open('Withdraw Successful!', 'Close', {
          duration: 5000,
          panelClass: ['custom-snackbar'] // Apply the custom styles here
        });
         this.router.navigate(['/dashboard']);
          
          },
        error:(err)=>{
          if(this.withdrawForm.value.Mobile != this.senderMobileNumber)
          {
          this.snackBar.open('Enter only registered mobile number.', 'Try Again', {
            duration: 5000,
            horizontalPosition:'center',
            verticalPosition:'top',
            
            panelClass: ['custom-snackbar'] 
          });
        }
        if(this.withdrawForm.value.CardNumber != this.senderCardNumber)
        {
          this.snackBar.open('CARD NUMBER is Wrong !!', 'Try Again', {
            duration: 5000,
            horizontalPosition:'center',
            verticalPosition:'top',
            
            panelClass: ['custom-snackbar'] 
          });
        }
        }
      })
   }

}
