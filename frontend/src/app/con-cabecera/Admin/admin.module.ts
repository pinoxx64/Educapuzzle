import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ADMIN_ROUTES } from './admin.routes';
import { GestionUsuarioComponent } from './gestion-usuario/gestion-usuario';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ADMIN_ROUTES),
        GestionUsuarioComponent
    ]
})

export class AdminModule { }
