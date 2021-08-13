import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Observation } from '../common/observation';

@Injectable( {
  providedIn: 'root'
} )
export class ObservationService {

  private observationtUrl = environment.fhirbaseUrl + '/Observation?_count=10';

  constructor( private httpClient: HttpClient ) { }

  getObservationList( patientResourseNo: string ): Observable<GetResponseObservations> {
    const obsUrl = `${this.observationtUrl}&subject=Patient/${patientResourseNo}`;
    return this.httpClient.get<GetResponseObservations>( obsUrl );
  }

  getObservationListByUrl( url: string ): Observable<GetResponseObservations> {
    return this.httpClient.get<GetResponseObservations>( url );
  }
}

export interface GetResponseObservations {
  timestamp: string;
  total: number;
  link: Object[];
  entry: Observation[];
}
