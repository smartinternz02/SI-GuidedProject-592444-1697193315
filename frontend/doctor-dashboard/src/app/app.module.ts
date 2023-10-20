import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientsComponent } from './patients/patients.component';
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';
import { NgChartsModule } from 'ng2-charts';
import { DoctorsComponent } from './doctors/doctors.component';
import { MatDateSelectionModel, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewAppointmentsComponent } from './view-appointments/view-appointments.component';
import { MatTableModule } from '@angular/material/table';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { PaymentComponent } from './payment/payment.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { GetprescriptionComponent } from './getprescription/getprescription.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PatientsComponent,
    ScheduleAppointmentComponent,
    DoctorsComponent,
    ViewAppointmentsComponent,
    PaymentComponent,
    PrescriptionComponent,
    GetprescriptionComponent,
    RegisterComponent,
    LoginComponent,
    LandingPageComponent,

  ],
  imports: [
    NgChartsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    AppRoutingModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    NgxMaterialTimepickerModule,

    ReactiveFormsModule

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
