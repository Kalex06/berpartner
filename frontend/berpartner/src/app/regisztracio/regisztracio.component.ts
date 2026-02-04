import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-regisztracio',
  templateUrl: './regisztracio.component.html',
  styleUrls: ['./regisztracio.component.css']
})
export class RegisztracioComponent {
  constructor(private auth: AuthService) { }

  private _formBuilder = inject(FormBuilder);

  hidePassword = true;
  hideConfirm = true;
  passwordStepSubmitted = false;


  nameFormGroup = this._formBuilder.group({
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
  });

  contactFormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required,]]
  });

  passwordFormGroup = this._formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]}, 
    { validators: this.passwordMatchValidator });

  addressFormGroup = this._formBuilder.group({
    varos: ['', Validators.required],
    iranyitoszam: ['', Validators.required],
    utca: ['', Validators.required],
    hazszam: ['', Validators.required],
  });




  // checkPasswords(group: FormGroup) {
  //   const pass = group.get('password')?.value;
  //   const confirmPass = group.get('confirmPassword')?.value;
  //   return pass === confirmPass ? null : { mustMatch: true };
  // }



  passwordMatchValidator(group: FormGroup): null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    const hasMismatch = password && confirmPassword && password !== confirmPassword;

    if (hasMismatch) {
      group.get('password')?.setErrors({ mustMatch: true });
      group.get('confirmPassword')?.setErrors({ mustMatch: true });
    } else {
 
      ['password', 'confirmPassword'].forEach(controlName => {
        const control = group.get(controlName);
        if (control?.hasError('mustMatch')) {
          const errors = { ...control.errors };
          delete errors['mustMatch'];
          control.setErrors(Object.keys(errors).length > 0 ? errors : null);
        }
      });
    }
    return null;
  }

  goPasswordNext(stepper: any) {
    this.passwordStepSubmitted = true;
    this.passwordFormGroup.markAllAsTouched();

    if (this.passwordFormGroup.invalid) {
      return;
    }
    stepper.next();
  }
  isOptional = false;

  

  submit() {
    const data = {
      nev: `${this.nameFormGroup.value.lastName} ${this.nameFormGroup.value.firstName}`,
      telefonszam: `36${this.contactFormGroup.value.phone}`,
      email: this.contactFormGroup.value.email,
      jelszo: this.passwordFormGroup.value.password,
      berelt_eszkozok_szama: '0',
      jogosultsag: 'user',
      iranyitoszam:this.addressFormGroup.value.iranyitoszam,
      varos: this.addressFormGroup.value.varos,
      utca: this.addressFormGroup.value.utca,
      haz_szam: this.addressFormGroup.value.hazszam
    };
    this.auth.register(data).subscribe({
      next: () => alert('Sikeres regisztráció'),
      error: (err) => alert(err.error.message)
    });
  }
}

