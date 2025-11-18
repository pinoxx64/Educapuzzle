// import Usuario from "./usuario.js"
// import Rol from "./rol.js"
// import UsuarioRol from "./usuariorol.js"
// import Puzzle from "./puzzle.js"
// import Categoria from "./categoria.js"
// import Objeto from "./objeto.js"
// import Caracteristicas from "./caracteristicas.js"
// import ObjetoCaracteristicas from "./objetocaracteristicas.js"

// //Usuario
// Usuario.Rol = Usuario.hasMany(UsuarioRol, {as: 'roles', foreignKey: 'idUsu'});
// Usuario.Categoria = Usuario.hasMany(Categoria, {as: 'categoria', foreignKey: 'idCreador'});

// //Rol
// Rol.Usuario = Rol.hasMany(UsuarioRol, {as: 'usuarios', foreignKey: 'idRol'});

// //UsuarioRol
// UsuarioRol.Usuario = UsuarioRol.belongsTo(Usuario, {as: 'usuarios', foreignKey: 'idUsu'})
// UsuarioRol.Rol = UsuarioRol.belongsTo(Rol, {as: 'rol', foreignKey: 'idRol'})

// //Puzzle
// Puzzle.Categoria = Puzzle.hasMany(Categoria, {as: 'categoria', foreignKey: 'idPuzzle'});

// //Categoria
// Categoria.Puzzle = Categoria.belongsTo(Puzzle, {as: 'puzzle', foreignKey: 'idPuzzle'});
// Categoria.Usuario = Categoria.belongsTo(Usuario, {as: 'usuarios', foreignKey: 'idCreador'});
// Categoria.Objeto = Categoria.hasMany(Objeto, {as: 'objetos', foreignKey: 'idCategoria'});
// Categoria.Caracteristica = Categoria.hasMany(Caracteristicas, {as: 'caracteristicas', foreignKey: 'idCategoria'});

// //Objeto
// Objeto.Categoria = Objeto.hasMany(Categoria, {as: 'categoria', foreignKey: 'id'});
// Objeto.Caracteristica = Objeto.hasMany(ObjetoCaracteristicas, {as: 'caracteristicas', foreignKey: 'idObjetos'});

// //Caracteristica
// Caracteristicas.Categoria = Caracteristicas.hasMany(Caracteristicas, {as: 'categoria', foreignKey: 'id'});
// Caracteristicas.Objeto = Caracteristicas.hasMany(ObjetoCaracteristicas, {as: 'objetos', foreignKey: 'idCaracteristica'});

// //ObjetoCaracteristica
// ObjetoCaracteristicas.Objeto = ObjetoCaracteristicas.belongsTo(Objeto, {as: 'objetos', foreignKey: 'idObjetos'});
// ObjetoCaracteristicas.Caracteristica = ObjetoCaracteristicas.belongsTo(Caracteristicas, {as: 'caracteristicas', foreignKey: 'idCaracteristica'});

// export {
//     Usuario,
//     Rol,
//     UsuarioRol,
//     Puzzle,
//     Categoria,
//     Objeto,
//     Caracteristicas,
//     ObjetoCaracteristicas
// }
import Usuario from "./usuario.js"
import Rol from "./rol.js"
import UsuarioRol from "./usuariorol.js"
import Puzzle from "./puzzle.js"
import Categoria from "./categoria.js"
import Objeto from "./objeto.js"
import Caracteristicas from "./caracteristicas.js"
import ObjetoCaracteristicas from "./objetocaracteristicas.js"

Usuario.Rol = Usuario.hasMany(UsuarioRol, {as: 'roles', foreignKey: 'idUsu'});
Usuario.Categoria = Usuario.hasMany(Categoria, {as: 'categoria', foreignKey: 'idCreador'});

Rol.Usuario = Rol.hasMany(UsuarioRol, {as: 'usuarios', foreignKey: 'idRol'});

UsuarioRol.Usuario = UsuarioRol.belongsTo(Usuario, {as: 'usuarios', foreignKey: 'idUsu'})
UsuarioRol.Rol = UsuarioRol.belongsTo(Rol, {as: 'rol', foreignKey: 'idRol'})

Puzzle.Categoria = Puzzle.hasMany(Categoria, {as: 'categoria', foreignKey: 'idPuzzle'});

Categoria.Puzzle = Categoria.belongsTo(Puzzle, {as: 'puzzle', foreignKey: 'idPuzzle'});
Categoria.Usuario = Categoria.belongsTo(Usuario, {as: 'usuarios', foreignKey: 'idCreador'});
Categoria.Objeto = Categoria.hasMany(Objeto, {as: 'objetos', foreignKey: 'idCategoria'});
Categoria.Caracteristica = Categoria.hasMany(Caracteristicas, {as: 'caracteristicas', foreignKey: 'idCategoria'});

Objeto.Categoria = Objeto.belongsTo(Categoria, {as: 'categoria', foreignKey: 'idCategoria'});
Objeto.Caracteristica = Objeto.hasMany(ObjetoCaracteristicas, {as: 'objetoCaracteristicas', foreignKey: 'idObjetos'});

Caracteristicas.Categoria = Caracteristicas.belongsTo(Categoria, {as: 'categoria', foreignKey: 'idCategoria'});
Caracteristicas.Objeto = Caracteristicas.hasMany(ObjetoCaracteristicas, {as: 'caracteristicaObjetos', foreignKey: 'idCaracteristica'});

// ObjetoCaracteristicas
ObjetoCaracteristicas.Objeto = ObjetoCaracteristicas.belongsTo(Objeto, {as: 'objetos', foreignKey: 'idObjetos'});
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
