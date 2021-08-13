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

@NgModule( {
  declarations: [
    AppComponent,
    PatientsComponent,
    PatientDetailComponent,
    ObservationsComponent,
    ObservationDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
} )
export class AppModule { }
