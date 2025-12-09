import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/core/api.service';
import { Switch } from 'src/app/shared/switch/switch';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subgroup-details',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    Switch,
    TranslateModule
  ],
  templateUrl: './subgroup-details.html',
  styleUrl: './subgroup-details.scss',
})
export class SubgroupDetails {
  
  private route = inject(ActivatedRoute);
  code = this.route.snapshot.paramMap.get('code')!;
  groups: any[] = [];

  name = '';
  group = '';
  bannerFile: File | null = null;
  maxPcSold: number = -1;
  showUserData: boolean = false;
  showLink: boolean = false;
  ediel: boolean = false;

  loading = false;
  error = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadGroups();
    this.loadSubgroupDetails(this.code);
  }

  loadGroups() {
    this.loading = true;
    this.api.post<any>('getGroups', null).subscribe({
      next: (res) => {
        this.groups = res.groups || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'message.errors_loading_suppliers';
        this.loading = false;
      }
    });
  }

  loadSubgroupDetails(subgroupCode: string) {
    this.loading = true;
    this.api.post<any>('getSubgroupDetails', {subgroupCode}).subscribe({
      next: (res) => {
        this.name = res.subgroup.name;
        this.code = res.subgroup.code;
        this.group = res.subgroup.group_code;
        this.maxPcSold = res.subgroup.max_pc_sold;
        this.showUserData = res.subgroup.show_user_data;
        this.showLink = res.subgroup.show_link;
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
    formData.append('group', this.group);
    formData.append('maxPcSold', `${this.maxPcSold}`);
    formData.append('showUserData', `${this.showUserData ? 1 : 0}`);
    formData.append('showLink', `${this.showLink ? 1 : 0}`);
    formData.append('ediel', `${this.ediel ? 1 : 0}`);

    if (this.bannerFile) {
      formData.append('banner', this.bannerFile);
    }

    this.api.post<any>('createSubgroup', formData).subscribe({
      next: (res) => {
        if (res.success) alert('messages.subgroup_saved_successfully');
        else this.error = res.error;
      },
      error: (err) => {
        this.error = err.error?.error || err.message;
      }
    });
  }

}
