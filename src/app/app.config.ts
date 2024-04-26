import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"sala-de-juegos-9ea15","appId":"1:445654103320:web:a548f2226ebbbbc99eda6d","storageBucket":"sala-de-juegos-9ea15.appspot.com","apiKey":"AIzaSyAO5KPk6-UdHZPI1yuptgfpFgOxWROyrJ4","authDomain":"sala-de-juegos-9ea15.firebaseapp.com","messagingSenderId":"445654103320"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideStorage(() => getStorage()))]
};
