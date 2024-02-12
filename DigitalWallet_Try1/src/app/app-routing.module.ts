import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { Login3Component } from './components/login3/login3.component';
import { SignupComponent } from './components/signup/signup.component';
import { Signup2Component } from './signup2/signup2.component';
import { LandingComponent } from './components/landing/landing.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';

import { AuthGuard } from './guards/auth.guard';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { WalletCreationComponent } from './components/wallet-creation/wallet-creation.component';
import { DepositAmountComponent } from './components/deposit-amount/deposit-amount.component';
import { WithdrawAmountComponent } from './components/withdraw-amount/withdraw-amount.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PhoneNumberComponent } from './components/phone-number/phone-number.component';
import { CodeComponent } from './components/code/code.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { MobileRechargeComponent } from './components/mobile-recharge/mobile-recharge.component';
import { FoodPaymentComponent } from './components/food-payment/food-payment.component';
import { ElectricityPaymentComponent } from './components/electricity-payment/electricity-payment.component';
import { MiddlepageComponent } from './components/middlepage/middlepage.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { VarifyEmailComponent } from './components/varify-email/varify-email.component';

const routes: Routes = [
  
  {
    component: RegisterComponent,
    path: 'register'
  },
  {
    component: HeaderComponent,
    path: 'header'
  },
  {
    component: Login3Component,
    path: 'login',
  
  },
  {
    component: SignupComponent,
    path:'signup'
  },
  {
    component: Signup2Component,
    path: 'signup2'
  },
  {
    component: LandingComponent,
    path: 'landing'
  },
  {
    component: UpdateFormComponent,
    path: 'update',
   
  },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   canActivate:[AuthGuard]
    
  // },
  {
    path: 'forget',
    component: ForgetPasswordComponent
   
  },
  {
    path: 'wallet',
    component: WalletCreationComponent
   
  },
  {
    path: 'deposit',
    component: DepositAmountComponent
    
  },
  {
    path: 'withdraw',
    component: WithdrawAmountComponent
   
  },
  {
    path: 'profile',
    component: ProfileComponent
    
  },

  {
    path: 'phone',
    component: PhoneNumberComponent
   
  },


  {
    path: 'code',
    component: CodeComponent,
   
  },
  {
  path: 'middlepage',
  component: MiddlepageComponent
 
  },


  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard] // Use the AuthGuard to protect the route
   
  },
  
  {
    path: 'about',
    component: AboutUsComponent
    
  },
  {
    path: 'contact',
    component: ContactUsComponent
  
  },
  {
     path:'transfer',
     component: TransactionComponent
    
  },
  {
   path: 'shopping',
   component: ShoppingComponent
 
  },
  {
  path: 'mobile',
  component: MobileRechargeComponent
  
  },
  {
path: 'food',
component: FoodPaymentComponent

  },
  {
path: 'electricity',
component: ElectricityPaymentComponent

  },
  {
  path: 'history',
  component: TransactionHistoryComponent
  
  },
  {path: 'forgot-password', component : ForgetPasswordComponent},
  {path: 'varify-email', component : VarifyEmailComponent},

  { path: '', redirectTo: '/landing', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
