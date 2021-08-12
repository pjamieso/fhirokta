import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    return from( this.handleAccess( req, next ) );
  }

  private async handleAccess( req: HttpRequest<any>, next: HttpHandler ): Promise<HttpEvent<any>> {

    //only add an access or key for secured endpoints

    const securedEndpoints = [environment.fhirbaseUrl];

    if ( ( securedEndpoints.some( url => req.urlWithParams.includes( url ) ) ) && ( environment.xapikey !== '' ) ) {

      //clone the request and add new header with x-api-key
      req = req.clone( {
        setHeaders: {
          "x-api-key": environment.xapikey
        }
      } );
    }

    return next.handle( req ).toPromise();
  }
}
