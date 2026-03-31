import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RentService } from '../services/rent/rent.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-renteditems',
  templateUrl: './renteditems.component.html',
  styleUrl: './renteditems.component.css'
})
export class RenteditemsComponent implements OnInit{
  constructor(private router: Router,private Rent:RentService) { }

  navigateBack() {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 400);
  }

rents:any

  ngOnInit(): void {
    this.Rent.myRents().subscribe({
      next:(data)=> {
        this.rents = data;
      },
      error:(err: HttpErrorResponse)=> {
        if(err.status == 403 || err.status == 401){
          this.router.navigate(['/login']);
  
        }
      }
    })
  }

}
