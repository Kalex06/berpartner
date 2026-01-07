import { Component, inject } from '@angular/core';
import { FormBuilder, Validators , FormGroup, FormControl} from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  private _formBuilder = inject(FormBuilder);

    passwordFormControl = new FormControl('', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]);

}
