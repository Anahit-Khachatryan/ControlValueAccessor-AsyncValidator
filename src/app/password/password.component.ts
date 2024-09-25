import { Component } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true, // քանի որ NG_VALUE_ACCESSOR-tokeniի տակ նաև provide եղած է այլ accessor-եր, checkboxControlValueAssessor, defaultValueAccessor, NumberValueAccessor..., vor ovveride chani, tokeni tak linelu e instance-i error
    useExisting: PasswordComponent // kani vor PasswordComponenti instance ka arden
  }], //avelacnum enk sa henc es componentum vor ControlValueAccessory hasaneli lini estegh voch te dranic durs
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent implements ControlValueAccessor, Validator {
  showPassword = false;
  isDisabled = false;
  value = '';
  onChange!: (value: string) => void;
  onBlur!: () => void;

  onChangeHandler(e: any) {
    this.onChange(e.target.value)
    console.log(e.target.value)
  }

  handleBlur() {
    this.onBlur();
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  writeValue(value: string): void {
    this.value = value
  } // erb setValue en anum sa e kanchum

  registerOnChange(fn: any): void {
    this.onChange = fn;
  } //sa kanchvum e erb directive talis enk initi jamanak kanchum e ays function poxancelov function ory kanchum enk DOM-um changei jamank

  registerOnTouched(fn: any): void {
    this.onBlur = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    throw new Error('Method not implemented')
  }
}
