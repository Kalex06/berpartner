import { Component , inject} from '@angular/core';
import { FormBuilder, Validators , FormGroup} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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

  loginForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  
      
  

constructor(private auth:AuthService,private router:Router){}

  login() {
    if(this.loginForm.invalid) return;

  const data = {
    email: this.loginForm.value.email!,
    jelszo: this.loginForm.value.password!
  };

  console.log()

  this.auth.login(data).subscribe({
    next: res => {
      this.auth.saveToken(res.token);
      this.router.navigate(['/home']);

    },
    error: err => {
      alert(err.error.message);
    }
  });
}
}
