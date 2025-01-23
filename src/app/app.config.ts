import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {ConfirmationService, MessageService} from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
    { provide: "ConfirmationService", useClass: ConfirmationService },
    { provide: "MessageService", useClass: MessageService },
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
};
