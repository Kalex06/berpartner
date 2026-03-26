import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ItemService } from '../services/item/item.service';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private auth: AuthService, private item: ItemService, private route: ActivatedRoute, private _user: UserService, private toastr: ToastrService) { }
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

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      const formData = new FormData();

      if (this.selectedFile) {
        formData.append('selectedFile', this.selectedFile, this.selectedFile.name);

        this._user.updateProfilePicture(formData).subscribe({
          next: () => this.toastr.success("Sikeres Profilkép módosítás!"),
          error: (err) => {
            this.toastr.error("Sikertelen Profilkép módosítás!")
          }
        })
      }
    }
  }

}
