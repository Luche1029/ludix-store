import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/core/api.service';
import { Switch} from 'src/app/shared/switch/switch'

@Component({
  selector: 'app-group-form',
  standalone: true,
  imports: [CommonModule, FormsModule, Switch],
  templateUrl: './subgroup-form.html',
  styleUrls: ['./subgroup-form.scss']
})
export class SubgroupForm {
  groups: any[] = [];

  name = '';
  code = '';
  group = '';
  bannerFile: File | null = null;
  maxPcSold: number = -1;
  showUserData: boolean = false;
  showLink: boolean = false;

  loading = false;
  error = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadGroups();
  }
 
  loadGroups() {
    this.loading = true;
    this.api.post<any>('getGroups', null).subscribe({
      next: (res) => {
        this.groups = res.groups || [];
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
    formData.append('group', this.group);
    formData.append('maxPcSold', `${this.maxPcSold}`);
    formData.append('showUserData', `${this.showUserData ? 1 : 0}`);
    formData.append('showLink', `${this.showLink ? 1 : 0}`);

    if (this.bannerFile) {
      formData.append('banner', this.bannerFile);
    }

    this.api.post<any>('createSubgroup', formData).subscribe({
      next: (res) => {
        if (res.success) alert('Subgroup saved successfully');
        else this.error = res.error;
      },
      error: (err) => {
        this.error = err.error?.error || err.message;
      }
    });
  }

}

