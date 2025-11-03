import Usuario from "./usuario.js"
import Rol from "./rol.js"
import UsuarioRol from "./usuariorol.js"
import Puzzle from "./puzzle.js"
import Categoria from "./categoria.js"
import Objeto from "./objeto.js"
import Caracteristicas from "./caracteristicas.js"
import ObjetoCaracteristicas from "./objetocaracteristicas.js"

//Usuario
Usuario.Rol = Usuario.hasMany(UsuarioRol, {as: 'roles', foreignKey: 'idUsu'});
Usuario.Categoria = Usuario.hasMany(Categoria, {as: 'categoria', foreignKey: 'idCreador'});

//Rol
Rol.Usuario = Rol.hasMany(UsuarioRol, {as: 'usuarios', foreignKey: 'idRol'});

//UsuarioRol
UsuarioRol.Usuario = UsuarioRol.belongsTo(Usuario, {as: 'usuarios', foreignKey: 'idUsu'})
UsuarioRol.Rol = UsuarioRol.belongsTo(Rol, {as: 'rol', foreignKey: 'idRol'})

//Puzzle
Puzzle.Categoria = Puzzle.hasMany(Categoria, {as: 'categoria', foreignKey: 'idPuzzle'});

//Categoria
Categoria.Puzzle = Categoria.belongsTo(Puzzle, {as: 'puzzle', foreignKey: 'idPuzzle'});
Categoria.Usuario = Categoria.belongsTo(Usuario, {as: 'usuarios', foreignKey: 'idCreador'});
Categoria.Objeto = Categoria.hasMany(Objeto, {as: 'objeto', foreignKey: 'idCategoria'});
Categoria.Caracteristica = Categoria.hasMany(Objeto, {as: 'caracteristica', foreignKey: 'idCategoria'});

//Objeto
Objeto.Categoria = Objeto.belongsTo(Categoria, {as: 'categoria', foreignKey: 'idCategoria'});
Objeto.Caracteristica = Objeto.hasMany(Caracteristicas, {as: 'caracteristica', foreignKey: 'idObjeto'});

//Caracteristica
Caracteristicas.Categoria = Caracteristicas.belongsTo(Categoria, {as: 'categoria', foreignKey: 'idCategoria'});
Caracteristicas.Objeto = Caracteristicas.belongsTo(Objeto, {as: 'objeto', foreignKey: 'idCaracteristica'});

//ObjetoCaracteristica
ObjetoCaracteristicas.Objeto = ObjetoCaracteristicas.belongsTo(Objeto, {as: 'objeto', foreignKey: 'idObjeto'});
ObjetoCaracteristicas.Caracteristica = ObjetoCaracteristicas.belongsTo(Caracteristicas, {as: 'caracteristica', foreignKey: 'idCaracteristica'});

export {
    Usuario,
    Rol,
    UsuarioRol,
    Puzzle,
    Categoria,
    Objeto,
    Caracteristicas,
    ObjetoCaracteristicas
}