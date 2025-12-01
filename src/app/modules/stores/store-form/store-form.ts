import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Switch} from 'src/app/shared/switch/switch';

@Component({
  selector: 'app-store-form',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    Switch,
    TranslateModule
  ],
  templateUrl: './store-form.html',
  styleUrl: './store-form.scss',
})
export class StoreForm {
  store = {
    name: '',
    code: '',
    location: '',
    type: '',
    manager: '',
    email: '',
    phone: '',
    active: false
  };

  constructor(private router: Router) {}

  back() {
    this.router.navigate(['/stores']);
  }

  save() {
    // salva non implementato
    alert('Store saved (static)');
    this.back();
  }
}
