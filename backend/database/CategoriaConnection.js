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

        if (contC < 6) throw new Error("Los caracteristicas no cubren a los suficientes objetos");
        return "Se pueden generar Sudokus";
    };

    crearSudoku = async (id) => {
        let intentosGenerales = 0;
        const maxIntentosGenerales = 5;
        let sudokuCompleto = null;

        while (intentosGenerales < maxIntentosGenerales && !sudokuCompleto) {
            try {
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

                const objetos = categoria.objetos;
                const caracteristicas = categoria.caracteristicas;

                // algoritmo cat pequeñas (objetos <= 12 y carac <= 10)
                if (objetos.length <= 12 && caracteristicas.length <= 10) {

                    let caracArray = caracteristicas.map(c => Number(c.id));
                    let sudokuValido = false;
                    let intentosCombinacion = 0;
                    const maxIntentosCombinacion = 100;

                    while (intentosCombinacion < maxIntentosCombinacion && !sudokuValido) {

                        let caracC = [];
                        let caracF = [];

                        // Seleccionar 3 carac random para caracC
                        let indices = [];
                        while (indices.length < 3 && indices.length < caracArray.length) {
                            let idx = Math.floor(Math.random() * caracArray.length);
                            if (!indices.includes(idx)) {
                                indices.push(idx);
                            }
                        }
                        caracC = indices.map(i => caracArray[i]);

                        // Seleccionar 3 carac random para caracF
                        indices = [];
                        while (indices.length < 3 && indices.length < caracArray.length) {
                            let idx = Math.floor(Math.random() * caracArray.length);
                            if (!indices.includes(idx) && !caracC.includes(caracArray[idx])) {
                                indices.push(idx);
                            }
                        }
                        caracF = indices.map(i => caracArray[i]);

                        // Si no hay suficientes características distintas, rellenar con las disponibles
                        if (caracF.length < 3) {
                            for (let carac of caracteristicas) {
                                if (!caracC.includes(carac.id) && !caracF.includes(carac.id) && caracF.length < 3) {
                                    caracF.push(carac.id);
                                }
                            }
                        }

                        if (caracC.length < 3 || caracF.length < 3) {
                            console.log(`No hay suficientes características distintas (C: ${caracC.length}, F: ${caracF.length})`);
                            intentosCombinacion++;
                            continue;
                        }

                            console.log('caracC', caracC);
                            console.log('caracF', caracF);
                        let tabla = Array(9).fill(0);
                        let combinacionValida = true;

                        for (let fila = 0; fila < 3; fila++) {
                            for (let col = 0; col < 3; col++) {
                                const idx = fila * 3 + col;
                                const caracFila = caracF[fila];
                                const caracCol = caracC[col];

                                // Buscar un objeto que tenga ambas carac y no esté en la tabla
                                let objValido = objetos.find(o =>
                                    !tabla.includes(o.id) &&
                                    o.objetoCaracteristicas.some(oc => oc.idCaracteristica === caracFila) &&
                                    o.objetoCaracteristicas.some(oc => oc.idCaracteristica === caracCol)
                                );

                                if (objValido) {
                                    tabla[idx] = objValido.id;
                                    console.log(`Celda [${idx}] (F${fila},C${col}): Objeto ${objValido.id} ✅`);
                                } else {
                                    console.log(`Celda [${idx}] (F${fila},C${col}): ❌ No hay objeto válido`);
                                    combinacionValida = false;
                                    break;
                                }
                            }
                            if (!combinacionValida) break;
                        }

                        if (combinacionValida) {
                            console.log('caracC', caracC);
                            console.log('caracF', caracF);
                            console.log('tabla', tabla);

                            let esValido = true;
                            for (let i = 0; i < tabla.length; i++) {
                                const objId = tabla[i];
                                const filaIdx = Math.floor(i / 3);
                                const colIdx = i % 3;
                                const caracFila = caracF[filaIdx];
                                const caracCol = caracC[colIdx];

                                let objEncontrado = objetos.find(o => o.id === objId);
                                if (!objEncontrado) {
                                    esValido = false;
                                    break;
                                }

                                const tieneCaracFila = objEncontrado.objetoCaracteristicas.some(oc => oc.idCaracteristica === caracFila);
                                const tieneCaracCol = objEncontrado.objetoCaracteristicas.some(oc => oc.idCaracteristica === caracCol);

                                if (!tieneCaracFila || !tieneCaracCol) {
                                    esValido = false;
                                    break;
                                }
                            }

                            if (esValido) {
                                sudokuCompleto = [caracC, caracF, tabla];
                                break;
                            }
                        }

                        intentosCombinacion++;
                    }

                    if (!sudokuCompleto && intentosCombinacion >= maxIntentosCombinacion) {
                        throw new Error(`No se encontró una combinación válida después de ${maxIntentosCombinacion} intentos`);
                    }

                } else {
                    // algoritmo cat grandes

                    let caracC = Array(3).fill(0);
                    let caracF = Array(3).fill(0);
                    let tabla = Array(9).fill(0);

                    let caracArray = caracteristicas.map(c => Number(c.id));
                    console.log('Caracteristicas', caracArray);

                    let caracCont = Array(caracArray.length).fill(0);

                    objetos.forEach(obj => {
                        const intermedias = obj.objetoCaracteristicas;
                        intermedias.forEach(oc => {
                            const idCar = Number(oc.idCaracteristica);
                            for (let i = 0; i < caracArray.length; i++) {
                                if (idCar === caracArray[i]) {
                                    caracCont[i]++;
                                }
                            }
                        });
                    });

                    console.log('Conteo de características:', caracCont);

                    // Seleccionar la característica con al menos 3 objetos y menor cantidad
                    let minIndex = -1;
                    let minValue = Infinity;

                    for (let i = 0; i < caracCont.length; i++) {
                        if (caracCont[i] >= 3 && caracCont[i] < minValue) {
                            minValue = caracCont[i];
                            minIndex = i;
                        }
                    }

                    if (minIndex === -1) {
                        throw new Error("No hay características con al menos 3 objetos");
                    }

                    caracC[0] = caracArray[minIndex];
                    console.log('Carac 1:', caracC[0], '(con', caracCont[minIndex], 'objetos)');

                    let objCaracPeq = [];
                    objetos.forEach(obj => {
                        const intermedias = obj.objetoCaracteristicas;
                        intermedias.forEach(oc => {
                            const idCar = Number(oc.idCaracteristica);
                            if (idCar == caracC[0]) {
                                objCaracPeq.push(oc.idObjetos);
                            }
                        });
                    });

                    console.log('Objetos con carac 1:', objCaracPeq);

                    // Seleccionar 3 objetos de los que tienen la primera carac
                    let seleccionados;
                    let objElec;
                    let objElecNum;

                    if (objCaracPeq.length == 3) {
                        for (let i = 0; i < objCaracPeq.length; i++) {
                            tabla[i * 3] = objCaracPeq[i];
                        }
                        objElec = objCaracPeq;
                        objElecNum = Array(3).fill(3);
                        console.log('objElec (3 objetos):', objElec);
                        console.log('objElecNum:', objElecNum);
                    } else if (objCaracPeq.length < 3) {
                        throw new Error("Problema al colocar objetos de la 1º carac");
                    } else {
                        console.log('Los objetos de la caracteristica ', objCaracPeq);
                        let contCaracOCP = Array(objCaracPeq.length).fill(0);
                        objetos.forEach(obj => {
                            const intermedias = obj.objetoCaracteristicas;
                            intermedias.forEach(oc => {
                                for (let i = 0; i < objCaracPeq.length; i++) {
                                    if (oc.idObjetos == objCaracPeq[i]) {
                                        contCaracOCP[i]++;
                                    }
                                }
                            });
                        });
                        console.log('contCaracOCP', contCaracOCP);

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
                            tabla[i * 3] = objElec[i];
                        }
                    }

                    // Seleccionar la segunda carac y colocar objetos
                    let minValor = Math.min(...objElecNum);
                    let indicesMin = objElecNum
                        .map((valor, idx) => (valor === minValor ? idx : -1))
                        .filter(idx => idx !== -1);

                    let idxAleatorio = indicesMin[Math.floor(Math.random() * indicesMin.length)];

                    let elegidoId = objElec[idxAleatorio];
                    let elegidoNum = objElecNum[idxAleatorio];

                    console.log('👉 Elegido ID:', elegidoId);
                    console.log('👉 Elegido Num:', elegidoNum);

                    let caracObjElegido = [];
                    objetos.forEach(obj => {
                        if (obj.id == elegidoId) {
                            const intermedias = obj.objetoCaracteristicas;
                            intermedias.forEach(oc => {
                                if (oc.idCaracteristica != caracC[0]) {
                                    caracObjElegido.push(oc.idCaracteristica);
                                }
                            });
                        }
                    });
                    console.log('caracObjElegido', caracObjElegido);

                    let posicionfila1;
                    for (let i = 0; i < tabla.length; i++) {
                        if (tabla[i] == elegidoId) {
                            posicionfila1 = i / 3;
                        }
                    }

                    // Elegir aleatoriamente una carac de las posibles para la fila
                    if (caracObjElegido.length == 1) {
                        caracF[posicionfila1] = caracObjElegido[0];
                    } else {
                        let caracRan = Math.floor(Math.random() * caracObjElegido.length);
                        caracF[posicionfila1] = caracObjElegido[caracRan];
                    }
                    console.log(caracC);
                    console.log(caracF);
                    console.log(tabla);

                    let posiblesObjNuevos = [];
                    objetos.forEach(obj => {
                        const intermedias = obj.objetoCaracteristicas;
                        intermedias.forEach(oc => {
                            if (oc.idCaracteristica == caracF[posicionfila1] && oc.idObjetos != tabla[0] && oc.idObjetos != tabla[3] && oc.idObjetos != tabla[6]) {
                                posiblesObjNuevos.push(oc.idObjetos);
                            }
                        });
                    });
                    console.log('posiblesObjNuevos', posiblesObjNuevos);

                    // Colocar los nuevos objetos en la tabla
                    if (posiblesObjNuevos.length < 2) throw new Error("Hay un error a la hora de colocar los objetos de la 2º caracteristica elegida");
                    else if (posiblesObjNuevos.length == 2) {
                        for (let i = 0; i < tabla.length; i++) {
                            if (tabla[i] == elegidoId) {
                                tabla[i + 1] = posiblesObjNuevos[0];
                                tabla[i + 2] = posiblesObjNuevos[1];
                            }
                        }
                    } else {
                        // más de 2 objetos posibles
                        let objElecSinElec = objElec.filter(oe => oe !== elegidoId);
                        console.log('objElecSinElec', objElecSinElec);

                        // obtener carac de los objetos seleccionados sin el elegido
                        let caracOESE1 = [];
                        objetos.forEach(obj => {
                            if (obj.id == objElecSinElec[0]) {
                                const intermedias = obj.objetoCaracteristicas;
                                intermedias.forEach(oc => {
                                    if (oc.idCaracteristica != caracC[0] && oc.idCaracteristica != caracF[0] && oc.idCaracteristica != caracF[1] && oc.idCaracteristica != caracF[2]) {
                                        caracOESE1.push(oc.idCaracteristica);
                                    }
                                });
                            }
                        });

                        let caracOESE2 = [];
                        objetos.forEach(obj => {
                            if (obj.id == objElecSinElec[1]) {
                                const intermedias = obj.objetoCaracteristicas;
                                intermedias.forEach(oc => {
                                    if (oc.idCaracteristica != caracC[0] && oc.idCaracteristica != caracF[0] && oc.idCaracteristica != caracF[1] && oc.idCaracteristica != caracF[2]) {
                                        caracOESE2.push(oc.idCaracteristica);
                                    }
                                });
                            }
                        });

                        console.log('caracOESE1', caracOESE1);
                        console.log('caracOESE2', caracOESE2);
                        console.log(posicionfila1);

                        // buscar combinaciones válidas
                        objetos.forEach(obj => {
                            const intermedias = obj.objetoCaracteristicas;
                            for (let i = 0; i < posiblesObjNuevos.length; i++) {
                                if (obj.id == posiblesObjNuevos[i]) {
                                    let caracSinUsadas = [];
                                    intermedias.forEach(oc => {
                                        if (oc.idObjetos == posiblesObjNuevos[i] && oc.idCaracteristica != caracF[0] && oc.idCaracteristica != caracF[1] && oc.idCaracteristica != caracF[2] && oc.idCaracteristica != caracC[0]) {
                                            caracSinUsadas.push(oc.idCaracteristica);
                                        }
                                    });
                                    console.log(posiblesObjNuevos[i]);
                                    console.log(caracSinUsadas);
                                    caracSinUsadas.forEach(csu => {
                                        for (let j = 0; j < caracOESE1.length; j++) {
                                            for (let l = 0; l < caracOESE2.length; l++) {
                                                if ((csu != caracOESE1[j]) && (csu != caracOESE2[l])) {
                                                    tabla[posicionfila1 * 3 + 1] = posiblesObjNuevos[i];
                                                    caracC[1] = csu;
                                                    if (posicionfila1 == 0) {
                                                        caracF[1] = caracOESE1[j];
                                                        caracF[2] = caracOESE2[l];
                                                    } else if (posicionfila1 == 1) {
                                                        caracF[0] = caracOESE1[j];
                                                        caracF[2] = caracOESE2[l];
                                                    } else if (posicionfila1 == 2) {
                                                        caracF[0] = caracOESE1[j];
                                                        caracF[1] = caracOESE2[l];
                                                    }
                                                }
                                            }
                                        }
                                    });
                                }
                            }
                        });
                        console.log('caracC', caracC);
                        console.log('caracF', caracF);
                        console.log('tabla', tabla);

                        // colocar el último objeto
                        objetos.forEach(obj => {
                            const intermedias = obj.objetoCaracteristicas;
                            intermedias.forEach(oc => {
                                if (oc.idCaracteristica == caracC[1] && !tabla.includes(oc.idObjetos)) {
                                    intermedias.forEach(oc1 => {
                                        if (oc1.idCaracteristica == caracF[1]) {
                                            tabla[4] = oc1.idObjetos;
                                        }
                                    });
                                }
                            });
                        });

                        objetos.forEach(obj => {
                            const intermedias = obj.objetoCaracteristicas;
                            intermedias.forEach(oc => {
                                if (oc.idCaracteristica == caracC[1] && !tabla.includes(oc.idObjetos)) {
                                    intermedias.forEach(oc1 => {
                                        if (oc1.idCaracteristica == caracF[2]) {
                                            tabla[7] = oc1.idObjetos;
                                        }
                                    });
                                }
                            });
                        });
                        console.log('tabla1', tabla);

                        // colocar la última caracC y completar tabla
                        let idsCarac = [];
                        caracteristicas.forEach(carac => {
                            if (!caracC.includes(carac.id) && !caracF.includes(carac.id)) {
                                idsCarac.push(carac.id);
                            }
                        });

                        const conteo = {};
                        for (const obj of categoria.objetos) {
                            for (const oc of obj.objetoCaracteristicas) {
                                const id = oc.idCaracteristica;
                                conteo[id] = (conteo[id] || 0) + 1;
                            }
                        }

                        const ultimasCarac = idsCarac.filter(id => conteo[id] >= 3);
                        console.log(ultimasCarac);

                        // elegir la caracC que complete la tabla
                        ultimasCarac.forEach(caracFinal => {
                            objetos.forEach(obj => {
                                const intermedias = obj.objetoCaracteristicas;
                                intermedias.forEach(oc => {
                                    if (oc.idCaracteristica == caracFinal && !tabla.includes(oc.idObjetos)) {
                                        intermedias.forEach(oc1 => {
                                            if (oc1.idCaracteristica == caracF[0]) {
                                                intermedias.forEach(oc2 => {
                                                    if (oc2.idCaracteristica == caracF[1]) {
                                                        intermedias.forEach(oc3 => {
                                                            if (oc3.idCaracteristica == caracF[2]) {
                                                                caracC[2] = caracFinal;
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            });
                        });
                        console.log(caracC);
                        console.log(caracF);

                        objetos.forEach(obj => {
                            const intermedias = obj.objetoCaracteristicas;
                            intermedias.forEach(oc => {
                                if (oc.idCaracteristica == caracC[2] && !tabla.includes(oc.idObjetos)) {
                                    intermedias.forEach(oc1 => {
                                        if (oc1.idCaracteristica == caracF[0]) {
                                            tabla[2] = oc1.idObjetos;
                                        }
                                    });
                                }
                            });
                        });

                        objetos.forEach(obj => {
                            const intermedias = obj.objetoCaracteristicas;
                            intermedias.forEach(oc => {
                                if (oc.idCaracteristica == caracC[2] && !tabla.includes(oc.idObjetos)) {
                                    intermedias.forEach(oc1 => {
                                        if (oc1.idCaracteristica == caracF[1]) {
                                            tabla[5] = oc1.idObjetos;
                                        }
                                    });
                                }
                            });
                        });

                        objetos.forEach(obj => {
                            const intermedias = obj.objetoCaracteristicas;
                            intermedias.forEach(oc => {
                                if (oc.idCaracteristica == caracC[2] && !tabla.includes(oc.idObjetos)) {
                                    intermedias.forEach(oc1 => {
                                        if (oc1.idCaracteristica == caracF[2]) {
                                            tabla[8] = oc1.idObjetos;
                                        }
                                    });
                                }
                            });
                        });

                        console.log('tabla pre-fix', tabla);

                        caracC = caracC.filter(c => c !== 0);
                        caracF = caracF.filter(c => c !== 0);

                        // completar caracC y caracF si falta alguno
                        while (caracC.length < 3 && caracteristicas.length > 0) {
                            const caraFaltante = caracteristicas.find(c => !caracC.includes(c.id) && !caracF.includes(c.id));
                            if (caraFaltante) caracC.push(caraFaltante.id);
                            else break;
                        }

                        while (caracF.length < 3 && caracteristicas.length > 0) {
                            const caraFaltante = caracteristicas.find(c => !caracC.includes(c.id) && !caracF.includes(c.id));
                            if (caraFaltante) caracF.push(caraFaltante.id);
                            else break;
                        }

                        const cerosEnTabla = tabla.filter(x => x === 0).length;
                        if (cerosEnTabla > 0) {
                            const objetosUsados = tabla.filter(x => x !== 0);
                            const objetosDisponibles = posiblesObjNuevos.filter(obj => !objetosUsados.includes(obj));

                            let idxObjeto = 0;
                            for (let i = 0; i < tabla.length; i++) {
                                if (tabla[i] === 0 && idxObjeto < objetosDisponibles.length) {
                                    tabla[i] = objetosDisponibles[idxObjeto++];
                                }
                            }
                        }

                        console.log('tabla post-fix', tabla);
                    }

                    // validar sudoku
                    let intentos = 0;
                    const maxIntentos = 100;
                    let sudokuValido = false;

                    while (intentos < maxIntentos && !sudokuValido) {
                        sudokuValido = true;

                        for (let i = 0; i < tabla.length; i++) {
                            const objId = tabla[i];
                            const filaIdx = Math.floor(i / 3);
                            const colIdx = i % 3;
                            const caracFila = caracF[filaIdx];
                            const caracCol = caracC[colIdx];

                            console.log(`Celda [${i}] (Fila ${filaIdx}, Col ${colIdx}): Objeto ${objId}, caracF=${caracFila}, caracC=${caracCol}`);

                            let objEncontrado = objetos.find(o => o.id === objId);
                            if (!objEncontrado) {
                                sudokuValido = false;
                                continue;
                            }

                            const tieneCaracFila = objEncontrado.objetoCaracteristicas.some(oc => oc.idCaracteristica === caracFila);
                            const tieneCaracCol = objEncontrado.objetoCaracteristicas.some(oc => oc.idCaracteristica === caracCol);

                            if (!tieneCaracFila || !tieneCaracCol) {
                                sudokuValido = false;

                                let objValido = objetos.find(o =>
                                    !tabla.includes(o.id) &&
                                    o.objetoCaracteristicas.some(oc => oc.idCaracteristica === caracFila) &&
                                    o.objetoCaracteristicas.some(oc => oc.idCaracteristica === caracCol)
                                );

                                if (objValido) {
                                    tabla[i] = objValido.id;
                                } else {

                                    let encontroAlternativa = false;

                                    for (let c of caracteristicas) {
                                        if (!caracC.includes(c.id) && !caracF.includes(c.id)) {
                                            const conteoCarac = objetos.filter(o =>
                                                o.objetoCaracteristicas.some(oc => oc.idCaracteristica === c.id)
                                            ).length;

                                            if (conteoCarac >= 3) {
                                                let objConNuevaCol = objetos.find(o =>
                                                    !tabla.includes(o.id) &&
                                                    o.objetoCaracteristicas.some(oc => oc.idCaracteristica === caracFila) &&
                                                    o.objetoCaracteristicas.some(oc => oc.idCaracteristica === c.id)
                                                );

                                                if (objConNuevaCol) {
                                                    caracC[colIdx] = c.id;
                                                    tabla[i] = objConNuevaCol.id;
                                                    encontroAlternativa = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }

                                    if (!encontroAlternativa) {
                                        for (let c of caracteristicas) {
                                            if (!caracC.includes(c.id) && !caracF.includes(c.id)) {
                                                const conteoCarac = objetos.filter(o =>
                                                    o.objetoCaracteristicas.some(oc => oc.idCaracteristica === c.id)
                                                ).length;

                                                if (conteoCarac >= 3) {
                                                    let objConNuevaFila = objetos.find(o =>
                                                        !tabla.includes(o.id) &&
                                                        o.objetoCaracteristicas.some(oc => oc.idCaracteristica === c.id) &&
                                                        o.objetoCaracteristicas.some(oc => oc.idCaracteristica === caracCol)
                                                    );

                                                    if (objConNuevaFila) {
                                                        caracF[filaIdx] = c.id;
                                                        tabla[i] = objConNuevaFila.id;
                                                        encontroAlternativa = true;
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    if (!encontroAlternativa) {
                                        throw new Error(`Celda [${i}] sin solución posible - Reiniciando generación`);
                                    }
                                }
                            }
                        }

                        intentos++;
                    }

                    if (!sudokuValido) {
                        intentosGenerales++;
                        continue;
                    }
                    console.log('caracC Final:', caracC);
                    console.log('caracF Final:', caracF);
                    console.log('tabla Final:', tabla);

                    sudokuCompleto = [caracC, caracF, tabla];
                }

            } catch (error) {
                intentosGenerales++;
            }
        }

        if (!sudokuCompleto) {
            throw new Error(`No se pudo generar un sudoku válido después de ${maxIntentosGenerales} intentos generales`);
        }

        return sudokuCompleto;
    }

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
            } else {
                if (!tieneCaracFila) {
                    console.log(`Falta característica de fila: ${caracFila}`);
                }
                if (!tieneCaracCol) {
                    console.log(`Falta característica de columna: ${caracCol}`);
                }
            }
        }

        // Actualizar puntos del usuario
        let puntosGanados = aciertos;

        // Bonus si acertó todas las celdas
        if (aciertos === totalCeldas) {
            puntosGanados += 1;
        }

        // Actualizar el usuario con los nuevos puntos
        const usuario = await Usuario.findOne({ where: { id: usuarioId } });
        if (!usuario) {
            throw new Error("El usuario no existe");
        }

        const puntosActuales = usuario.puntos || 0;
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