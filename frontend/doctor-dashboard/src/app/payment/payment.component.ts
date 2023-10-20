import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../payment.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup|any;

  constructor(private formBuilder: FormBuilder, private paymentService: PaymentService) { }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      appointmentId: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.paymentForm.invalid) {
      return;
    }

    this.paymentService.makePayment(this.paymentForm.value)
      .subscribe(
        response => {
          console.log('Payment successful:', response);
          // Reset the form or perform any other action
        },
        error => {
          console.log('Payment failed:', error);
          // Handle the error or display a message to the user
        }
      );
  }
}
