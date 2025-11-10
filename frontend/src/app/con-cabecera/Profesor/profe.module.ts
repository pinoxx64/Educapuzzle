import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PROFESOR_ROUTES } from './profe.routes';
import { GetionPuzzleComponent } from './getion-puzzle/getion-puzzle';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PROFESOR_ROUTES),
        GetionPuzzleComponent
    ]
})

export class ProfeModule { }