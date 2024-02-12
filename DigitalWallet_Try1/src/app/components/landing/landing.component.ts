import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {



  
 ngOnInit(): void {
   this.updateTime();
   this.updateDate();
  
  //  setInterval(() => {
  //    this.updateTime();
  //  }, 1000);
 }
 constructor(private sanitizer: DomSanitizer,  public toastr: ToastrService,  private snackBar: MatSnackBar ) { 
}
 updateTime() {
   const now = new Date();
   const timeElement = document.getElementById("time")!;
   timeElement.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
 }

 updateDate() {
   const now = new Date();
   const dateElement = document.getElementById("date")!;
   dateElement.textContent = now.toDateString();
 }

//  showSuccessToaster() {
//   this.toastr.success('Success!', 'Toaster');
// }


showSuccessToaster() {
  this.snackBar.open('Welcome To Our App!', 'Close', {
    duration: 3000,
    panelClass: ['success-toaster']
  });
}



}
