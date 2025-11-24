import { Routes } from '@angular/router';
import { LoginComponent } from './credenciales/login/login';
import { RegistroComponent } from './credenciales/registro/registro';
import { AuthGuard } from './guards/auth.guard';
import { conCabeceraComponent } from './con-cabecera/con-cabecera';
import { InicioComponent } from './con-cabecera/inicio/inicio';
import { GestionUsuarioComponent } from './con-cabecera/Admin/gestion-usuario/gestion-usuario';
import { AdminGuard } from './guards/admin.guard';
import { GetionPuzzleComponent } from './con-cabecera/Profesor/getion-puzzle/getion-puzzle';
import { ProfeGuard } from './guards/profe.guard';
import { ResolverPuzzle } from './con-cabecera/Alumno/resolver-puzzle/resolver-puzzle';
import { Ranking } from './con-cabecera/Alumno/ranking/ranking';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegistroComponent},
    { path: '',
        component: conCabeceraComponent,
        children: [
            { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
            { path: 'gestionUser', component: GestionUsuarioComponent, canActivate: [AdminGuard, AuthGuard] },
            { path: 'gestionPuzzle', component: GetionPuzzleComponent, canActivate: [ProfeGuard, AuthGuard] },
            { path: 'resolverPuzzle', component: ResolverPuzzle, canActivate: [AuthGuard] },
            { path: 'ranking', component: Ranking, canActivate: [AuthGuard] }
        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
