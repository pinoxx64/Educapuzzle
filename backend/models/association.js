import Usuario from "./usuario.js"
import Rol from "./rol.js"
import UsuarioRol from "./usuariorol.js"

//Usuario
Usuario.Rol = Usuario.hasMany(UsuarioRol, {as: 'roles', foreignKey: 'idUsu'});

//Rol
Rol.Usuario = Rol.hasMany(UsuarioRol, {as: 'usuarios', foreignKey: 'idRol'});

//UsuarioRol
UsuarioRol.Usuario = UsuarioRol.belongsTo(Usuario, {as: 'usuario', foreignKey: 'idUsu'})
UsuarioRol.Rol = UsuarioRol.belongsTo(Rol, {as: 'rol', foreignKey: 'idRol'})

export {
    Usuario,
    Rol,
    UsuarioRol
}