import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

export interface StrengthLevel {
  strength: number;
  color: string;
  message: string;
}

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent implements OnChanges {
  @Input() public passwordToCheck: string = '';
  @Output() passwordStrength = new EventEmitter<boolean>();

  private strengthLevels: StrengthLevel[] = [
    { strength: 10, color: 'red', message: 'Easy' },
    { strength: 20, color: 'yellow', message: 'Medium' },
    { strength: 30, color: 'green', message: 'Strong' },
  ];

  barColors: string[] = [];
  message: string = '';
  messageColor: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    const password = changes['passwordToCheck'].currentValue;
    this.resetBarColors();

    if (password) {
      const strength = this.checkStrength(password);
      this.passwordStrength.emit(strength === 30);

      const level = this.strengthLevels.find(level => level.strength === strength);
      if (level) {
        this.setBarColors(strength / 10, level.color);
        this.message = level.message;
      }
    } else {
      this.message = '';
    }
  }

  private checkStrength(password: string): number {
    const hasLetters = /[a-zA-Z]+/.test(password);
    const hasDigits = /[0-9]+/.test(password);
    const hasSymbols = /[^a-zA-Z0-9]+/.test(password);

    const typesCount = [hasLetters, hasDigits, hasSymbols].reduce((count, test) => count + Number(test), 0);

    switch (typesCount) {
      case 1:
        return 10;
      case 2:
        return 20;
      case 3:
        return 30;
      default:
        return 10;
    }
  }

  private resetBarColors(): void {
    this.barColors = Array(3).fill('#DDD');
  }

  private setBarColors(count: number, color: string): void {
    this.barColors.fill(color, 0, count);
  }
}
