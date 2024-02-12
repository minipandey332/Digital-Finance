import { Component, OnInit } from '@angular/core';
// import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { WalletAuthService } from 'src/app/services/wallet-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-wallet-creation',
  templateUrl: './wallet-creation.component.html',
  styleUrls: ['./wallet-creation.component.css']
})
export class WalletCreationComponent implements OnInit {
  userData: any; // Declare a property to store the user details
  walletDetails: any;
  email : any;
  senderEmail: any;

  walletcreateform = new FormGroup({
    CardNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{12}$')]),
    CVV: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('^[0-9]{3}$')]),
    AccountHolderName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z\\s]+$')]),
    WalletBalance: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    UserComments: new FormControl(''),
    Email : new FormControl("",[Validators.required, Validators.email])
    // Mobile no. should be autofilled.
  });

  constructor( private route : Router, private userservice : AuthService,     private authService : WalletAuthService, private snackBar: MatSnackBar ) {}

  ngOnInit(): void {
    this.email=localStorage.getItem("email");
  
    this.userservice.getUserByEmail(this.email).subscribe(
      (user: any) => {
        console.log(user);
        this.userData = user;
        this.senderEmail = this.userData.email;
        this.walletcreateform.get('Email').setValue(this.senderEmail); 
      },
      (error: any) => {
        console.error('Error fetching user details:', error);
      }
    );

  }

  get CardNumber(): FormControl {
    return this.walletcreateform.get('CardNumber') as FormControl;
  }

  get CVV(): FormControl {
    return this.walletcreateform.get('CVV') as FormControl;
  }

  get AccountHolderName(): FormControl {
    return this.walletcreateform.get('AccountHolderName') as FormControl;
  }

  get WalletBalance(): FormControl {
    return this.walletcreateform.get('WalletBalance') as FormControl;
  }

  get UserComments(): FormControl {
    return this.walletcreateform.get('UserComments') as FormControl;
  }
  get Email(): FormControl{
    return this.walletcreateform.get("Email") as FormControl;
  }

  CreateWallet(): void {
    //alert('Your wallet has been created successfully!');
    this.snackBar.open('Wallet Created !', 'Close', {
      duration: 5000,
      horizontalPosition:'center',
      verticalPosition:'top',
      panelClass: ['success-toaster']
     
    });
  }

  OnSubmitWallet(): void {
    console.warn(this.walletcreateform.value);

    const signUpObj = {
      ...this.walletcreateform.value,
     
      UpdatedAt: new Date().toISOString(),
     
      WalletCreationDate: new Date().toISOString(),

    
    }

    this.authService.wallet(signUpObj).subscribe(
      (res: any) => {
        console.log(res.message);
        this.walletcreateform.reset();
        
       // alert(res.message);
       this.snackBar.open('Wallet Created !', 'Close', {
        duration: 5000,
        horizontalPosition:'center',
        verticalPosition:'top',
        panelClass: ['success-toaster']
       
      });
      this.snackBar.open('Do Login First to go to Dashboard!', 'Close', {
        duration: 5000,
        horizontalPosition:'center',
        verticalPosition:'top',
        panelClass: ['success-toaster']
      });
      
        this.route.navigate(['login']);
      },
      (err: any) => {
        //alert('Form is stuck here...');
        this.snackBar.open('You have entered Wrong Details !!', 'Try Again', {
          duration: 5000,
        horizontalPosition:'center',
        verticalPosition:'top',
          panelClass: ['success-toaster']
        });
      }
    );
  }

}



