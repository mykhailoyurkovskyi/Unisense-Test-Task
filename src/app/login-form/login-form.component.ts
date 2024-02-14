import { Component, OnInit } from '@angular/core';

type PasswordStrength = 'easy' | 'medium' | 'strong';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {
  email: string = '';
  password: string = '';
  passwordStrength: string = '';

  checkPasswordStrength() {
    if (!this.password) {
      this.passwordStrength = '';
      return;
    }

    const hasLetters = /[a-zA-Z]/.test(this.password);
    const hasDigits = /\d/.test(this.password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);

    if (hasLetters && hasDigits && hasSymbols) {
      this.passwordStrength = 'strong';
    } else if ((hasLetters && hasDigits) || (hasLetters && hasSymbols) || (hasDigits && hasSymbols)) {
      this.passwordStrength = 'medium';
    } else {
      this.passwordStrength = 'weak';
    }
  }

  ngOnInit(): void {
  }

}
