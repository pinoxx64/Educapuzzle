import Usuario from "./usuario.js"
import Rol from "./rol.js"
import UsuarioRol from "./usuariorol.js"
import Puzzle from "./puzzle.js"
import Caregoria from "./categoria.js"

//Usuario
Usuario.Rol = Usuario.hasMany(UsuarioRol, {as: 'roles', foreignKey: 'idUsu'});
Usuario.Categoria = Usuario.hasMany(Caregoria, {as: 'categoria', foreignKey: 'idCreador'});

//Rol
Rol.Usuario = Rol.hasMany(UsuarioRol, {as: 'usuarios', foreignKey: 'idRol'});

//UsuarioRol
UsuarioRol.Usuario = UsuarioRol.belongsTo(Usuario, {as: 'usuarios', foreignKey: 'idUsu'})
UsuarioRol.Rol = UsuarioRol.belongsTo(Rol, {as: 'rol', foreignKey: 'idRol'})

//Puzzle
Puzzle.Categoria = Puzzle.hasMany(Caregoria, {as: 'categoria', foreignKey: 'idPuzzle'});

//Categoria
Caregoria.Puzzle = Caregoria.belongsTo(Puzzle, {as: 'puzzle', foreignKey: 'idPuzzle'});
Caregoria.Usuario = Caregoria.belongsTo(Usuario, {as: 'usuarios', foreignKey: 'idCreador'});

export {
    Usuario,
    Rol,
    UsuarioRol,
    Puzzle,
    Caregoria
}