import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientsComponent } from './patients/patients.component';
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { ViewAppointmentsComponent } from './view-appointments/view-appointments.component';
import { PaymentComponent } from './payment/payment.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { GetprescriptionComponent } from './getprescription/getprescription.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [

  { path: '', component: LandingPageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'patients', component: PatientsComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'prescription', component: PrescriptionComponent },
  { path: 'getprescription', component: GetprescriptionComponent },
  { path: 'view-appointment', component: ViewAppointmentsComponent },
  { path: 'schedule-appointment', component: ScheduleAppointmentComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
