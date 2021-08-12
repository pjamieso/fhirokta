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

  private patientUrl = environment.fhirbaseUrl + '/Patient?_count=10';
  constructor( private httpClient: HttpClient ) { }


  getPatientList(): Observable<GetResponsePatients> {
    return this.httpClient.get<GetResponsePatients>( this.patientUrl );
  }

}


export interface GetResponsePatients {
  timestamp: string;
  total: number;
  link: Object[];
  entry: Patient[];
}