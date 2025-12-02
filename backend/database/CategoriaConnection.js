import { Categoria, Usuario, Puzzle, Objeto, Caracteristicas, ObjetoCaracteristicas } from "../models/association.js";
import { Op, where } from 'sequelize'

class CategoriaConnection {
    getCategorias = async () => {
        let categorias = []
        categorias = await Categoria.findAll({
            include: [{
                model: Puzzle,
                as: 'puzzle'
            }, {
                model: Usuario,
                as: 'usuarios'
            }]
        })

        if (!categorias) throw new Error("No hay categorias")

        categorias = categorias.map(categoria => ({
            id: categoria.id,
            nombre: categoria.nombre,
            idCreador: categoria.idCreador,
            idPuzzle: categoria.idPuzzle
        }))

        return categorias
    }

    getCategoria = async (id) => {
        let categorias = []
        categorias = await Categoria.findOne({
            include: [{
                model: Puzzle,
                as: 'puzzle'
            }, {
                model: Usuario,
                as: 'usuarios'
            }]
        })

        if (!categorias) throw new Error("No existe el usuario")

        categorias = {
            id: categorias.id,
            nombre: categorias.nombre,
            idCreador: categorias.idCreador,
            idPuzzle: categorias.idPuzzle
        }

        return categorias
    }

    getPuzzles = async () => {
        let puzzles = []
        puzzles = await Puzzle.findAll()

        if (!puzzles) throw new Error("No hay puzzles")
        puzzles = puzzles.map(puzzle => ({
            id: puzzle.id,
            nombre: puzzle.nombre
        }))

        return puzzles
    }

    postCategoria = async (categoria) => {
        const { nombre, idCreador, idPuzzle } = categoria
        const newCategoria = await Categoria.create({
            nombre,
            idCreador,
            idPuzzle
        })

        const categoriaCreada = {
            id: newCategoria.id,
            nombre: newCategoria.nombre,
            idCreador: newCategoria.idCreador,
            idPuzzle: newCategoria.idPuzzle
        }

        return categoriaCreada
    }

    putCategoria = async (id, categoria) => {
        await Categoria.update({
            nombre: categoria.nombre
        }, {
            where: { id }
        })

        const categoriaActualizada = await Categoria.findOne({ where: { id } })
        if (!categoriaActualizada) throw new Error("No se pudo actualizar la categoria")

        return categoriaActualizada
    }

    deleteCategoria = async (id) => {
        const categoriaEliminada = await Categoria.destroy({ where: { id } })
        if (!categoriaEliminada) throw new Error("No se pudo eliminar la categoria")

        return 'Categoria eliminada correctamente'
    }

    comprobarSiEsFuncional = async (id) => {
        const categoria = await Categoria.findOne({
            where: { id },
            include: [
                {
                    model: Objeto,
                    as: 'objetos',
                    include: [{
                        model: ObjetoCaracteristicas,
                        as: 'objetoCaracteristicas'
                    }],
                },
                {
                    model: Caracteristicas,
                    as: 'caracteristicas'
                }
            ]
        });
        console.log(categoria)

        if (!categoria) throw new Error("No existe la categoría");

        const objetos = categoria.objetos
        const caracteristicas = categoria.caracteristicas

        console.log(objetos.length);
        console.log(caracteristicas.length);

        if (objetos.length < 9 || caracteristicas.length < 6) throw new Error("Se necesitan al menos 9 objetos y 6 caracteristicas");

        const caracArray = caracteristicas.map(c => Number(c.id));
        console.log(caracArray);

        const caracCont = Array(caracArray.length).fill(0);
        console.log(caracCont);

        objetos.forEach(obj => {
            const intermedias = obj.objetoCaracteristicas

            intermedias.forEach(oc => {
                const idCar = Number(oc.idCaracteristica);
                for (let i = 0; i < caracArray.length; i++) {
                    if (idCar === caracArray[i]) {
                        caracCont[i]++;
                    }
                }
            });
        });

        let contC = 0;
        for (let i = 0; i < caracCont.length; i++) {
            if (caracCont[i] >= 3) {
                contC++;
            }
        }

        if (contC < 6) throw new Error("Los caracteristicas no cubren a los suficientes objetos (Accede a objetos -> editar para añadir caracteristicas)");
        return "Se pueden generar Sudokus";
    };

    crearSudoku = async (idCategoria) => {
        let intentos = 0;
        const maxIntentos = 5;
        let resultado = null;

        const combinar = (lista, tamaño) => {
            const res = [];
            const actual = [];
            const n = lista.length;

            const generar = (inicio, profundidad) => {
                if (profundidad === tamaño) {
                    res.push([...actual]);
                    return;
                }
                let i = inicio;
                while (i < n) {
                    actual.push(lista[i]);
                    generar(i + 1, profundidad + 1);
                    actual.pop();
                    i++;
                }
            };

            generar(0, 0);
            return res;
        };

        const mezclar = (a) => {
            let i = a.length - 1;
            while (i > 0) {
                const j = Math.floor(Math.random() * (i + 1));
                const t = a[i];
                a[i] = a[j];
                a[j] = t;
                i--;
            }
            return a;
        };

        const asignarTabla = (mapa, filas, columnas) => {
            const tabla = Array(9).fill(null);
            const usados = new Set();
            const orden = Array.from({ length: 9 }, (_, i) => i);
            const estado = { ok: false };

            const resolver = (pos) => {
                if (pos === 9) {
                    estado.ok = true;
                    return;
                }

                const celda = orden[pos];
                const f = Math.floor(celda / 3);
                const c = celda % 3;
                const idFila = filas[f];
                const idCol = columnas[c];

                const posibles = mapa[idFila] && mapa[idFila][idCol] ? [...mapa[idFila][idCol]] : [];
                mezclar(posibles);

                let i = 0;
                let seguir = true;
                while (i < posibles.length && seguir) {
                    const objId = posibles[i];
                    if (!usados.has(objId)) {
                        usados.add(objId);
                        tabla[celda] = objId;
                        resolver(pos + 1);

                        if (!estado.ok) {
                            usados.delete(objId);
                            tabla[celda] = null;
                            i++;
                        } else {
                            seguir = false;
                        }
                    } else {
                        i++;
                    }
                }
            };

            resolver(0);
            return estado.ok ? [...tabla] : null;
        };

        while (intentos < maxIntentos && !resultado) {
            try {
                const categoria = await Categoria.findOne({
                    where: { id: idCategoria },
                    include: [
                        {
                            model: Objeto,
                            as: "objetos",
                            include: [{ model: ObjetoCaracteristicas, as: "objetoCaracteristicas" }]
                        },
                        { model: Caracteristicas, as: "caracteristicas" }
                    ]
                });

                if (!categoria) {
                    intentos++;
                    continue;
                }

                const objetos = categoria.objetos || [];
                const caracs = categoria.caracteristicas || [];
                const idsCaracs = caracs.map(c => Number(c.id));

                const mapa = {};
                let i = 0;
                while (i < idsCaracs.length) {
                    const f = idsCaracs[i];
                    mapa[f] = {};
                    let j = 0;
                    while (j < idsCaracs.length) {
                        mapa[f][idsCaracs[j]] = [];
                        j++;
                    }
                    i++;
                }

                let o = 0;
                while (o < objetos.length) {
                    const obj = objetos[o];
                    const objId = obj.id;
                    const caracsObj = (obj.objetoCaracteristicas || []).map(c => Number(c.idCaracteristica));

                    let a = 0;
                    while (a < caracsObj.length) {
                        let b = 0;
                        while (b < caracsObj.length) {
                            const f = caracsObj[a];
                            const c = caracsObj[b];
                            if (mapa[f] && mapa[f][c] && !mapa[f][c].includes(objId)) {
                                mapa[f][c].push(objId);
                            }
                            b++;
                        }
                        a++;
                    }

                    o++;
                }

                const pocasCaracs = caracs.length <= 10 && objetos.length <= 12;

                if (pocasCaracs) {
                    const tripletes = combinar(idsCaracs, 3);
                    mezclar(tripletes);

                    let encontrado = false;
                    let f = 0;

                    while (f < tripletes.length && !encontrado) {
                        const filas = tripletes[f];

                        let validoFilas = true;
                        let x = 0;
                        while (x < filas.length && validoFilas) {
                            const id = filas[x];
                            const cnt = objetos.filter(o =>
                                (o.objetoCaracteristicas || []).some(c => Number(c.idCaracteristica) === id)
                            ).length;
                            if (cnt < 3) validoFilas = false;
                            x++;
                        }
                        if (!validoFilas) {
                            f++;
                            continue;
                        }

                        let c = 0;
                        while (c < tripletes.length && !encontrado) {
                            const columnas = tripletes[c];

                            const superpuestos = filas.some(x => columnas.includes(x));
                            if (superpuestos) {
                                c++;
                                continue;
                            }

                            let validoColumnas = true;
                            let y = 0;
                            while (y < columnas.length && validoColumnas) {
                                const id = columnas[y];
                                const cnt = objetos.filter(o =>
                                    (o.objetoCaracteristicas || []).some(ca => Number(ca.idCaracteristica) === id)
                                ).length;
                                if (cnt < 3) validoColumnas = false;
                                y++;
                            }
                            if (!validoColumnas) {
                                c++;
                                continue;
                            }

                            let combinacionOk = true;
                            let fi = 0;
                            while (fi < 3 && combinacionOk) {
                                let ci = 0;
                                while (ci < 3 && combinacionOk) {
                                    const lista = mapa[filas[fi]][columnas[ci]];
                                    if (!lista || lista.length === 0) combinacionOk = false;
                                    ci++;
                                }
                                fi++;
                            }

                            if (!combinacionOk) {
                                c++;
                                continue;
                            }

                            const tabla = asignarTabla(mapa, filas, columnas);
                            if (tabla) {
                                resultado = [columnas, filas, tabla];
                                encontrado = true;
                            } else {
                                c++;
                            }
                        }

                        f++;
                    }

                    if (!resultado) {
                        intentos++;
                        continue;
                    }

                } else {
                    const caracsUtiles = caracs
                        .filter(c => {
                            const id = Number(c.id);
                            const cnt = objetos.filter(o =>
                                (o.objetoCaracteristicas || []).some(x => Number(x.idCaracteristica) === id)
                            ).length;
                            return cnt >= 3;
                        })
                        .map(c => Number(c.id));

                    if (caracsUtiles.length < 3) {
                        intentos++;
                        continue;
                    }

                    const columnasPosibles = combinar(caracsUtiles, 3);
                    mezclar(columnasPosibles);

                    let encontrado = false;
                    let k = 0;

                    while (k < columnasPosibles.length && !encontrado) {
                        const columnas = columnasPosibles[k];

                        const filasPosibles = combinar(idsCaracs, 3);
                        mezclar(filasPosibles);

                        let l = 0;
                        while (l < filasPosibles.length && !encontrado) {
                            const filas = filasPosibles[l];

                            const superpuestos = filas.some(x => columnas.includes(x));
                            if (superpuestos) {
                                l++;
                                continue;
                            }

                            let combinacionOk = true;
                            let fi = 0;
                            while (fi < 3 && combinacionOk) {
                                let ci = 0;
                                while (ci < 3 && combinacionOk) {
                                    const lista = mapa[filas[fi]][columnas[ci]];
                                    if (!lista || lista.length === 0) combinacionOk = false;
                                    ci++;
                                }
                                fi++;
                            }

                            if (!combinacionOk) {
                                l++;
                                continue;
                            }

                            const tabla = asignarTabla(mapa, filas, columnas);
                            if (tabla) {
                                resultado = [columnas, filas, tabla];
                                encontrado = true;
                            } else {
                                l++;
                            }
                        }

                        k++;
                    }

                    if (!resultado) {
                        intentos++;
                        continue;
                    }
                }

            } catch (e) {
                intentos++;
                continue;
            }
        }

        if (!resultado) {
            throw new Error(`No se pudo generar un sudoku válido después de ${maxIntentos}`);
        }

        return resultado;
    };


    verResolucionSudoku = async (caracF, caracC, tabla, usuarioId) => {
        console.log('caracF', caracF);
        console.log('caracC', caracC);
        console.log('tabla', tabla);
        console.log('usuarioId', usuarioId);

        let aciertos = 0;
        const totalCeldas = tabla.length;

        // Validar que los parámetros sean válidos
        if (!caracF || !caracC || !tabla || !usuarioId) {
            throw new Error("Parámetros inválidos para verificar la resolución del sudoku");
        }

        if (caracF.length !== 3 || caracC.length !== 3 || tabla.length !== 9) {
            throw new Error("Las dimensiones del sudoku no son correctas");
        }

        console.log('caracF:', caracF);
        console.log('caracC:', caracC);
        console.log('tabla:', tabla);

        // Recorrer cada celda de la tabla
        for (let i = 0; i < tabla.length; i++) {
            const objId = tabla[i];
            const filaIdx = Math.floor(i / 3);
            const colIdx = i % 3;
            const caracFila = caracF[filaIdx];
            const caracCol = caracC[colIdx];

            // Buscar el objeto en la base de datos
            const objeto = await Objeto.findOne({
                where: { id: objId },
                include: [{
                    model: ObjetoCaracteristicas,
                    as: 'objetoCaracteristicas'
                }]
            });

            if (!objeto) {
                continue;
            }

            // Verificar si el objeto tiene ambas características
            const tieneCaracFila = objeto.objetoCaracteristicas.some(oc => oc.idCaracteristica === caracFila);
            const tieneCaracCol = objeto.objetoCaracteristicas.some(oc => oc.idCaracteristica === caracCol);

            if (tieneCaracFila && tieneCaracCol) {
                aciertos++;
            }
        }

        let puntosGanados = aciertos;

        if (aciertos === totalCeldas) {
            puntosGanados += 1;
        }

        const usuario = await Usuario.findOne({ where: { id: usuarioId } });
        if (!usuario) {
            throw new Error("El usuario no existe");
        }

        const puntosActuales = usuario.puntuacion;
        await Usuario.update(
            { puntuacion: puntosActuales + puntosGanados },
            { where: { id: usuarioId } }
        );

        const resultado = {
            aciertos,
            totalCeldas,
            porcentaje: Math.round((aciertos / totalCeldas) * 100),
            puntosGanados,
            completado: aciertos === totalCeldas,
            puntosUsuario: puntosActuales + puntosGanados
        };

        return resultado;
    }
}

export { CategoriaConnection }