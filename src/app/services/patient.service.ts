import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Patient } from '../common/patient';

@Injectable( {
  providedIn: 'root'
} )
export class PatientService {
  private lastUrl: string = "";
  private patientUrl = environment.fhirbaseUrl + '/Patient?_count=10';
  constructor( private httpClient: HttpClient ) { }


  getPatientList(): Observable<GetResponsePatients> {
    this.lastUrl = this.patientUrl;
    return this.httpClient.get<GetResponsePatients>( this.patientUrl );
  }

  getPatientListByUrl( url: string ): Observable<GetResponsePatients> {
    this.lastUrl = url;
    return this.httpClient.get<GetResponsePatients>( url );
  }

  getPatientListByLastUrl(): Observable<GetResponsePatients> {
    if ( this.lastUrl !== '' ) {
      return this.getPatientListByUrl( this.lastUrl );
    }
    else {
      return this.getPatientList();
    }
  }

}


export interface GetResponsePatients {
  timestamp: string;
  total: number;
  link: Object[];
  entry: Patient[];
}