import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ChangeDetectionStrategy, signal, } from '@angular/core';
import { UserDeletionComponent } from '../user-deletion/user-deletion.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SettingsComponent {
  private fb = inject(FormBuilder);

  darkMode = false;
  passwordForm: FormGroup;
  emailForm: FormGroup;
  phoneForm: FormGroup;

  readonly panelOpenState = signal(false);

  constructor() {
    this.passwordForm = this.fb.group({
      newPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(255)
      ]]
    });

    this.emailForm = this.fb.group({
      newEmail: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(255)
      ]]
    });

    this.phoneForm = this.fb.group({
      newPhone: ['', [
        Validators.required,
        Validators.pattern(/^\+36\s\d{2}\s\d{3}\s\d{4}$/)
      ]]
    });
  }

    readonly dialog = inject(MatDialog);

    openUserDeletionDialog() {
      this.dialog.open(UserDeletionComponent);
    }
}
