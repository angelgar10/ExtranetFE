import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes), provideClientHydration(),
        provideAnimationsAsync(),
        provideAnimationsAsync(),
        provideFirebaseApp(() => initializeApp({"projectId":"extranet-a4a1c","appId":"1:612273775473:web:076683cb0dcf0601dc8cd0","storageBucket":"extranet-a4a1c.appspot.com","apiKey":"AIzaSyAHFyHDKOF54a6PAk-Htb-rgiyT3p42OG8","authDomain":"extranet-a4a1c.firebaseapp.com","messagingSenderId":"612273775473","measurementId":"G-8CLFQBX277"})),
        provideAuth(() => getAuth())]
};