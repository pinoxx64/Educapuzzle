import { Routes } from '@angular/router';
import { LoginComponent } from './credenciales/login/login';
import { RegistroComponent } from './credenciales/registro/registro';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegistroComponent},
    { path: '',
        // component: conCabeceraComponent,
        // children: [
        //     { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
        //     { path: 'gestionUser', component: GestionUserComponent, canActivate: [AuthGuard] },
        //     { path: 'gestionPuzzle', component: GestionPuzzleComponent, canActivate: [AuthGuard] },
        //     { path: 'verPuzzle', component: VerPuzzleComponent, canActivate: [AuthGuard] },
        //     { path: 'resolverPuzzle', component: ResolverPuzzleComponent, canActivate: [AuthGuard] },
        //     {path: 'ranking', component: RankingComponent, canActivate: [AuthGuard] }
        // ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
