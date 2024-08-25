import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss', '../sign-up/sign-up.component.scss']
})
export class SignInComponent implements OnInit {
  signIpForm!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.signIpForm = this.fb.group({
      username :['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  onSubmit(): void {
    if (this.signIpForm.valid) {
      console.log('Form Submitted', this.signIpForm.value);
    }
  }

}
