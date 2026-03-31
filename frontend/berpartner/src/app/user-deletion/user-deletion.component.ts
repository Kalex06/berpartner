import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-deletion',
  templateUrl: './user-deletion.component.html',
  styleUrl: './user-deletion.component.css'
})
export class UserDeletionComponent {
  private passwordfb = inject(FormBuilder);

  passwordFormGroup = this.passwordfb.group({
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  
}