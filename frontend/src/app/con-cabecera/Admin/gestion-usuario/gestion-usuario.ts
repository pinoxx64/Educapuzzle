import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Usuario } from '../../../interface/usuario';
import { UsuarioService } from '../../../service/usuario.service';
import { EditarRolUsuario } from "../component/editar-rol-usuario/editar-rol-usuario";
import { EditarUsuario } from "../component/editar-usuario/editar-usuario";
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-gestion-usuario',
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    ConfirmPopupModule,
    //EditarRolUsuario, 
    EditarUsuario],
  providers: [ConfirmationService],
  templateUrl: './gestion-usuario.html',
  styleUrl: './gestion-usuario.css'
})
export class GestionUsuarioComponent {
  usuarios: Usuario[] = []
  dialogEditarVisible = false
  usuarioAEditar: Usuario | null = null
  usuario!: Usuario

  dialogRolesVisible =  false
  rolesEditarUsuario: string[] = []
  usuarioAEditarRoles: Usuario | null = null
  usuarioIdAEditarRoles: number | null = null

  constructor(
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService) { }
  
  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getUsers().subscribe({
      next: (data: Usuario[]) => {
        this.usuarios = data;
        console.log(data)
      },
      error: (err) => {
        console.error('Error al cargar los usuarios:', err);
      }
    });
  }

  softdeleteUsuarios(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as HTMLElement,
      message: '¿Seguro que quieres eliminar este usuario?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.usuarioService.softDeleteUser(id).subscribe(() => {
          this.cargarUsuarios();
        });
      }
    });
  }

  activarUsuarios(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as HTMLElement,
      message: '¿Seguro que quieres activar este usuario?',
      icon: 'pi pi-check',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.usuarioService.activateUser(id).subscribe(() => {
          this.cargarUsuarios();
        });
      }
    });
  }

  abrirDialogoEditar(usu: Usuario){
    this.usuarioAEditar = usu
    this.dialogEditarVisible = true
  }

  cerrarDialogoEditar = () =>{
    this.dialogEditarVisible = false
    this.usuarioAEditar = null
  }

  guardarUsuarioEditado = (data: Partial<Usuario>) =>{
    if (!this.usuarioAEditar || typeof this.usuarioAEditar.id !== 'number') {
      console.error('No user selected for editing or user id is missing.');
      return;
    }
    const usuarioEditado: Usuario = { ...this.usuarioAEditar, ...data, id: this.usuarioAEditar.id };
    this.usuarioService.putUser(usuarioEditado).subscribe(() => {
      this.cargarUsuarios();
      this.cerrarDialogoEditar();
    });
  }

  abrirDialogoRoles(usu: Usuario){
    this.rolesEditarUsuario = usu.roles;
    this.usuarioAEditarRoles = usu;
    this.dialogRolesVisible = true;
  }

  cerrarDialogoRoles(){
    this.dialogRolesVisible = false;
    this.usuarioAEditarRoles = null;
  }

  guardarRolesEditados(roles: string[]){
      if (!this.usuarioAEditarRoles) return;
  const userBody = {
    ...this.usuarioAEditarRoles,
    roles
  };
  this.usuarioService.putUser(userBody).subscribe(() => {
    this.cargarUsuarios();
    this.cerrarDialogoRoles();
  });
  }
}
