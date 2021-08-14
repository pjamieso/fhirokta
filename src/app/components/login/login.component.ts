import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from 'node_modules/@okta/okta-signin-widget';
import myOktaConfig from 'src/app/config/my-okta-config';

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
} )
export class LoginComponent implements OnInit {

  oktaSignin: any;

  constructor( private oktaAuthService: OktaAuthService ) {
    this.oktaSignin = new OktaSignIn( {
      logo: 'assets/firelogo.png',
      baseUrl: myOktaConfig.oidc.issuer.split( '/oauth2' )[0],
      clientId: myOktaConfig.oidc.clientId,
      redirectUri: myOktaConfig.oidc.redirectUri,
      features: {
        // Used to enable registration feature on the widget.
        registration: true
      },
      authParams: {
        pkce: true,
        issuer: myOktaConfig.oidc.issuer,
        scopes: myOktaConfig.oidc.scopes
      }
    } );

  }

  ngOnInit(): void {
    this.oktaSignin.remove();
    this.oktaSignin.renderEl( {
      el: '#okta-sign-in-widget'
    }, //name must be the same as html file
      ( response: any ) => {
        if ( response.status === 'SUCCESS' ) {
          this.oktaAuthService.signInWithRedirect();
        }
      },
      ( error: any ) => {
        throw error;
      }

    );
  }

}
