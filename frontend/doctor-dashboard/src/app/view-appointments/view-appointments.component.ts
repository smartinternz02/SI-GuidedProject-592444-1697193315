import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatCalendar,
  MatCalendarCellClassFunction,
} from '@angular/material/datepicker';

interface Appointment {
  _id: string; // Assuming you have an ID field in your schema

  patient: {
    name: string;
  };
  doctor: {
    name: string;
    specialization: string; // Add specialization property
  };

  date: Date;
  time: string; // Add time property
  status: string;
}

@Component({
  selector: 'app-view-appointments',
  templateUrl: './view-appointments.component.html',
  styleUrls: ['./view-appointments.component.css'],
})
export class ViewAppointmentsComponent {
  appointments: Appointment[] = [];
  dataSource!: MatTableDataSource<Appointment>;
  filteredAppointments: Appointment[] = [];
  selectedDate: Date = new Date();
  showAllAppointments: boolean = false;
  usertype: string | any;
  private _isLoggedIn: boolean = false; // private backing field for isLoggedIn

  @ViewChild('picker', { static: true }) picker!: MatCalendar<Date>;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.getAppointmentsByDate();
  }

  ngOnInit() {
    this.usertype = localStorage.getItem('usertype');

    this.selectedDate = new Date(); // Set selectedDate to today's date
  }

  viewAllAppointments(): void {
    this.showAllAppointments = true;
    this.dataSource = new MatTableDataSource<Appointment>(this.appointments);
  }

  getAppointmentsByDate() {
    const formattedDate: string = this.selectedDate.toISOString().split('T')[0]; // Convert date to string format 'YYYY-MM-DD'
    this.http
      .get('http://localhost:3000/appointments', {
        params: { date: formattedDate },
      })
      .subscribe(
        (data: any) => {
          this.appointments = data.map((appointment: any) => ({
            _id: appointment._id, // Add the _id property

            patient: { name: appointment.patient.name },
            doctor: {
              name: appointment.doctor.name,
              specialization: appointment.doctor.specialization,
            },
            date: new Date(appointment.date),
            time: appointment.time,
            status: appointment.status,
          }));

          if (formattedDate === new Date().toISOString().split('T')[0]) {
            // Display today's appointments first
            const todayAppointments = this.appointments.filter(
              (appointment: Appointment) => {
                const appointmentDate: string = appointment.date
                  .toISOString()
                  .split('T')[0];
                return appointmentDate === formattedDate;
              }
            );

            if (todayAppointments.length > 0) {
              this.filteredAppointments = todayAppointments;
            } else {
              // No appointments for today
              this.filteredAppointments = [];
            }
          }

          if (this.filteredAppointments.length === 0) {
            // Clear filteredAppointments if there are no appointments for the selected date
            this.dataSource = new MatTableDataSource<Appointment>([]);
          } else {
            this.dataSource = new MatTableDataSource<Appointment>(
              this.filteredAppointments
            );
          }

          // Update the calendar cell class
          this.picker.dateClass = (cellDate: Date) => {
            const formattedCellDate = cellDate.toISOString().split('T')[0];
            return this.filteredAppointments.some(
              (appointment) =>
                appointment.date.toISOString().split('T')[0] ===
                formattedCellDate
            )
              ? 'has-appointments'
              : '';
          };
        },
        (error) => {
          console.error('Failed to get appointments', error);
          this.snackBar.open('Failed to get appointments', 'Close', {
            duration: 3000,
          });
        }
      );
  }

  applyFilter(): void {
    const formattedDate: string = this.selectedDate.toISOString().split('T')[0];
    this.filteredAppointments = this.appointments.filter(
      (appointment: Appointment) => {
        const appointmentDate: string = new Date(appointment.date)
          .toISOString()
          .split('T')[0];
        return appointmentDate === formattedDate;
      }
    );

    this.dataSource = new MatTableDataSource(this.filteredAppointments);

    // Update the calendar cell class
    this.picker.dateClass = (cellDate: Date) => {
      const formattedCellDate = cellDate.toISOString().split('T')[0];
      return this.filteredAppointments.some(
        (appointment) =>
          appointment.date.toISOString().split('T')[0] === formattedCellDate
      )
        ? 'has-appointments'
        : '';
    };
  }

  approveAppointment(appointment: Appointment): void {
    // Send a request to the server to approve the appointment
    this.http
      .put(
        `http://localhost:3000/api/appointments/${appointment._id}/approve`,
        {}
      )
      .subscribe(
        (data: any) => {
          // Update the status in the local appointments array
          appointment.status = 'Approved';
          this.snackBar.open('Appointment approved successfully', 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Failed to approve the appointment', error);
          this.snackBar.open('Failed to approve the appointment', 'Close', {
            duration: 3000,
          });
        }
      );
  }
  rejectAppointment(appointment: Appointment): void {
    // Send a request to the server to reject the appointment
    this.http
      .put(
        `http://localhost:3000/api/appointments/${appointment._id}/reject`,
        {}
      )
      .subscribe(
        (data: any) => {
          // Update the status in the local appointments array
          appointment.status = 'Rejected';
          this.snackBar.open('Appointment rejected successfully', 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Failed to reject the appointment', error);
          this.snackBar.open('Failed to reject the appointment', 'Close', {
            duration: 3000,
          });
        }
      );
  }

  markVisited(appointment: Appointment): void {
    // Send a request to the server to mark the appointment as visited
    this.http
      .put(
        `http://localhost:3000/api/appointments/${appointment._id}/visited`,
        {}
      )
      .subscribe(
        (data: any) => {
          // Update the status in the local appointments array
          appointment.status = 'Visited';
          this.snackBar.open('Appointment marked as visited', 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Failed to mark the appointment as visited', error);
          this.snackBar.open(
            'Failed to mark the appointment as visited',
            'Close',
            { duration: 3000 }
          );
        }
      );
  }

  markNotVisited(appointment: Appointment): void {
    // Send a request to the server to mark the appointment as not visited
    this.http
      .put(
        `http://localhost:3000/api/appointments/${appointment._id}/notvisited`,
        {}
      )
      .subscribe(
        (data: any) => {
          // Update the status in the local appointments array
          appointment.status = 'Not Visited';
          this.snackBar.open('Appointment marked as not visited', 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Failed to mark the appointment as not visited', error);
          this.snackBar.open(
            'Failed to mark the appointment as not visited',
            'Close',
            { duration: 3000 }
          );
        }
      );
  }

  get isLoggedIn() {
    return this._isLoggedIn; // return the private backing field
  }
}
