import { Component, inject, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { debounceTime, map, Observable } from 'rxjs';
import { AppService } from './app.service';
import { NgIf } from '@angular/common';
import { PasswordComponent } from './password/password.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, NgIf, PasswordComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'async_validator';
  customValidators = inject(CustomValidators)
  private formBuilder = inject(FormBuilder)

  form = this.formBuilder.group({
    name: ['', [Validators.required], [this.customValidators.check(5)]],
    password: ['']
  })

  ngOnInit() {
    // this.form.controls['password'].setValue('sdfsdfsdf') // ete writeValue-i mej veragrum chanes es set arats valuen chi ereva
    // this.form.controls['password'].disable() // sa anelu jamanak el setDisabledState petka anel te che chi ashxati
    setTimeout(() => {
      console.log('this.form', this.form)
      this.form.controls['password'].disable()
    }, 5_000)
    this.form.valueChanges.subscribe(data => console.log(111, this.form))
  } 
}


// ev formControli ev formGroupy jarangum en AbstractControl
// function check(control: AbstractControl, appService: AppService): ValidationErrors | null { 
//   console.log(control)
//   console.log('appService', appService)

//   const injector = Injector.create([{provide: AppService, useClass: AppService}]);
//   const service = injector.get(AppService) 
//   service.validate
//    return of(null)
// }

@Injectable({
  providedIn: 'root'
})
class CustomValidators {
  appService = inject(AppService);

  check(minLength: number): ValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.appService.validate(control.value, minLength).pipe(
        debounceTime(1_000),
        map((isValid) => {
          console.log('isValid', isValid)
          if (isValid) {
            return null
          }
          return {
            check: {
              requiredLength: 5,
              actualLength: control.value.length
            }
          }
        }))
    }
  }

}
