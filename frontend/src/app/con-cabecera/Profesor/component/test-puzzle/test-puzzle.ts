import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-test-puzzle',
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './test-puzzle.html',
  styleUrl: './test-puzzle.css'
})
export class TestPuzzle {
  @Input() visible: boolean = false;

  @Output() onClose = new EventEmitter<void>();

  cerrar() {
    this.onClose.emit();
  }
}
