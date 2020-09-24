import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Payment } from '../models/payment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentDataService {
  private paymentDataList: Payment[] = [];
  public get PaymentDataList() : Payment[] {
    return this.paymentDataList;
  }
  
  // private paymentDataList: BehaviorSubject<Payment> = new BehaviorSubject(null);
  // PaymentDataList = this.paymentDataList.asObservable();

  constructor(private apiService: ApiService) { }

  AddPayment(newPayment: Payment): Observable<any> {
    // Store the new Payment
    // this.paymentDataList.next(newPayment)
    this.paymentDataList.push(newPayment);
    
    // Just for test purpose, simulate the http post
    const post:Observable<Payment> = of(newPayment).pipe(delay(500));
    return post;

    // return this.apiService.postData("Payment", newPayment);
  }
}
