import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

import jsPDF from 'jspdf';

 

@Component({

  selector: 'app-transaction-history',

  templateUrl: './transaction-history.component.html',

  styleUrls: ['./transaction-history.component.css']

})

export class TransactionHistoryComponent implements OnInit {

  tableData: Data[] = [];

  email: any;

  @ViewChild('content', { static: false }) el!: ElementRef;

 

  constructor(private authService: AuthService) {}

 

  ngOnInit() {

    this.email = localStorage.getItem("email");

    this.authService.getTransactionTable(this.email).subscribe(

      (user: any) => {

        console.log(user);

        this.tableData = user;

      },

      (error: any) => {

        console.error('Error fetching user details:', error);

      }

    );

  }

 

  MakePDF() {

    const pdf = new jsPDF();

    const fontSize = 12;

    const lineHeight = 8;

    const pageHeight = pdf.internal.pageSize.height;

    const pageWidth = pdf.internal.pageSize.width;

 

    pdf.setFontSize(fontSize);

 

    let yPos = 15;

    for (const dataItem of this.tableData) {

      const contentWidth = pdf.getStringUnitWidth(`ID: ${dataItem.id}`) * fontSize;

      const cellHeight = lineHeight;

      let textLines = pdf.splitTextToSize(`ID: ${dataItem.id}\nTransaction ID: ${dataItem.transactionId}\nEmail: ${dataItem.email}\nMobile: ${dataItem.mobile}\nDeposit: ${dataItem.deposit}\nWithdraw: ${dataItem.withdraw}\nComment: ${dataItem.comment}\nCreation Date: ${dataItem.creationDate}`, pageWidth - 20);

 

      if (yPos + (textLines.length * cellHeight) > pageHeight - 10) {

        pdf.addPage();

        yPos = 15;

      }

 

      pdf.text(textLines, 10, yPos);

      yPos += textLines.length * cellHeight + 5;

    }

 

    // Save the PDF

    pdf.save("history.pdf");

  }

}

 

interface Data {

  id: number;

  transactionId: string;

  email: string;

  mobile: string;

  deposit: number;

  withdraw: number;

  comment: string;

  creationDate: Date;

}

 