import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { UserService } from 'src/app/Shared/Services/user.service';
import { Login } from 'src/app/Shared/Models/User';
import { ILogin } from 'src/app/Shared/Interfaces/iuser';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss', '../sign-up/sign-up.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  showAlert: boolean = false;
  isSuccessful: boolean = false;
  alertMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  // Initialize the sign-in form with validators
  private initializeForm(): void {
    this.signInForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // Submit the form
  onSubmit(): void {
    if (this.signInForm.valid) {
      this.loginUser();
    } else {
      this.displayError('Invalid username or password. Please try again.');
    }
  }

  // Handle the user login
  private loginUser(): void {
    const user: ILogin = new Login(
      this.signInForm.value.password,
      this.signInForm.value.username
    );

    this.userService.login(user).subscribe(
      response => {
        // Assuming the response contains a token
        const token = response.token;
        
        // Save the token in localStorage
        localStorage.setItem('authToken', token);

        
        // Optionally, display a success message
        this.isSuccessful = true;
        this.alertMessage = 'You have signed in successfully!';
        this.showAlert = true;
        
        // Navigate to the 'customer' route
        this.router.navigate(['/customer']);
      },
      error => {
        if (error.status === 401 && error.ok === false) {
          // Handle other errors
          console.log(error);
          this.displayError(error.error.message);
        } else {
          // Navigate to 'server-error' route if status code is 500
          this.router.navigate(['/server-error']);
        }
      }
    );
  }

  // Display error messages
  private displayError(message: string): void {
    this.isSuccessful = false;
    this.alertMessage = message;
    this.showAlert = true;
  }

  // Helper method to hide the alert
  closeAlert(): void {
    this.showAlert = false;
  }
}