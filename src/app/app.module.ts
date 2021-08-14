import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientsComponent } from './components/patients/patients.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { PatientDetailComponent } from './components/patient-detail/patient-detail.component';
import { ObservationsComponent } from './components/observations/observations.component';
import { ObservationDetailComponent } from './components/observation-detail/observation-detail.component';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { Router } from '@angular/router';
import myOktaConfig from './config/my-okta-config';
import { PatientService } from './services/patient.service';
import { ObservationService } from './services/observation.service';

const oktaConfig = Object.assign( {
  onAuthRequired: ( injector: any ) => {
    const router = injector.get( Router );
    //redirect user to custom login page
    router.navigate( ['/login'] );
  }
}, myOktaConfig.oidc );



@NgModule( {
  declarations: [
    AppComponent,
    PatientsComponent,
    PatientDetailComponent,
    ObservationsComponent,
    ObservationDetailComponent,
    LoginComponent,
    LoginStatusComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    OktaAuthModule
  ],
  providers: [PatientService, { provide: OKTA_CONFIG, useValue: oktaConfig },
    ObservationService, { provide: OKTA_CONFIG, useValue: oktaConfig },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
} )
export class AppModule { }
