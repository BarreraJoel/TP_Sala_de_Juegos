import { Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from "@angular/fire/auth-guard"

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent),
        ...canActivate(() => redirectUnauthorizedTo(["/login"])),
        children: [
            {
                path: "ahorcado",
                loadComponent: () => import('./components/juegos/ahorcado/ahorcado.component').then(c => c.AhorcadoComponent)
            },
            {
                path: "mayor-menor",
                loadComponent: () => import('./components/juegos/mayor-o-menor/mayor-o-menor.component').then(c => c.MayorOMenorComponent)
            },
            {
                path: "preguntados",
                loadComponent: () => import('./components/juegos/preguntados/preguntados.component').then(c => c.PreguntadosComponent)
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'home'
            }
        ]
    },
    {
        path: 'sobre-mi',
        loadComponent: () => import('./components/quien-soy/quien-soy.component').then(c => c.QuienSoyComponent),
        ...canActivate(() => redirectUnauthorizedTo(["/login"]))
    },
    {
        path: 'chat',
        loadComponent: () => import('./components/chat/chat.component').then(c => c.ChatComponent),
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
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    }
];