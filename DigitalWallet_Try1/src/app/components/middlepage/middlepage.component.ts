import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-middlepage',
  templateUrl: './middlepage.component.html',
  styleUrls: ['./middlepage.component.css']
})
export class MiddlepageComponent implements OnInit {
  constructor( private router: Router) {}
  ngOnInit() {
}

}
