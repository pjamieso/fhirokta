import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObservationsComponent } from './components/observations/observations.component';
import { PatientsComponent } from './components/patients/patients.component';

const routes: Routes = [
  { path: 'patients', component: PatientsComponent },
  { path: 'observations/:id', component: ObservationsComponent },
  { path: '', redirectTo: '/patients', pathMatch: 'full' },
  { path: '**', redirectTo: '/patients', pathMatch: 'full' }
];

@NgModule( {
  imports: [RouterModule.forRoot( routes )],
  exports: [RouterModule]
} )
export class AppRoutingModule { }
