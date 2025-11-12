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

        if (contC < 6) throw new Error("Los caracteristicas no cubren a los suficientes objetos");
        return categoria//"Se pueden generar Sudokus";
    };

    crearSudoku = async (id) => {
        let caracC = Array(3).fill(0)
        let caracF = Array(3).fill(0)
        let tabla = Array(9).fill(0)
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

        //ver las carac que hay
        const objetos = categoria.objetos
        const caracteristicas = categoria.caracteristicas

        let caracArray = caracteristicas.map(c => Number(c.id));
        console.log('Caracteristicas', caracArray);

        let caracCont = Array(caracArray.length).fill(0);

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

        let muchasCarac = false
        if (caracArray.length >= 10) {
            muchasCarac
        }

        if (!muchasCarac) {
            //coger la carac mas pequeña y colocarla en la 1º columna
            let peq = caracCont[0]
            for (let i = 0; i < caracCont.length; i++) {
                if (caracCont[i] < peq && caracCont[i] >= 3) {
                    peq = caracArray[i]
                }
            }
            caracC[0] = peq
            console.log('Carac 1', caracC[0])

            //colocar los obj de esa carac
            let objCaracPeq = []
            let caracDeObjPeq = []
            objetos.forEach(obj => {
                const intermedias = obj.objetoCaracteristicas

                intermedias.forEach(oc => {
                    const idCar = Number(oc.idCaracteristica);
                    if (idCar == peq) {
                        objCaracPeq.push(oc.idObjetos)
                        // for (let i = 0; i < oc.length; i++) {
                        //     caracDeObjPeq.push(oc.idObjetos, ":", idCar)
                        // }
                    }
                });
            });
            let seleccionados
            let objElec
            let objElecNum
            //console.log('caracDeObjPeq',caracDeObjPeq)
            if (objCaracPeq.length == 3) {
                for (let i = 0; i < objCaracPeq.length; i++) {
                    tabla[i * 3] = objCaracPeq[i]
                }
            } else if (objCaracPeq.length < 3) throw new Error("Problema al colocar objetos de la 1º carac")
            else {
                //voy a buscar los objetos que menos carac tengan
                console.log('Los objetos de la caracteristica ', objCaracPeq)
                let contCaracOCP = Array(objCaracPeq.length).fill(0)
                objetos.forEach(obj => {
                    const intermedias = obj.objetoCaracteristicas
                    intermedias.forEach(oc => {
                        for (let i = 0; i < objCaracPeq.length; i++) {
                            if (oc.idCaracteristica == objCaracPeq[i]) {
                                contCaracOCP[i]++
                            }
                        }
                    });
                });
                console.log('contCaracOCP', contCaracOCP)

                let combinados = objCaracPeq.map((id, i) => ({ id, count: contCaracOCP[i] }));
                combinados = combinados.filter(e => e.count >= 3);
                if (combinados.length === 0) throw new Error("No hay suficientes objetos con carac validas");
                combinados.sort(() => Math.random() - 0.5);
                combinados.sort((a, b) => a.count - b.count);
                seleccionados = combinados.slice(0, 3);
                objElec = seleccionados.map(e => e.id);
                objElecNum = seleccionados.map(e => e.count);

                console.log('objElec', objElec);
                console.log('objElecNum', objElecNum);

                for (let i = 0; i < objElec.length; i++) {
                    tabla[i * 3] = objElec[i]
                }
            }
            //escoger de los 3 el que tenga menor caracteristicas
            let minValor = Math.min(...objElecNum);
            let indicesMin = objElecNum
                .map((valor, idx) => (valor === minValor ? idx : -1))
                .filter(idx => idx !== -1);

            let idxAleatorio = indicesMin[Math.floor(Math.random() * indicesMin.length)];

            let elegidoId = objElec[idxAleatorio];
            let elegidoNum = objElecNum[idxAleatorio];

            console.log('👉 Elegido ID:', elegidoId);
            console.log('👉 Elegido Num:', elegidoNum);

            //escoger las caracteristicas de elegidoId que no sea la ya puesta
            let caracObjElegido = []
            objetos.forEach(obj => {
                if (obj.id == elegidoId) {
                    const intermedias = obj.objetoCaracteristicas
                    intermedias.forEach(oc => {
                        if (oc.idCaracteristica != caracC[0]) {
                            caracObjElegido.push(oc.idCaracteristica)
                        }
                    });
                }
            });
            console.log('caracObjElegido', caracObjElegido)

            //saber en que fila está el objeto elegio 
            let posicionfila1
            for (let i = 0; i < tabla.length; i++) {
                if (tabla[i] == elegidoId) {
                    posicionfila1 = i / 3
                }
            }

            //elegir de las carac restantes la mejor y poner cualquiera de sus otras caracteristicas
            if (caracObjElegido.length == 1) {
                caracF[posicionfila1] = caracObjElegido[0]
            } else { //si se rompe es por poner aqui una aleatoria
                let caracRan = Math.floor(Math.random() * caracObjElegido.length)
                caracF[posicionfila1] = caracObjElegido[caracRan]
            }
            console.log(caracC)
            console.log(caracF)
            console.log(tabla)

            //escoger los 2 mejores objetos de esa segunda caracteristica
            let posiblesObjNuevos = []
            objetos.forEach(obj => {
                const intermedias = obj.objetoCaracteristicas
                intermedias.forEach(oc => {
                    if (oc.idCaracteristica == caracF[posicionfila1] && oc.idObjetos != tabla[0] && oc.idObjetos != tabla[3] && oc.idObjetos != tabla[6]) {
                        posiblesObjNuevos.push(oc.idObjetos)
                    }
                });

            });
            console.log(posiblesObjNuevos)//Tengo que seguir por aqui

            //busca las 2 mejores caracteristicas donde las otras caracteristicas del los nuevos objetos coincida mejor con los que ya existe

            //rellena con los objetos que quedan teniendo las carac
        } else {

        }
        //console.log(categoria)

        //let sudoku = [caracC, caracF, obj]
        return categoria //sudoku
    }
}

export { CategoriaConnection }