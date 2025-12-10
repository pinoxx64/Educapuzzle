export interface Usuario {
    user: any
    id: number,
    name: string,
    correo: string,
    contrasena: string,
    puntuacion: number,
    roles: string[],
    deletedAt: any
}

export interface UsuarioResponse {
  message: string,
  status: number,
  usuario: Usuario,
  token: string
}