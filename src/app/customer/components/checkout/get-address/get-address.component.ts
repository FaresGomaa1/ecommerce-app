import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAddressAdd } from 'src/app/Shared/Interfaces/iaddress';
import { Address } from 'src/app/Shared/Models/address';
import { AddressService } from 'src/app/Shared/Services/address.service';

@Component({
  selector: 'app-get-address',
  templateUrl: './get-address.component.html',
  styleUrls: ['./get-address.component.scss']
})
export class GetAddressComponent implements OnInit {
  addressForm!: FormGroup;
  isSubmitting: boolean = false;
  formErrors: string | null = null;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.addressForm = this.fb.group({
      addressLine: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      this.isSubmitting = true;
      const formValue = this.addressForm.value;
      const newAddress: IAddressAdd = new Address(
        formValue.country,
        formValue.addressLine,
        formValue.city,
        formValue.state
      );

      // Call the service to add the new address
      this.addressService.addNewAddress(newAddress).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.formErrors = null;
          window.location.reload();
        },
        error: (error) => {
          this.isSubmitting = false;
          this.formErrors = 'Failed to add address. Please try again.';
          console.error('Error adding address:', error);
        }
      });
    } else {
      this.formErrors = 'Please fill in all required fields correctly.';
    }
  }
}
