import { Routes } from '@angular/router';
import { LoginComponent } from './credenciales/login/login';
import { RegistroComponent } from './credenciales/registro/registro';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegistroComponent},
    // { path: '',
    //     //component: InicioComponent,
    //     children: [

    //     ]
    // },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
