import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {LanguageService } from '../../core/language.service';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],  
  imports: [
    CommonModule, 
    FormsModule, 
    TranslateModule  
  ],
})
export class Header {
  constructor(private auth: AuthService, private router: Router, private languageService: LanguageService) {}
  selectedLang = 'it'; // default
  

  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
