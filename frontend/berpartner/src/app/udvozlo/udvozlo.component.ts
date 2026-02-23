import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PrivacypolicyComponent } from '../privacypolicy/privacypolicy.component';
import { ImprintComponent } from '../imprint/imprint.component';

@Component({
  selector: 'app-udvozlo',
  templateUrl: './udvozlo.component.html',
  styleUrl: './udvozlo.component.css'
})
export class UdvozloComponent {
  readonly dialog = inject(MatDialog);

  openPrivacyPolicy() {
    this.dialog.open(PrivacypolicyComponent);
  }

  openImprint() {
    this.dialog.open(ImprintComponent);
  }
}
