import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-regisztracio',
  templateUrl: './regisztracio.component.html',
  styleUrls: ['./regisztracio.component.css']
})
export class RegisztracioComponent {

  private _formBuilder = inject(FormBuilder);

  nameFormGroup = this._formBuilder.group({
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
  });

  contactFormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
  });

  passwordFormGroup = this._formBuilder.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  addressFormGroup = this._formBuilder.group({
    cim: ['', Validators.required],
    varos: ['', Validators.required],
    hazszam: ['', Validators.required],
  });

  isOptional = false;
}
