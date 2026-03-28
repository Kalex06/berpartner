import {  Component, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../services/item/item.service';
import { RentService } from '../services/rent/rent.service';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatCalendarCellClassFunction, MatDatepicker } from '@angular/material/datepicker';
import { HttpErrorResponse } from '@angular/common/http';
import { range } from 'rxjs';

interface SortOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ItemDetailsComponent {
  currentUserId: number | null = null;
  post: any = null;
  reservedDates:any = null;

  constructor(private auth: AuthService, private item: ItemService, private rent: RentService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog) { }
  @ViewChild('picker') picker !: MatDatepicker<Date>;
  
  
  openImage(index: number) {
    if (!this.post.kepek[index]) return;

    const imageUrl = `http://localhost:3000/upload/picture/${this.post.kepek[index].kep_nev}`;
    this.dialog.open(ImageDialogComponent, {
      data: { url: imageUrl },
      maxWidth: '95vw',
      maxHeight: '95vh'
    });
  }
  
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
  
  
  toastr = inject(ToastrService);
  showSuccess() {
    this.toastr.success('Sikeres rendelés!', '', {
      positionClass: 'toast-top-center',
      timeOut: 4000,
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true,
      tapToDismiss: true,
    });
    
    this.router.navigate(['/home']);
  }
  
  ngOnInit() {
    this.auth.getMyProfile().subscribe({
      next: user => {
        this.currentUserId = user.id;
      },
      error: err => console.log(err.error.message)
    });
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.item.getItem(id).subscribe({
      next: data => {
        this.post = data;
      },
      error(err) {
        console.log(err);
      }
    });

    this.rent.ItemRentsDate(id).subscribe({
      next:(dates)=>{
        this.reservedDates = dates;
        if(this.picker)
        {
          this.picker.stateChanges.next();
        }
  
      },
      error:(err: HttpErrorResponse)=> {
        if(err.status == 403 || err.status == 401){
          this.router.navigate(['/login']);
  
        }
      },
    })

  }
  
  sendRent() {
    const data = {
      eszkoz_id: Number(this.route.snapshot.paramMap.get('id')),
      tulajdonos_id: this.post.tulajdonos_id,
      datum_tol: this.startDate,
      datum_ig: this.endDate
    }
    
    this.rent.uploadRent(data).subscribe({
      next: () => {
        this.showSuccess();
      },
      error:(err: HttpErrorResponse)=> {
        if(err.status==409)
        {
          this.toastr.error(err.error.message);
        }

      }
    })
  }
  
  editPost(id:number) {
    this.router.navigate([`/edit-post/${id}`]);
  }
  
  deletePost() {
    
  }


  
  


dateFilter = (d: Date | null): boolean => {
  if (!d){
    return true;
  }
 if (!this.reservedDates || !Array.isArray(this.reservedDates)) {
    return false;
  }

   const date = d.getTime();
  const isReserved = this.reservedDates.some((range:any)=>{ 
    return date >= new Date(range.datum_tol).getTime() && date <= new Date(range.datum_ig).getTime()
  });

  return !isReserved;
  
};


dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
  if (view === 'month') {

     if (!this.reservedDates || !Array.isArray(this.reservedDates)) {
       return '';
    }

  const date = cellDate.getTime();
  const found = this.reservedDates.find((range:any)=>{ 
    return date >= new Date(range.datum_tol).getTime() && date <= new Date(range.datum_ig).getTime()
  });

  if(found){
    if(found.statusz=='accepted'){
      return 'reserved-day';
    }
    if(found.statusz=='pending'){
      return 'pending-reserved-day';
    }
  }
  else{
      return '';
    }
  }

  return '';
};

}
