import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Payment } from 'src/app/models/payment';
import { CodeGeneratorService } from 'src/app/services/code-generator.service';
import { PaymentDataService } from 'src/app/services/payment-data.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];
  paymentForm: FormGroup;

  constructor(
    private codeGeneratorService: CodeGeneratorService,
    private paymentDataService: PaymentDataService,
    private formBuilder: FormBuilder
  ) {
    this.paymentForm = formBuilder.group({
      name: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.paymentDataService.PaymentDataList
      .forEach((item) => this.payments.push(item));
  }

  public get currentCode(): string {
    return this.codeGeneratorService.FinalCode;
  }

  public get isRunning(): boolean {
    return this.codeGeneratorService.IsRunning;
  }

  public get userInput(): string {
    return this.codeGeneratorService.GetUserInput;
  }

  addPayment() {
    if (!this.codeGeneratorService.IsRunning) {
      alert("Please, start the code generator first in the Generator Page.");
      return;
    }

    var newPayment = new Payment(
      this.paymentForm.get("name").value,
      this.paymentForm.get("amount").value,
      this.codeGeneratorService.FinalCode,
      this.codeGeneratorService.DataList
    )

    this.paymentDataService.AddPayment(newPayment)
      .subscribe(
        res => {
          console.log('New payment:', res);
          this.payments.push(res);
        },
        error => {
          alert("Error try save the payment.");
        }
      );

  }

}
