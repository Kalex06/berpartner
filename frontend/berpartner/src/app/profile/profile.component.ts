import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ItemService } from '../services/item/item.service';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private auth: AuthService, private item: ItemService, private route: ActivatedRoute) { }
  user: any = null
  posts: any[] = [];


  ngOnInit() {
    this.auth.getProfile(Number(this.route.snapshot.paramMap.get('id'))).pipe(
      switchMap(profile => {
        this.user = profile;
        return this.item.getItemByOwner(profile.id);
      })
    ).subscribe({
      next: data => {
        this.posts = data;
      },
      error(err) {
        console.log(err)
      },
    });
  }

}
