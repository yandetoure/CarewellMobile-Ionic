import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
})
export class PatientPage implements OnInit {

  constructor(private router: Router) {}

  goToTab1() {
    this.router.navigate(['/tabs/tab1']);
  }
  ngOnInit() {
  }

}
