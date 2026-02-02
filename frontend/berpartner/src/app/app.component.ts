import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BérPartner';

  constructor(public router: Router) { }

  // Nav-bar elrejtése ezeken az oldalakon:
  private readonly excludedRoutes = new Set(['', '/', '/login', '/register']);

  showNavbar(): boolean {
    return !this.excludedRoutes.has(this.router.url);
  }
}
