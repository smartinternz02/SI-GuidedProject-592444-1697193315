import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSidenav } from '@angular/material/sidenav';
import { ChartOptions, ChartType, ChartDataset, Color } from 'chart.js';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;
  patients: any[] = [];
  appointments: any[] = [];
  doctors:any[]=[];


  selectedDate: string = '';

  public doctorChartLabels: string[] = ['Doctors'];
  public doctorChartData: ChartDataset[] = [
    {
      data: [], // Initially empty until data is retrieved
      label: 'Doctors',
    },
  ];
  public doctorChartType: ChartType = 'bar';

  public doctorChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false,
      },
    },
  };

  public patientChartLabels: string[] = ['Patients'];
  public patientChartData: ChartDataset[] = [
    {
      data: [], // Initially empty until data is retrieved
      label: 'Patients',
    },
  ];
  public patientChartType: ChartType = 'bar';

  public patientChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false,
      },
    },
  };

  public appointmentChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false,
      },
    },
  };

  public appointmentChartLabels: string[] = ['Appointments'];
  public appointmentChartData: ChartDataset[] = [
    {
      data: [], // Initially empty until data is retrieved
      label: 'Appointments',

    },
  ];
  public appointmentChartType: ChartType = 'pie';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.getPatients();
    this.getDoctors();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }


  getDoctors() {
    this.http.get('http://localhost:3000/doctors').subscribe(
      (response: any) => {
        this.doctors = response;

        // Update patient chart data
        this.doctorChartData = [
          {
            data: [this.doctors.length], // Use the length of the patients array as the data
            label: 'Doctors',
          },
        ];

        // Call the getAppointments method to update the appointment chart data
        this.getPatients();
      },
      (error) => {
        console.error('Failed to get doctors', error);
        this.snackBar.open('Failed to get doctors', 'Close', { duration: 3000 });
      }
    );
  }

  getPatients() {
    this.http.get('http://localhost:3000/api/patients').subscribe(
      (response: any) => {
        this.patients = response;

        // Update patient chart data
        this.patientChartData = [
          {
            data: [this.patients.length], // Use the length of the patients array as the data
            label: 'Patients',
          },
        ];

        // Call the getAppointments method to update the appointment chart data
        this.getAppointments();
      },
      (error) => {
        console.error('Failed to get patients', error);
        this.snackBar.open('Failed to get patients', 'Close', { duration: 3000 });
      }
    );
  }

  getAppointments() {
    this.http.get('http://localhost:3000/appointments').subscribe(
      (response: any) => {
        this.appointments = response;

        // Update appointment chart data
        this.appointmentChartData = [
          {
            data: [this.appointments.length], // Use the length of the appointments array as the data
            label: 'Appointments',
          },
        ];
      },
      (error) => {
        console.error('Failed to get appointments', error);
        this.snackBar.open('Failed to get appointments', 'Close', { duration: 3000 });
      }
    );
  }
}
