import { Routes } from '@angular/router';
import { LoginComponent } from './credenciales/login/login';
import { RegistroComponent } from './credenciales/registro/registro';
import { AuthGuard } from './guards/auth.guard';
import { conCabeceraComponent } from './con-cabecera/con-cabecera';
import { InicioComponent } from './con-cabecera/inicio/inicio';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegistroComponent},
    { path: '',
        component: conCabeceraComponent,
        children: [
            { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
            // { path: 'gestionUser', component: GestionUserComponent, canActivate: [AdminGuard, AuthGuard] },
            // { path: 'gestionPuzzle', component: GestionPuzzleComponent, canActivate: [ProfeGuard, AuthGuard] },
            // { path: 'verPuzzle', component: VerPuzzleComponent, canActivate: [ProfeGuard, AuthGuard] },
            // { path: 'resolverPuzzle', component: ResolverPuzzleComponent, canActivate: [AuthGuard] },
            // { path: 'ranking', component: RankingComponent}
        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
