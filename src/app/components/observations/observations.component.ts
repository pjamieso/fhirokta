import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Link } from 'src/app/common/link';
import { Observation } from 'src/app/common/observation';
import { ObservationService } from 'src/app/services/observation.service';

@Component( {
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.css']
} )
export class ObservationsComponent implements OnInit {
  timestamp: string = "";
  total: number = 0;
  links: Link[] = [];
  observations: Observation[] = [];
  selectedObservation: Observation | undefined;
  currentPatientId: any;

  constructor( private observationService: ObservationService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( () => {
      this.getObservations();
    } )
  }

  getObservations() {
    const hasPatientId: boolean = this.route.snapshot.paramMap.has( 'id' );

    if ( hasPatientId ) {
      this.currentPatientId = this.route.snapshot.paramMap.get( 'id' );
    } else {
      this.currentPatientId = '1';
    }

    this.observationService.getObservationList( this.currentPatientId ).subscribe(
      data => {
        //console.log( data );
        this.observations = [];
        this.links = [];
        const observationResponse = data;
        this.timestamp = observationResponse.timestamp;
        this.total = observationResponse.total;
        observationResponse.link.forEach( ( item: any ) => {
          let link: Link = new Link( item );
          this.links.push( link );
        } );

        observationResponse.entry.forEach( ( item: any ) => {
          let obs: Observation = new Observation( item );
          this.observations.push( obs )
        } );

        console.log( `Generated at: ${this.timestamp}` );
        console.log( `The total observations is ${this.total}` );
        console.log( this.observations );
      },
      error => {
        console.log( error.message );
      }
    );
  }

  getObservationsByUrl( url: string ) {
    this.observationService.getObservationListByUrl( url ).subscribe(
      data => {
        //console.log( data );
        this.observations = [];
        this.links = [];
        const observationResponse = data;
        this.timestamp = observationResponse.timestamp;
        this.total = observationResponse.total;
        observationResponse.link.forEach( ( item: any ) => {
          let link: Link = new Link( item );
          this.links.push( link );
        } );

        observationResponse.entry.forEach( ( item: any ) => {
          let pt: Observation = new Observation( item );
          this.observations.push( pt )
        } );

        console.log( `Generated at: ${this.timestamp}` );
        console.log( `The total patients is ${this.total}` );
        console.log( this.observations );
      },
      error => {
        console.log( error.message );
      }
    );

  }
  selectObservation( selectedObservation: Observation ) {
    //console.log( `selected patient is ${selectedPatient.firstName}` );
    this.selectedObservation = selectedObservation;
  }

  removeObservationSelection() {
    this.selectedObservation = undefined;
    //console.log( `patient deselected and ${this.selectedPatient}` );

  }



  findLinkType( linkType: string ): Link | undefined {
    const tempLink = this.links.find( tlink => tlink.relation == linkType );
    return tempLink;
  }

  getMoreObservations( linkDirection: string ) {
    const tempLink = this.findLinkType( linkDirection );
    if ( tempLink != null ) {
      this.getObservationsByUrl( tempLink.url );
    }
  }

}
