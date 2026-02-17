import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ItemService } from '../services/item/item.service';

interface Condition {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  constructor(private fb: FormBuilder, private item: ItemService, private router: Router) { }
  private _formBuilder = inject(FormBuilder);
  imagePreviews: (string | null)[] = [null, null, null, null];
  selectedFiles: (File | null)[] = [null, null, null, null];

  uploadForm = this._formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', [Validators.required]],
    condition: ['', [Validators.required]],
    dailyFee: [null, [Validators.required, Validators.min(1)]],
    description: ['', Validators.required],
   // images: [[], [Validators.required]] 
  })

  conditions: Condition[] = [
    { value: 'Új', viewValue: 'Új' },
    { value: 'Újszerű', viewValue: 'Újszerű' },
    { value: 'Jó / megkímélt', viewValue: 'Jó / megkímélt' },
    { value: 'Használt', viewValue: 'Használt' },
  ];


  onFileSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[index] = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews[index] = e.target.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.imagePreviews[index] = null;
    this.selectedFiles[index] = null;
    
  }



  SendItem(){
    const formData = new FormData();
    
    this.selectedFiles.filter(file=>file!=null&&file!=undefined).forEach((file)=>{
      formData.append('selectedFiles',file,file.name);
    })

    formData.append('nev',String(this.uploadForm.value.title));
    formData.append('kategoria',String(this.uploadForm.value.category));
    formData.append('ar_egy_napra',String(this.uploadForm.value.dailyFee));
    formData.append('allapot',String(this.uploadForm.value.condition));
    formData.append('leiras',String(this.uploadForm.value.description));


    this.item.uploaditem(formData).subscribe({
      next:()=>alert("Feltöltés sikeres!"),
      error(err) {
        alert(err)
      }
    });
  }
}
