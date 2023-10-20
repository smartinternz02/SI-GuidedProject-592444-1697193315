import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Prescription {
  _id: string;
  appointment: {
    patient: {
      name: string;
    };
  };
  medication: string;
  dosage: string;
  instructions: string;
}



interface Appointment {
  _id:string;
  patient: {
    name: string;
  };
  doctor: {
    name: string;
    specialization: string; // Add specialization property
  };
  date: Date;
  time: string; // Add time property

}

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private apiUrl = 'http://localhost:3000/appointments'; // Replace with your API URL
  private baseUrl = 'http://localhost:3000/api/prescriptions'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  createPrescription(prescriptionData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, prescriptionData);
  }

  getAvailableAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  getPrescriptionsByAppointmentId(appointmentId: string): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(`http://localhost:3000/api/prescriptions/appointment/${appointmentId}`);
  }



}
