import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/core/api.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-category-form',
  imports: [
    CommonModule, 
    FormsModule,
    TranslateModule
  ],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss'
})
export class CategoryForm {
  category = '';
  code = '';
  qtmng = 'SINGLE_MANDATORY';
  wp_id = '0';
  sdr = '0';
  icon = '';

  iconFile: File | null = null;

  loading = false;
  success = '';
  error = '';

  constructor(private api: ApiService) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.iconFile = file;       
  }

  submit() {
    const formData = new FormData();
    formData.append('name', this.category);
    formData.append('code', this.code);
    formData.append('qtmng', this.qtmng);
    formData.append('wp_id', this.wp_id);
    formData.append('sdr', this.sdr);

    if (this.iconFile) {
      formData.append('icon', this.iconFile);
    }

    this.api.post<any>('createCategory', formData).subscribe({
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
