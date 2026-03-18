import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ItemService } from '../services/item/item.service';
import { CategoryService } from '../services/category/category.service';
import { ToastrService } from 'ngx-toastr';

interface Condition {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit {
  constructor(private item: ItemService, private category: CategoryService, private router: Router) { }
  private _formBuilder = inject(FormBuilder);
  imagePreviews: (string | null)[] = [null, null, null, null];
  selectedFiles: (File | null)[] = [null, null, null, null];
  maincategories: any

  uploadForm = this._formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', [Validators.required]],
    condition: ['', [Validators.required]],
    dailyFee: [null, [Validators.required, Validators.min(1)]],
    description: ['', Validators.required],
    images: [null as any, [Validators.required]]
  })

  conditions: Condition[] = [
    { value: 'Új', viewValue: 'Új' },
    { value: 'Újszerű', viewValue: 'Újszerű' },
    { value: 'Jó / megkímélt', viewValue: 'Jó / megkímélt' },
    { value: 'Használt', viewValue: 'Használt' },
  ];


  updateImageValidation() {
    const hasImage = this.selectedFiles.some(f => f !== null);
    this.uploadForm.patchValue({
      images: hasImage ? true : null
    });
    this.uploadForm.get('images')?.updateValueAndValidity();
  }

  onFileSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[index] = file;
      console.log("selected:",this.selectedFiles[index])

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews[index] = e.target.result as string;
        console.log("Previews",this.imagePreviews[index])
      };
      reader.readAsDataURL(file);
      this.updateImageValidation();

    }
  }

  removeImage(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.imagePreviews[index] = null;
    this.selectedFiles[index] = null;
    this.updateImageValidation();

  }

  toastr = inject(ToastrService);
  showSuccess() {
    this.toastr.success('Sikeres feltöltés!', '', {
      positionClass: 'toast-top-center',
      timeOut: 4000,
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true,
      tapToDismiss: true,
    });

    this.router.navigate(['/home']);
  }


  SendItem() {
    const formData = new FormData();
    this.selectedFiles.filter(file => file != null && file != undefined).forEach((file) => {
      formData.append('selectedFiles', file, file.name);
    })



    formData.append('name', String(this.uploadForm.value.title));
    formData.append('category', String(this.uploadForm.value.category));
    formData.append('price_per_day', String(this.uploadForm.value.dailyFee));
    formData.append('condition', String(this.uploadForm.value.condition));
    formData.append('description', String(this.uploadForm.value.description));

    this.item.uploaditem(formData).subscribe({
      next: () => {
        this.showSuccess();
      },
      error(err) {
        alert(err.error.message)
      }
    });
  }


  ngOnInit(): void {
    this.category.getAllCategory().subscribe({
      next: categories => this.maincategories = categories,
      error(err) {
        console.log(err);
      }
    })
  }
}
