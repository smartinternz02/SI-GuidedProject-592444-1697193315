import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateFilterFn } from '@angular/material/datepicker';

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.css']
})
export class ScheduleAppointmentComponent {
  appointments: any[] = [];
  doctors: any[] = [];
  patients: any[] = [];
  selectedDate: Date = new Date();
  unavailableDates: Date[] = [];
  selectedTime: string = ''; // Add this line
loggedInPatientId: string | undefined;
patientid:string='';


  timeSlots: string[] = [
    '09:00 AM - 10:00 AM',
    '11:00 AM - 12:00 PM',

    '01:00 PM - 02:00 PM',
    '03:00 PM - 04:00 PM',
    // Add more time slots as needed
  ];


  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.getPatients();
    this.getDoctors();
    this.getAppointments().then(() => {
      // After fetching appointments, initialize the calendar
      this.selectedDate = new Date();
      this.calculateUnavailableDates();
    });
  }

  scheduleAppointment(patientId: string, doctorId: string, date: Date, time: string) {
    // Check if the selected date and time already has an appointment with the doctor
    const hasAppointment = this.appointments.some(
      appointment => appointment.doctor._id === doctorId && appointment.date === date.toISOString() && appointment.time === time
    );

    if (hasAppointment) {
      this.snackBar.open('Doctor already has an appointment at this date and time. Please select another doctor or time.', 'Close', {
        duration: 3000
      });
      return; // Stop further execution
    }

    this.http
      .post('http://localhost:3000/api/appointments', { patientId, doctorId, date, time })
      .subscribe(
        (response: any) => {
          this.appointments.push(response);
          this.snackBar.open(
            'Appointment scheduled successfully',
            'Close',
            { duration: 3000 }
          );
          this.calculateUnavailableDates();
        },
        error => {
          console.error('Failed to schedule an appointment', error);

          this.snackBar.open('Doctor already has an appointment at this date and time. Please select another doctor or time.', 'Close', {
            duration: 3000
          });
        }
      );
  }



  getPatients() {
    this.http.get('http://localhost:3000/api/patients').subscribe(
      (response: any) => {
        this.patients = response;
      },
      error => {
        console.error('Failed to get patients', error);
        this.snackBar.open('Failed to get patients', 'Close', { duration: 3000 });
      }
    );
  }

  getDoctors() {
    this.http.get('http://localhost:3000/doctors').subscribe(
      (response: any) => {
        this.doctors = response;
      },
      error => {
        console.error('Failed to get doctors', error);
        this.snackBar.open('Failed to get doctors', 'Close', { duration: 3000 });
      }
    );
  }

  getAppointments(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get('http://localhost:3000/api/appointments').subscribe(
        (response: any) => {
          this.appointments = response;
          resolve(); // Resolve the promise when the appointments are fetched
        },
        error => {
          console.error('Failed to get appointments', error);
          this.snackBar.open('Failed to get appointments', 'Close', {
            duration: 3000
          });
          reject(); // Reject the promise if there's an error fetching appointments
        }
      );
    });
  }

  calculateUnavailableDates() {
    const formattedAppointments = this.appointments.map(appointment => new Date(appointment.date));
    this.unavailableDates = formattedAppointments;
  }

  isUnavailableDate: DateFilterFn<Date | null> = (date: Date | null): boolean => {
    if (!date) {
      return true; // Allow null dates
    }

    const formattedDate = date.toISOString().split('T')[0];
    const hasAppointment = this.appointments.some(
      appointment => appointment.date.split('T')[0] === formattedDate
    );

    return !hasAppointment; // Return true to allow selection if the date doesn't have an appointment
  };
}
