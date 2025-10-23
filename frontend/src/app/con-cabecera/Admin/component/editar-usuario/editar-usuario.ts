import { Usuario } from './../../../../interface/usuario';
import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  standalone: true,
  selector: 'app-editar-usuario',
  imports: [
    DialogModule,
    FormsModule,
    CommonModule,
    PasswordModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './editar-usuario.html',
  styleUrls: ['./editar-usuario.css']
})
export class EditarUsuario {
  @Input() visible: boolean = false;
  @Input() usu: Usuario | null = null;
  @Input() onClose: () => void = () => {};
  @Input() onSave: (usu: Partial<Usuario>) => void = () => {};

  correo: string = '';
  contrasena: string = '';

  ngOnChanges() {
    if (this.usu) {
      console.log(this.usu);
      this.correo = this.usu.correo;
      this.contrasena = '';
    }
  }

  save() {
    if (this.usu) {
      this.onSave({
        id: this.usu.id,
        correo: this.correo,
        contrasena: this.contrasena
      });
    }
  }
}
