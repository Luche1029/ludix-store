import { Component, inject } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-details',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    TranslateModule
  ],
  templateUrl: './group-details.html',
  styleUrl: './group-details.scss',
})
export class GroupDetails {
  name = '';

  supplier = '';
  banner = '';
  suppliers: any[] = [];
  bannerFile: File | null = null;

  loading = false;
  error = '';

  constructor(private api: ApiService) {}

    private route = inject(ActivatedRoute);
    code = this.route.snapshot.paramMap.get('code')!;
      
    ngOnInit() {
      this.loadSuppliers();
      this.loadGroupDetails(this.code);
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

    loadGroupDetails(groupCode: string) {
      this.loading = true;
      this.api.post<any>('getGroupDetails', {groupCode}).subscribe({
        next: (res) => {
          this.name = res.group.name;
          this.code = res.group.code;
          this.supplier = res.group.supplier;
          this.banner = res.group.banner;
        },
        error: (err) => {
          this.error = 'Error loading group details';
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

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    this.api.post<any>('updateGroup', formData).subscribe({
      next: (res) => {
        if (res.success) alert('Group updated successfully');
        else this.error = res.error;
      },
      error: (err) => {
        this.error = err.error?.error || err.message;
      }
    });
  }
}
