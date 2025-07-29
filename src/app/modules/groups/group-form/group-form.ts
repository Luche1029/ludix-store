import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-group-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './group-form.html',
  styleUrls: ['./group-form.scss']
})
export class GroupForm {
  name = '';
  code = '';
  supplier = '';
  banner = '';
  suppliers: any[] = [];
  bannerFile: File | null = null;

  loading = false;
  error = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.loading = true;
    this.api.post<any>('getSuppliers', null).subscribe({
      next: (res) => {
        console.log(JSON.stringify(res));
        this.suppliers = res.suppliers || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading suppliers';
        this.loading = false;
      }
    });
  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.bannerFile = file;
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('code', this.code);
    formData.append('supplier', this.supplier);
    if (this.bannerFile) {
      formData.append('banner', this.bannerFile);
    }

    this.api.post<any>('createGroup', formData).subscribe({
      next: (res) => {
        if (res.success) alert('Group saved successfully');
        else this.error = res.error;
      },
      error: (err) => {
        this.error = err.error?.error || err.message;
      }
    });
  }

}
