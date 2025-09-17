/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideNgxMask } from 'ngx-mask';
import { ThemeService } from './app/contrast/theme.service';


// bootstrapApplication(AppComponent, {
//   ...appConfig,
//   providers: [
//     ...appConfig.providers,
//     provideNgxMask(),
//   ]
// }).catch(err => console.error(err));



bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideNgxMask(),
    ThemeService
  ]
}).then(appRef => {
  const themeService = appRef.injector.get(ThemeService);
  themeService.setDarkMode(false); // inicia no modo claro
}).catch(err => console.error(err));

