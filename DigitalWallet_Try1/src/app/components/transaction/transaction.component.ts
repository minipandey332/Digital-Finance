import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit{
  currentStep: number = 1;
  walletDetails: any;
  email:string;
  senderMobileNumber:string='';
  isSenderMobileDisabled: boolean = false; //remove

  constructor(private fb: FormBuilder, private router: Router, private authService : AuthService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.email=localStorage.getItem("email");
    this.authService.getUserByWaller(this.email).subscribe(
      (wallet: any) => {
       console.log(wallet);
       this.isSenderMobileDisabled = true;//remove
       this.walletDetails = wallet;
       this.senderMobileNumber = this.walletDetails.mobile;
       this.transferForm.get('SenderMobile').setValue(this.senderMobileNumber); 
      },
   (error: any) => {
     console.error('Error fetching wallet details:', error);
   }
   );
  }
  
  transferForm = new FormGroup({
    // SenderCardNumber : new FormControl('',[Validators.required, Validators.pattern('^[0-9]{12}$')]),
    // SenderCVV : new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('^[0-9]{3}$')]),
    // RecipientCardNumber :  new FormControl('',[Validators.required, Validators.pattern('^[0-9]{12}$')]),

    SenderMobile : new FormControl("",[Validators.required, Validators.pattern("[0-9]{10}")]),
    RecipientMobile : new FormControl("",[Validators.required, Validators.pattern("[0-9]{10}")]),

     Amount : new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
  });
  get SenderMobile(): FormControl {
    return this.transferForm.get('SenderMobile') as FormControl;
  }
  get RecipientMobile(): FormControl {
    return this.transferForm.get('RecipientMobile') as FormControl;
  }
  get Amount(): FormControl {
    return this.transferForm.get('Amount') as FormControl;
  }


  getProgressPercentage(): string {
    const totalSteps = 2;
    const progress = ((this.currentStep - 1) / totalSteps) * 100;
    return progress + '%';
  }

  nextStep() {
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }

  onSubmit() {

    this.currentStep = 3;
  
      // Calculate the progress percentage
      const totalSteps = 3;
      const progress = (this.currentStep / totalSteps) * 100;
  
      // Update the width of the progress bar
      const progressBar = document.querySelector('.progress-bar') as HTMLElement;
      progressBar.style.width = progress + '%';

      console.log(this.transferForm.value);
        this.authService.transferMoney(this.transferForm.value).subscribe({
            next:(res)=>{
             console.log(res.message);
            //  alert("Transfer success")
            this.snackBar.open('Transaction Successfully Done!', 'Close', {
              duration: 4000,
             
              panelClass: ['success-toaster']
            });
             this.router.navigate(['/dashboard']);
              },
            error:(err)=>{
              console.error(err); // Log the error to the console for debugging
              this.snackBar.open('Transaction Failed!', 'Close', {
                duration: 4000,
                horizontalPosition:'center',
                verticalPosition:'top',
                panelClass: ['error-toaster']
              });
            }
          })
       

    }

  }
  

