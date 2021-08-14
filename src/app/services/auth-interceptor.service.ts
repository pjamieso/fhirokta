import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { from, lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class AuthInterceptorService implements HttpInterceptor {

  constructor( private oktaAuthService: OktaAuthService ) { }

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

    if ( ( securedEndpoints.some( url => req.urlWithParams.includes( url ) ) ) && ( environment.xapikey == '' ) ) {

      const accessToken = await this.oktaAuthService.getAccessToken();
      //clone the request and add new header with x-api-key
      req = req.clone( {
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      } );
    }


    return lastValueFrom( next.handle( req ) );
  }
}
