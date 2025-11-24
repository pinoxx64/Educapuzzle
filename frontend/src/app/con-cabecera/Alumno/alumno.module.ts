import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ALUMNO_ROUTES } from './alumno.routes';
import { ResolverPuzzle } from './resolver-puzzle/resolver-puzzle';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ALUMNO_ROUTES),
        ResolverPuzzle
    ]
})

export class AlumnoModule { }