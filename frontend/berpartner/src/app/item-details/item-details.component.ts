import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

interface SortOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent {
  constructor(private auth: AuthService, private router: Router) { }

  navigateBack() {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 400);
  }

  options: SortOption[] = [
    { value: 'newest-0', viewValue: 'Legújabb' },
    { value: 'price-desc', viewValue: 'Legdrágább felül' },
    { value: 'price-asc', viewValue: 'Legolcsóbb felül' },
  ];
  selectedSort: string = 'newest-0';


  // Bérlés időszaka
  startDate: Date | null = null;
  endDate: Date | null = null;
  rangeText: string = 'Bérlési időszak kiválasztása';

  onStartChange(event: any) {
    this.startDate = event.value;
    this.updateRangeText();
  }

  onEndChange(event: any) {
    this.endDate = event.value;
    this.updateRangeText();
  }

  updateRangeText() {
    if (this.startDate && this.endDate) {
      const start = this.startDate.toLocaleDateString('hu-HU');
      const end = this.endDate.toLocaleDateString('hu-HU');
      this.rangeText = `${start} - ${end}`;
    } else {
      this.rangeText = 'Bérlési időszak kiválasztása';
    }
  }

}


