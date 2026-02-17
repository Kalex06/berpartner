import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../services/item/item.service';
import { RentService } from '../services/rent/rent.service';

interface SortOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent  {
  constructor(private auth: AuthService,private item: ItemService,private rent: RentService, private router: Router, private route: ActivatedRoute) { }

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

  post: any=null;
  
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.item.getItem(id).subscribe({
      next:data=>{
        this.post = data;
      },
      error(err) {
        console.log(err.error.message);
      },
    })
  }


  sendRent(){
    const data = {
      eszkoz_id: Number(this.route.snapshot.paramMap.get('id')),
      tulajdonos_id: this.post.tulajdonos_id,
      datum_tol: this.startDate,
      datum_ig:this.endDate

    }

    this.rent.UploadRent(data).subscribe({
      next:()=>alert("Sikeres küldés!"),
      error(err) {
        console.log(err);
      },
    })



  }


}


