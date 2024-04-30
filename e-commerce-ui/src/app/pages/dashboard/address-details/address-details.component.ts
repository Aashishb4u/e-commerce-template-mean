import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrl: './address-details.component.scss'
})
export class AddressDetailsComponent  implements OnInit {
  editBilling: any = false;
  addBilling: any = false;
  editShipping: any = false;
  addShipping: any = false;
  billingForm: FormGroup;
  shippingForm: FormGroup;

  billingAddress = {
    address: null,
    phoneNumber: null,
    email: null
  }
  shippingAddress = {
    address: null,
    phoneNumber: null,
    email: null
  }

  constructor(public formBuilder: FormBuilder, public apiService: ApiService) {}

  ngOnInit() {
    this.billingForm = this.formBuilder.group({
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required]
    });

    this.shippingForm = this.formBuilder.group({
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required]
    });
  }

  onSubmitBilling() {
    if(this.billingForm.invalid) {
      this.billingForm.markAllAsTouched();
      this.apiService.showToast('Please Complete Form');
    } else {
      this.editBilling = false;
    }
  }

  onSubmitShipping() {
    if(this.shippingForm.invalid) {
      this.shippingForm.markAllAsTouched();
      this.apiService.showToast('Please Complete Form');
    } else {
      this.editShipping = false;
    }
  }
}
