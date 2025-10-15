import { Routes } from '@angular/router';
import { LoginComponent } from './credenciales/login/login';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: '',
        //component: InicioComponent,
        children: [

        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
