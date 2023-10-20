import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Payment {
  id: string;
  appointmentId: string;
  amount: number;
}


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000/api/payments'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  makePayment(paymentData: any): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, paymentData);
  }
}
