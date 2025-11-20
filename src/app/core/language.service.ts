import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  constructor(private translate: TranslateService) {
    const defaultLang = localStorage.getItem('lang') || 'it';
    this.setLanguage(defaultLang);
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || 'it';
  }
}
