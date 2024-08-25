import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  countries = [
    { name: 'USA', code: 'US' },
    { name: 'Canada', code: 'CA' },
    { name: 'India', code: 'IN' },
    // Add more countries as needed
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, this.nameValidator]],
      lastName: ['', [Validators.required, this.nameValidator]],
      username: ['', [Validators.required, this.nameValidator]],
      phone: [''],
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      confirmPassword: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      console.log('Form Submitted', this.signUpForm.value);
      // Handle form submission, e.g., send data to the server.
    }
  }
  confirmPassword() {
    const password = this.signUpForm.get('password')?.value;
    const confirmPassword = this.signUpForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.signUpForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      this.signUpForm.get('confirmPassword')?.setErrors(null);
    }
  }
  nameValidator(control: any) {
    const value = control.value;
    if (!value) {
      return null;
    }

    if (value.length < 3) {
      return { nameInvalid: 'Name must be at least 3 characters long.' };
    }

    if (!/^[a-zA-Z]+$/.test(value)) {
      return { nameInvalid: 'Name can only contain letters.' };
    }

    return null;
  }

  passwordValidator(control: any) {
    const value = control.value;
    if (!value) {
      return null;
    }

    if (value.length < 8) {
      return { passwordInvalid: 'Password must be at least 8 characters long.' };
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      return { passwordInvalid: 'Password must contain at least one uppercase letter, lowercase letter, number, and special character.' };
    }

    return null;
  }
}