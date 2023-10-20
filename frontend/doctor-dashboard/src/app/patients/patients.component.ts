import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent {

  patients: any[] = [];


  constructor(private http: HttpClient, private snackBar: MatSnackBar) {

  }

  addPatient(name: string) {
    this.http.post('http://localhost:3000/api/patients', { name }).subscribe(
      (response: any) => {
        this.patients.push(response);

        this.snackBar.open('Patient added successfully', 'Close', { duration: 3000 });
      },
      (error) => {
        console.error('Failed to add a patient', error);
        this.snackBar.open('Failed to add a patient', 'Close', { duration: 3000 });
      }
    );
  }
}
