import { Component , inject} from '@angular/core';
import { FormBuilder, Validators , FormGroup} from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html',
  styleUrl: './bejelentkezes.component.css'
})
export class BejelentkezesComponent {
    private _formBuilder = inject(FormBuilder);
  
    hidePassword = true;
    hideConfirm = true;
    passwordStepSubmitted = false;

  contactFormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  passwordFormGroup = this._formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
  });
}
