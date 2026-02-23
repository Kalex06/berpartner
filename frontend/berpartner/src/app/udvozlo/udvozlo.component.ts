import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PrivacypolicyComponent } from '../privacypolicy/privacypolicy.component';

@Component({
  selector: 'app-udvozlo',
  templateUrl: './udvozlo.component.html',
  styleUrl: './udvozlo.component.css'
})
export class UdvozloComponent {
  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(PrivacypolicyComponent);
  }
}
