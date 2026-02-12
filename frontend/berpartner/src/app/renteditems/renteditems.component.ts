import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-renteditems',
  templateUrl: './renteditems.component.html',
  styleUrl: './renteditems.component.css'
})
export class RenteditemsComponent {
  constructor(private router: Router) { }

  navigateBack() {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 400);
  }
}
