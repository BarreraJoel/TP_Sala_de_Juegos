import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'sobre-mi',
        loadComponent: () => import('./components/quien-soy/quien-soy.component').then(c => c.QuienSoyComponent)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    }
];
