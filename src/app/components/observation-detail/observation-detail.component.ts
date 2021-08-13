import { Component, Input, OnInit } from '@angular/core';

@Component( {
  selector: 'app-observation-detail',
  templateUrl: './observation-detail.component.html',
  styleUrls: ['./observation-detail.component.css']
} )
export class ObservationDetailComponent implements OnInit {

  constructor() { }
  @Input() observation: any;

  ngOnInit(): void {
  }

}
