import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideZoneChangeDetection } from '@angular/core';
import { routes } from './app.routes';
import { SpinnerInterceptor } from './spinner.interceptor';
import { provideToastr } from 'ngx-toastr'; // ✅ Import


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    importProvidersFrom(
      BrowserModule,
      FormsModule,
      HttpClientModule
    ),

    // ✅ Toastr notification provider
    provideToastr(),

    // ✅ Spinner interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    }
  ]
};
