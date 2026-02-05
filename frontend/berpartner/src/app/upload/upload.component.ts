import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

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
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }
  private _formBuilder = inject(FormBuilder);
  imagePreviews: (string | null)[] = [null, null, null, null];
  selectedFiles: (File | null)[] = [null, null, null, null];

  uploadForm = this._formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', [Validators.required]],
    condition: ['', [Validators.required]],
    dailyFee: [null, [Validators.required, Validators.min(1)]],
    description: ['', Validators.required],
    images: [[], [Validators.required]] 
  })

  conditions: Condition[] = [
    { value: 'new', viewValue: 'Új' },
    { value: 'newlike', viewValue: 'Újszerű' },
    { value: 'good', viewValue: 'Jó / megkímélt' },
    { value: 'used', viewValue: 'Használt' },
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

   // formData.append('nev',)
  }
}
