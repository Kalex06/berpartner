import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

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
  constructor(private auth: AuthService, private router: Router) { }

  conditions: Condition[] = [
    {value: 'new', viewValue: 'Új'},
    {value: 'newlike', viewValue: 'Újszerű'},
    {value: 'good', viewValue: 'Jó / megkímélt'},
    {value: 'used', viewValue: 'Használt'},
  ];

  navigateBack() {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 400);
  }


  imagePreviews: (string | null)[] = [null, null, null, null];
  selectedFiles: (File | null)[] = [null, null, null, null];

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
    
  }
}
