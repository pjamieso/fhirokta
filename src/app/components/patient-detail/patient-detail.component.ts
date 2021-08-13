import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/common/patient';

@Component( {
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
} )
export class PatientDetailComponent implements OnInit {

  constructor() {
  }

  @Input() patient: any;

  ngOnInit(): void {

    //console.log( this.patient );

  }



}
