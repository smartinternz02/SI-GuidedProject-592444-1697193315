import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrescriptionService } from '../prescription.service';
import { jsPDF } from 'jspdf';
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
  selector: 'app-getprescription',
  templateUrl: './getprescription.component.html',
  styleUrls: ['./getprescription.component.css']
})
export class GetprescriptionComponent implements OnInit {
  prescriptionForm: FormGroup|any;
  selectedPrescription: Prescription | undefined;
  prescriptionAvailable: boolean = false;
  patients: any[] = [];
  selectedPatientName: Patient|any;
  appointments: Appointment[]; // Declare appointments array

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private prescriptionService: PrescriptionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getPatients();
    this.prescriptionForm = this.formBuilder.group({
      appointmentId: ['', Validators.required]
    });
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

  // onAppointmentIdChangeName() {
  //   // Clear the selected prescription and availability status when appointment ID changes
  //   this.selectedPrescription = undefined;
  //   this.prescriptionAvailable = false;
  // }

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
    if (this.prescriptionForm.invalid) {
      return;
    }

    const appointmentId = this.prescriptionForm.get('appointmentId')?.value;
    this.prescriptionService.getPrescriptionsByAppointmentId(appointmentId).subscribe(
      prescriptions => {
        if (prescriptions.length > 0) {
          // Assuming there is only one prescription per appointment
          this.prescriptionAvailable = true;
          this.selectedPrescription = prescriptions[0];
          this.selectedPatientName = this.selectedPrescription.appointment.patient.name;
          console.log('selectedPrescription:', this.selectedPrescription);
          console.log('selectedPatientName:', this.selectedPatientName);
          console.log('prescriptions:', prescriptions);




        } else {
          this.prescriptionAvailable = false;
          this.selectedPrescription = undefined;
          this.selectedPatientName = undefined;
        }
      },
      error => {
        console.log('Failed to fetch prescriptions:', error);
        // Handle the error or display a message to the user
      }
    );
  }


  downloadPrescription() {
    // Create a new PDF document
    const doc = new jsPDF();

    // Set the font for the heading
    doc.setFont('MyDoctorAppFont', 'bold');

    // Add the heading to the PDF document
    doc.setFontSize(20);
    doc.text('MyDoctorApp', 10, 10);

    // Add a line below the heading
    doc.setLineWidth(0.5);
    doc.line(10, 15, 200, 15);

    // Get the prescription details
    const medication = this.selectedPrescription?.medication;
    const dosage = this.selectedPrescription?.dosage;
    const instructions = this.selectedPrescription?.instructions;

    // Get the patient's name
    const patientName = this.selectedPrescription?.appointment.patient.name;

    // Set the font for the prescription details
    doc.setFont('Arial', 'normal');
    doc.setFontSize(12);

    // Set the prescription details in the PDF document
    doc.text(`Medication: ${medication}`, 10, 25);
    doc.text(`Dosage: ${dosage}`, 10, 35);
    doc.text(`Instructions: ${instructions}`, 10, 45);

    // Set the patient's name in the PDF document
    doc.text(`Patient Name: ${patientName}`, 10, 55);

    // Save the PDF document
    doc.save('prescription.pdf');
  }




}
