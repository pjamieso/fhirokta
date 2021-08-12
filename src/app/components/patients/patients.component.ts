import { Component, OnInit } from '@angular/core';
import { Link } from 'src/app/common/link';
import { Patient } from 'src/app/common/patient';
import { PatientService, GetResponsePatients } from 'src/app/services/patient.service';

@Component( {
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
} )
export class PatientsComponent implements OnInit {

  constructor( private patientService: PatientService ) { }
  timestamp: string = "";
  total: number = 0;
  links: Link[] = [];
  patients: Patient[] = [];

  ngOnInit(): void {
  }

  getPatients() {
    this.patientService.getPatientList().subscribe(
      data => {
        //console.log( data );
        const patientResponse = data;
        this.timestamp = patientResponse.timestamp;
        this.total = patientResponse.total;
        patientResponse.link.forEach( ( item: any ) => {
          let link: Link = new Link( item );
          this.links.push( link );
        } );

        patientResponse.entry.forEach( ( item: any ) => {
          let pt: Patient = new Patient( item );
          this.patients.push( pt )
        } );

        console.log( `Generated at: ${this.timestamp}` );
        console.log( `The total patients is ${this.total}` );
        console.log( this.patients );
      },
      error => {
        console.log( error.message );
      }
    );
  }

  findLinkType( linkType: string ): Link | undefined {
    const tempLink = this.links.find( tlink => tlink.relation == linkType );
    return tempLink;
  }

}
