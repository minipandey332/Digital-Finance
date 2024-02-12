import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-deposit-amount',
  templateUrl: './deposit-amount.component.html',
  styleUrls: ['./deposit-amount.component.css']
})
export class DepositAmountComponent {
  email:string;
  userData:any;
  senderMobileNumber:string='';
  senderName:string;
  senderCardNumber:string;

constructor(private authservice : AuthService,  public toastr: ToastrService, private router: Router, private snackBar: MatSnackBar){}
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
  depositForm = new FormGroup({
    CardNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{12}$')]),
    Mobile : new FormControl("",[Validators.required, Validators.pattern("[0-9]{10}")]),
    Amount : new FormControl('')

  
  });
  
  get CardNumber(): FormControl {
    return this.depositForm.get('CardNumber') as FormControl;
  }

  get Mobile(): FormControl {
    return this.depositForm.get('Mobile') as FormControl;
  }

 
  get Amount(): FormControl {
    return this.depositForm.get('Amount') as FormControl;
  }
  tos(){
    this.toastr.success('will inform once price dropped');
  }

  DepositSubmitted(){
    this.authservice.deposit(this.depositForm.value).subscribe({
        next:(res)=>{
         
         console.log(res.message);
         this.snackBar.open('Deposit Successful!', 'Close', {
          duration: 5000,
          
          panelClass: ['custom-snackbar'] // Apply the custom styles here
        });

        
         this.router.navigate(['/dashboard']);
        
          },
        error:(err)=>{
          if(this.depositForm.value.Mobile != this.senderMobileNumber)
          {
          this.snackBar.open('Enter only registered mobile number.', 'Try Again', {
            duration: 5000,
            horizontalPosition:'center',
            verticalPosition:'top',
            
            panelClass: ['custom-snackbar'] 
          });
        }
        if(this.depositForm.value.CardNumber != this.senderCardNumber)
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
