import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatDialogModule } from '@angular/material/dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';

import { Login3Component } from './components/login3/login3.component';


import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AuthService } from './services/auth.service';
import { SignupComponent } from './components/signup/signup.component';

import { Signup2Component } from './signup2/signup2.component';
import { LandingComponent } from './components/landing/landing.component';

import { WalletComponent } from './components/wallet/wallet.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


import {MatStepperModule} from '@angular/material/stepper';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

import { TokenInterceptor } from './Interceptors/token.interceptor';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { WalletCreationComponent } from './components/wallet-creation/wallet-creation.component';
import { DepositAmountComponent } from './components/deposit-amount/deposit-amount.component';
import { WithdrawAmountComponent } from './components/withdraw-amount/withdraw-amount.component';
import { ProfileComponent } from './components/profile/profile.component';

import { PhoneNumberComponent } from './components/phone-number/phone-number.component';
//import { initializeApp } from 'firebase/app';
import { CodeComponent } from './components/code/code.component';


import { AngularFireModule } from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { Auth } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase/app';
//firebase.initializeApp(environment.firebase);
import { NgOtpInputModule } from  'ng-otp-input';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatDividerModule } from '@angular/material/divider'; 

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TransactionComponent } from './components/transaction/transaction.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { MobileRechargeComponent } from './components/mobile-recharge/mobile-recharge.component';
import { FoodPaymentComponent } from './components/food-payment/food-payment.component';
import { ElectricityPaymentComponent } from './components/electricity-payment/electricity-payment.component';
import { MiddlepageComponent } from './components/middlepage/middlepage.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { VarifyEmailComponent } from './components/varify-email/varify-email.component';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    
    HeaderComponent,
   
    Login3Component,
    
        SignupComponent,
       
        Signup2Component,
                LandingComponent,
               
                WalletComponent,
                UserProfileComponent,
                UpdateFormComponent,
                NavbarComponent,
                FooterComponent,
                ForgetPasswordComponent,
                WalletCreationComponent,
                DepositAmountComponent,
                WithdrawAmountComponent,
                ProfileComponent,
                CodeComponent,
                PhoneNumberComponent,
                DashboardComponent,
                ContactUsComponent,
                AboutUsComponent,
                TransactionComponent,
                ShoppingComponent,
                MobileRechargeComponent,
                FoodPaymentComponent,
                ElectricityPaymentComponent,
                MiddlepageComponent,
                TransactionHistoryComponent,
                VarifyEmailComponent
                
   
   
  ],
  imports: [
    MatSnackBarModule,
    BrowserModule,
    AppRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,

    MatStepperModule,
    MatDialogModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    BrowserAnimationsModule,
  
    AngularFireModule,
   
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgOtpInputModule,
    AngularFireModule.initializeApp(environment.firebase),
   

    

    ToastrModule.forRoot(),
    ToastrModule.forRoot({
      timeOut:1000,
      enableHtml:true,
      positionClass:'toast-bottom-right',
      preventDuplicates:true
    }),

  ],
  providers: [
    AuthService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
