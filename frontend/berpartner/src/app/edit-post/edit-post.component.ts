import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ItemService } from '../services/item/item.service';
import { CategoryService } from '../services/category/category.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
  constructor(private item: ItemService, private category: CategoryService, private router: Router,private route:ActivatedRoute) { }
  private _formBuilder = inject(FormBuilder);
  imagePreviews: (string | null)[] = [null, null, null, null];
  selectedFiles: (File | null)[] = [null, null, null, null];
  deletedImages:any=[];
  maincategories: any;
  itemData:any;

  

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
    const hasExistingImage = this.imagePreviews.some(img => img !== null);
    this.uploadForm.patchValue({
      images: (hasImage||hasExistingImage) ? true : null
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
    this.toastr.success('Módosítások elmentve!', '', {
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
    this.deletedImages = this.deletedImages.filter((img:string) => !this.imagePreviews.includes(img));
      this.deletedImages = this.deletedImages.map((img:string)=> img.split('/').pop())
      console.log("ez",this.deletedImages);


    formData.append('id', String(this.itemData.id));
    formData.append('name', String(this.uploadForm.value.title));
    formData.append('category', String(this.uploadForm.value.category));
    formData.append('price_per_day', String(this.uploadForm.value.dailyFee));
    formData.append('condition', String(this.uploadForm.value.condition));
    formData.append('description', String(this.uploadForm.value.description));
    formData.append('deletedImages',this.deletedImages);

    this.item.updateItem(formData).subscribe({
      next: (x) => {
        console.log(x.message);
        this.showSuccess();
      },
      error:(err: HttpErrorResponse)=> {
        if(err.status == 403 || err.status == 401){
          this.router.navigate(['/login']);
  
        }
      }
    });
  }


  ngOnInit(): void {

    forkJoin({
      cat:  this.category.getAllCategory(),
      item: this.item.getItem(Number(this.route.snapshot.paramMap.get('id')))
    }).subscribe({
      next:(data)=> {
        this.maincategories = data.cat;
        this.itemData = data.item;
        this.uploadForm.patchValue({
          title:this.itemData.nev,
          category:this.itemData.kategoria_id,
          dailyFee:this.itemData.ar_egy_napra,
          condition:this.itemData.allapot,
          description:this.itemData.leiras
        });
     const pictures:any[] =  Object.values(this.itemData.kepek);
    
       this.imagePreviews = this.imagePreviews.map((img,index)=> pictures[index]?.kep_nev ? `http://localhost:3000/upload/picture/${pictures[index].kep_nev}` : null);
       this.deletedImages = this.imagePreviews;
      this.deletedImages = this.deletedImages.filter((img:any) => img!==null);
      this.updateImageValidation();
      console.log(this.deletedImages);
      },
      error:(err: HttpErrorResponse)=> {
        if(err.status == 403 || err.status == 401){
          this.router.navigate(['/login']);
  
        }
      }
    })


 
  }
}
