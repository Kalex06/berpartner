import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

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
    confirmPassword: ['', Validators.required]},{
     validators: (group) => this.passwordMatchValidator(group)
    });

  addressFormGroup = this._formBuilder.group({
    varos: ['', Validators.required],
    utca: ['', Validators.required],
    hazszam: ['', Validators.required],
  });



  passwordMatchValidator(group: any) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

 isOptional = false; 

  

constructor(private auth:AuthService){}


  submit(){
    
    const data = {
    nev: `${this.nameFormGroup.value.lastName} ${this.nameFormGroup.value.firstName}`,
    telefonszam: this.contactFormGroup.value.phone,
    email:this.contactFormGroup.value.email,
    jelszo: this.passwordFormGroup.value.password,
    berelt_eszkozok_szama:'0',
    jogosultsag:'user',
    varos:this.addressFormGroup.value.varos,
    utca: this.addressFormGroup.value.utca,
    haz_szam :this.addressFormGroup.value.hazszam
  };
      this.auth.register(data).subscribe({
      next: () => alert('Sikeres regisztráció'),
      error: err => alert(err.error.message)
    });
  
  }

}

