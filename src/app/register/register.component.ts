import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  submitted = false;
  working = false;
  complete = false;
  strongPassword = false;

  signupForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.minLength(8),
      Validators.required,
    ]),
  });

  get formControls() {
    return this.signupForm.controls;
  }

  onPasswordStrengthChanged(event: boolean) {
    this.strongPassword = event;
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.working = true;
    setTimeout(() => {
      this.signupForm.reset();
      this.working = false;
      this.complete = true;
    }, 1000);
  }
}
