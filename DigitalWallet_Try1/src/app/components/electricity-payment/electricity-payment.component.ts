import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-electricity-payment',
  templateUrl: './electricity-payment.component.html',
  styleUrls: ['./electricity-payment.component.css']
})
export class ElectricityPaymentComponent {
  currentStep: number = 1;
 

  constructor(private fb: FormBuilder, private router: Router, private authService : AuthService) {}

  ngOnInit() {}
  
  depositForm = new FormGroup({
    CardNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{12}$')]),
    CVV: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('^[0-9]{3}$')]),
    Amount : new FormControl('')
  });

  get CardNumber(): FormControl {
    return this.depositForm.get('CardNumber') as FormControl;
  }

  get CVV(): FormControl {
    return this.depositForm.get('CVV') as FormControl;
  }

 
  get Amount(): FormControl {
    return this.depositForm.get('Amount') as FormControl;
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

      console.log(this.depositForm.value);
        this.authService.withdraw(this.depositForm.value).subscribe({
            next:(res)=>{
             console.log(res.message);
             alert("Payment Success !")
             this.router.navigate(['/dashboard']);
              },
            error:(err)=>{
              alert(err?.error.message)
            }
          })
       

    }

  }