import { Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from "@angular/fire/auth-guard"

export const routes: Routes = [

    {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent),
        ...canActivate(() => redirectUnauthorizedTo(["/login"]))
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./components/register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: 'sobre-mi',
        loadComponent: () => import('./components/quien-soy/quien-soy.component').then(c => c.QuienSoyComponent),
        ...canActivate(() => redirectUnauthorizedTo(["/login"]))
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    }
];
