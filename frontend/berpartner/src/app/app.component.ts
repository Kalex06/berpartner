import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MessageService } from './services/message/message.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BérPartner';

  constructor(public router: Router, private message:MessageService) {
    this.router.events.pipe(filter(event=> event instanceof NavigationEnd)).subscribe(()=>{
      this.message.reloadnotReadMessageCount();
    })
   }

  // Nav-bar elrejtése ezeken az oldalakon:
  private readonly excludedRoutes = new Set(['', '/', '/login', '/register']);

  showNavbar(): boolean {
    return !this.excludedRoutes.has(this.router.url);
  }
}
