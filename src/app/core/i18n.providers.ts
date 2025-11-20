// src/app/core/i18n.providers.ts
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export function provideTranslations() {
  return provideTranslateService({
    // lingua iniziale
    lang: 'it',
    // lingua di fallback se manca una chiave
    fallbackLang: 'it',
    // configurazione del loader HTTP
    loader: provideTranslateHttpLoader({
      prefix: './assets/i18n/',
      suffix: '.json',
      // opzionali:
      // enforceLoading: false,
      // useHttpBackend: false,
    }),
  });
}
