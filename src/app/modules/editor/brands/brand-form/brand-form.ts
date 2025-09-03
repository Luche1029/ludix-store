import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-brand-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './brand-form.html',
  styleUrl: './brand-form.scss'
})

export class BrandForm {
  brand = '';
  code = '';
  logo = '';
  poweredImage = '';
  svgLabel = '';
  site = '';
  logoFile: File | null = null;
  poweredImageFile: File | null = null;
  svgLabelFile: File | null = null;

  loading = false;
  success = '';
  error = '';

  constructor(private api: ApiService) {}

  onFileChange(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      if (type === 'L') {
        this.logoFile = file;        
      } 
      else if (type === 'P') {
        this.poweredImageFile = file;        
      }
      else if (type === 'S') {
        this.svgLabelFile = file;        
      }      
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('name', this.brand);
    formData.append('code', this.code);

    if (this.logoFile) {
      formData.append('logo', this.logoFile);
    }

    if (this.poweredImageFile) {
      formData.append('poweredImage', this.poweredImageFile);
    }

    if (this.svgLabelFile) {
      formData.append('svgLabel', this.svgLabelFile);
    }

    this.api.post<any>('createBrand', formData).subscribe({
      next: (res) => {
        if (res.success) this.showMessage('S', 'Group saved successfully');
        else this.showMessage('E', res.error); 
      },
      error: (err) => {
        const error = err.error?.error || err.message;
        this.showMessage('E', error); 
      }
    });
  }

  showMessage(type: string, message: string) {
    if (type === 'S') 
      this.success = message;
    else 
      this.error = message;
    setTimeout(() => {this.success = ''; this.error = ''}, 3000);
  }

}
