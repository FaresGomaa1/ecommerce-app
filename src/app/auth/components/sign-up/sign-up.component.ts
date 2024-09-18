import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { UserService } from 'src/app/Shared/Services/user.service';
import { Register } from 'src/app/Shared/Models/User';
import { IRegister } from 'src/app/Shared/Interfaces/iuser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  showAlert: boolean = false;
  isSuccessful: boolean = false;
  backendErrors: any[] = [];
  alertMessage: string = '';
  countries = [
    { name: 'USA', code: 'US' },
    { name: 'Canada', code: 'CA' },
    { name: 'India', code: 'IN' },
  ];

  constructor(private fb: FormBuilder, private userService: UserService,private router: Router) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, this.nameValidator]],
      lastName: ['', [Validators.required, this.nameValidator]],
      username: ['', [Validators.required]],
      phone: [''],
      email: ['', [Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), this.passwordValidator],
      ],
      confirmPassword: ['', Validators.required]
    });
  }


  onSubmit(): void {
    if (this.signUpForm.valid) {
      let newUser: IRegister = new Register(
        this.signUpForm.value.password,
        this.signUpForm.value.username,
        this.signUpForm.value.firstName,
        this.signUpForm.value.lastName,
        this.signUpForm.value.phone,
        this.signUpForm.value.email
      );
  
      this.userService.register(newUser).subscribe(
        response => {
          this.router.navigate(['/auth/sign-in']);
        },
        error => {
          this.backendErrors = [];
          if (error.status === 400) {
            if (error.error.errors.Username) {
              this.backendErrors.push(error.error.errors.Username[0]);
            }
            if (error.error.errors.Email) {
              this.backendErrors.push(error.error.errors.Email[0]);
            }
            if (error.error.errors.Phone) {
              this.backendErrors.push(error.error.errors.Phone[0]);
            }
          } else {
            this.router.navigate(['/server-error']);
          }
          this.isSuccessful = false;
          this.showAlert = true;
        }
        
      );
    } else {
      this.isSuccessful = false;
      this.alertMessage = 'There are errors in the form. Please correct them and try again.';
      this.showAlert = true;
    }
  }
  confirmPassword() {
    const password = this.signUpForm.get('password')?.value;
    const confirmPassword = this.signUpForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.signUpForm
        .get('confirmPassword')
        ?.setErrors({ passwordMismatch: true });
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
      return {
        passwordInvalid: 'Password must be at least 8 characters long.',
      };
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      return {
        passwordInvalid:
          'Password must contain at least one uppercase letter, lowercase letter, number, and special character.',
      };
    }

    return null;
  }
  getClass(controlName: string) {
    const control = this.signUpForm.get(controlName);
    if (control?.touched) {
      return control.valid ? 'is-valid' : 'is-invalid';
    }
    return '';
  }
  getMessage(controlName: string): string {
    if (controlName === 'confirmPassword') {
      return 'Matches Passord';
    } else {
      return 'Looks Good';
    }
  }
}
