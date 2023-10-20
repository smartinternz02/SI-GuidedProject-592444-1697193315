import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrescriptionService } from '../prescription.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


interface Patient {
  name: string;
}

export interface Prescription {
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

}

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {
  prescriptionForm: FormGroup|any;
  appointments: Appointment[]; // Declare appointments array
  patients: any[] = [];
  selectedPatientName: Patient|any;
  selectedPrescription: Prescription | undefined;
  prescriptionAvailable: boolean = false;

  constructor(private http: HttpClient,private formBuilder: FormBuilder, private prescriptionService: PrescriptionService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getPatients();
    this.prescriptionForm = this.formBuilder.group({
      appointmentId: ['', Validators.required],
      medication: ['', Validators.required],
      dosage: ['', Validators.required],
      instructions: ['', Validators.required]
    });

    this.getAvailableAppointments(); // Fetch available appointments
  }

  onPatientSelectionChange(selectedPatientId: any) {
    const selectedPatient = this.patients.find(patient => patient._id === selectedPatientId);
    this.selectedPatientName = selectedPatient ? selectedPatient.name : '';
  }

  onAppointmentIdChangeName() {
    const appointmentId = this.prescriptionForm.get('appointmentId').value;
    const selectedAppointment = this.appointments.find(appointment => appointment._id === appointmentId);

    if (selectedAppointment) {
      this.selectedPatientName = selectedAppointment.patient.name;
    } else {
      this.selectedPatientName = '';
    }
  }

  onAppointmentIdChange() {
    const appointmentId = this.prescriptionForm.get('appointmentId').value;
    this.prescriptionService.getPrescriptionsByAppointmentId(appointmentId)
      .subscribe(
        prescriptions => {
          if (prescriptions.length > 0) {
                  // Assuming there is only one prescription per appointment
          this.prescriptionAvailable = true;
            // Assuming there is only one prescription per appointment
            const selectedPrescription = prescriptions[0];
            this.selectedPatientName = selectedPrescription.appointment.patient.name;
            // Set other prescription details in the form if needed
            this.prescriptionForm.patchValue({
              medication: selectedPrescription.medication,
              dosage: selectedPrescription.dosage,
              instructions: selectedPrescription.instructions
            });
          } else {
            this.prescriptionAvailable = false;

            this.selectedPatientName = '';
            // Reset other prescription details in the form if needed
            this.prescriptionForm.patchValue({
              medication: '',
              dosage: '',
              instructions: ''
            });
          }
        },
        error => {
          console.log('Failed to fetch prescriptions:', error);
          // Handle the error or display a message to the user
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

  getAvailableAppointments() {
    // Call a service method to fetch available appointments
    this.prescriptionService.getAvailableAppointments()
      .subscribe(
        appointments => {
          this.appointments = appointments;
        },
        error => {
          console.log('Failed to fetch appointments:', error);
          // Handle the error or display a message to the user
        }
      );
  }

  onSubmit() {
    if (this.prescriptionForm.invalid) {
      return;
    }

    this.prescriptionService.createPrescription(this.prescriptionForm.value)
      .subscribe(
        response => {
          console.log('Prescription created:', response);

          // Reset the form or perform any other action
        },
        error => {
          console.log('Failed to create prescription:', error);
          // Handle the error or display a message to the user
        }
      );
  }
}
