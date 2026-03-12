import { Component, inject } from '@angular/core';
import { NotificationsComponent } from '../notifications/notifications.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ItemService } from '../services/item/item.service';
import { forkJoin } from 'rxjs';
import { CategoryService } from '../services/category/category.service';

interface SortOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private item: ItemService,private category:CategoryService, private router: Router,private route:ActivatedRoute) { }

  readonly dialog = inject(MatDialog);

  openNotifications() {
    this.dialog.open(NotificationsComponent);
  }

  options: SortOption[] = [
    { value: '1', viewValue: 'Legújabb' },
    { value: '2', viewValue: 'Legdrágább felül' },
    { value: '3', viewValue: 'Legolcsóbb felül' },
  ];
  selectedSort: string = '1';

  posts: any[]=[];
  maincategories: any



  sortChange(sort_id:string){
    this.router.navigate([],{
      queryParams: {sort: sort_id},
      queryParamsHandling: 'merge'
    });
  }

categoryChange(category_id:string){
    this.router.navigate([],{
      queryParams: {category: category_id},
      queryParamsHandling: 'merge'
    });
  }


searchChange(search_string:string){
    this.router.navigate([],{
      queryParams: {
        search: search_string || null,
        category: null
      },
      queryParamsHandling: 'merge'
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      const category = params['category'];
      const sort = params['sort'] || 1;
      const search = params['search'];

      const request = search ? this.item.searchItems(sort,search) : this.item.getAllItems(sort,category);

    
  forkJoin({
    cat: this.category.getAllCategory(),
    items: request

  }).subscribe({
      next:(data)=>{
        this.posts = data.items;
        this.maincategories = data.cat;
      },
      error(err) {
        console.log(err.error.message,err);
      }
    });
  });
  }


}
