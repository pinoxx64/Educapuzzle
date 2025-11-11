// import { Categoria, Usuario, Puzzle, Objeto, Caracteristicas, ObjetoCaracteristicas } from "../models/association.js";
// import { Op, where } from 'sequelize'

// class CategoriaConnection {
//     getCategorias = async () => {
//         let categorias = []
//         categorias = await Categoria.findAll({
//             include: [{
//                 model: Puzzle,
//                 as: 'puzzle'
//             }, {
//                 model: Usuario,
//                 as: 'usuarios'
//             }]
//         })

//         if (!categorias) throw new Error("No hay categorias")

//         categorias = categorias.map(categoria => ({
//             id: categoria.id,
//             nombre: categoria.nombre,
//             idCreador: categoria.idCreador,
//             idPuzzle: categoria.idPuzzle
//         }))

//         return categorias
//     }

//     getCategoria = async (id) => {
//         let categorias = []
//         categorias = await Categoria.findOne({
//             include: [{
//                 model: Puzzle,
//                 as: 'puzzle'
//             }, {
//                 model: Usuario,
//                 as: 'usuarios'
//             }]
//         })

//         if (!categorias) throw new Error("No existe el usuario")

//         categorias = {
//             id: categorias.id,
//             nombre: categorias.nombre,
//             idCreador: categorias.idCreador,
//             idPuzzle: categorias.idPuzzle
//         }

//         return categorias
//     }

//     getPuzzles = async () => {
//         let puzzles = []
//         puzzles = await Puzzle.findAll()

//         if (!puzzles) throw new Error("No hay puzzles")
//         puzzles = puzzles.map(puzzle => ({
//             id: puzzle.id,
//             nombre: puzzle.nombre
//         }))

//         return puzzles
//     }

//     postCategoria = async (categoria) => {
//         const { nombre, idCreador, idPuzzle } = categoria
//         const newCategoria = await Categoria.create({
//             nombre,
//             idCreador,
//             idPuzzle
//         })

//         const categoriaCreada = {
//             id: newCategoria.id,
//             nombre: newCategoria.nombre,
//             idCreador: newCategoria.idCreador,
//             idPuzzle: newCategoria.idPuzzle
//         }

//         return categoriaCreada
//     }

//     putCategoria = async (id, categoria) => {
//         await Categoria.update({
//             nombre: categoria.nombre
//         }, {
//             where: { id }
//         })

//         const categoriaActualizada = await Categoria.findOne({ where: { id } })
//         if (!categoriaActualizada) throw new Error("No se pudo actualizar la categoria")

//         return categoriaActualizada
//     }

//     deleteCategoria = async (id) => {
//         const categoriaEliminada = await Categoria.destroy({ where: { id } })
//         if (!categoriaEliminada) throw new Error("No se pudo eliminar la categoria")

//         return 'Categoria eliminada correctamente'
//     }

//     comprobarSiEsFuncional = async (id) => {
//         const categoria = await Categoria.findOne({
//             where: { id },
//             include: [
//                 {
//                     model: Objeto,
//                     as: 'objetos',
//                     include: [{
//                         model: ObjetoCaracteristicas,
//                         as: 'objetoCaracteristicas'
//                     }],
//                 },
//                 {
//                     model: Caracteristicas,
//                     as: 'caracteristicas'
//                 }
//             ]
//         });

//         if (!categoria) throw new Error("No existe la categoría");

//         const objetos = categoria.objetos
//         const caracteristicas = categoria.caracteristicas

//         console.log(objetos.length);
//         console.log(caracteristicas.length);

//         if (objetos.length < 9 || caracteristicas.length < 6) throw new Error("Se necesitan al menos 9 objetos y 6 caracteristicas");

//         const caracArray = caracteristicas.map(c => Number(c.id));
//         console.log(caracArray);

//         const caracCont = Array(caracArray.length).fill(0);
//         console.log(caracCont);

//         objetos.forEach(obj => {
//             const intermedias = obj.objetoCaracteristicas

//             intermedias.forEach(oc => {
//                 const idCar = Number(oc.idCaracteristica);
//                 for (let i = 0; i < caracArray.length; i++) {
//                     if (idCar === caracArray[i]) {
//                         caracCont[i]++;
//                     }
//                 }
//             });
//         });

//         let contC = 0;
//         for (let i = 0; i < caracCont.length; i++) {
//             if (caracCont[i] >= 3) {
//                 contC++;
//             }
//         }

//         if (contC < 6) throw new Error("Los caracteristicas no cubren a los suficientes objetos");
//         return categoria//"Se pueden generar Sudokus";
//     };

//     crearSudoku = async (id) => {
//         // let caracC = Array(3).fill(0)
//         // let caracF = Array(3).fill(0)
//         // let obj = Array(9).fill(0)
//         const categoria = await Categoria.findOne({
//             where: { id },
//             include: [
//                 {
//                     model: Objeto,
//                     as: 'objetos',
//                     include: [{
//                         model: ObjetoCaracteristicas,
//                         as: 'objetoCaracteristicas'
//                     }],
//                 },
//                 {
//                     model: Caracteristicas,
//                     as: 'caracteristicas'
//                 }
//             ]
//         });

//         // //ver las carac que hay
//         // const objetos = categoria.objetos
//         // const caracteristicas = categoria.caracteristicas

//         // const caracArray = caracteristicas.map(c => Number(c.id));
//         // console.log(caracArray);

//         // const caracCont = Array(caracArray.length).fill(0);
//         // console.log(caracCont);

//         // objetos.forEach(obj => {
//         //     const intermedias = obj.objetoCaracteristicas

//         //     intermedias.forEach(oc => {
//         //         const idCar = Number(oc.idCaracteristica);
//         //         for (let i = 0; i < caracArray.length; i++) {
//         //             if (idCar === caracArray[i]) {
//         //                 caracCont[i]++;
//         //             }
//         //         }
//         //     });
//         // });

//         // let muchasCarac = false
//         // if (caracArray.length >= 10) {
//         //     muchasCarac
//         // }

//         // if (!muchasCarac) {
//         //     //coger la carac mas pequeña y colocarla en la 1º columna
//         //     let peq = caracCont[0]
//         //     for (let i = 0; i < caracCont.length; i++) {
//         //         if (caracCont[i] < peq && caracCont[i] >= 3) {
//         //             peq = caracArray[i]
//         //         }
//         //     }
//         //     caracC[0] = peq

//         //     //colocar los obj de esa carac
//         //     let objCaracPeq = []
//         //     let caracDeObjPeq = []
//         //     objetos.forEach(obj => {
//         //         const intermedias = obj.objetoCaracteristicas

//         //         intermedias.forEach(oc => {
//         //             const idCar = Number(oc.idCaracteristica);
//         //             if (idCar == peq) {
//         //                 objCaracPeq.push(oc.idObjetos)
//         //                 for (let i = 0; i < oc.length; i++) {
//         //                     caracDeObjPeq.push(oc.idObjetos, ":", idCar)
//         //                 }
//         //             }
//         //         });
//         //     });
//         //     if (objCaracPeq.length == 3) {
//         //         for (let i = 0; i < objCaracPeq.length; i++) {
//         //             obj[i * 3] = objCaracPeq[i]
//         //         }
//         //     } else if (objCaracPeq.length < 3) throw new Error("Problema al colocar objetos de la 1º carac")
//         //     else {
//         //         //voy a buscar el objeto que menos carac tenga
//         //         const contPrio = {};

//         //         caracDeObjPeq.forEach(item => {
//         //             const [x] = item.split(":");
//         //             contPrio[x] = (contPrio[x] || 0) + 1;
//         //         });

//         //         const objPrio = Object.entries(contPrio)
//         //             .reduce((min, [x, count]) => (count < min[1] ? [x, count] : min))[0];

//         //         console.log(objPrio);

//         //     }

//         //     //de los objetos seleccionados escoger el que menos caracteristicas tenga (la prioridad)
//         //     objCaracPeq.forEach(o => {

//         //     });
//         // } else {

//         // }


//         // //let sudoku = [caracC, caracF, obj]
//         // return categoria //sudoku
//     }
// }

// export { CategoriaConnection }




























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
        // let caracC = Array(3).fill(0)
        // let caracF = Array(3).fill(0)
        // let obj = Array(9).fill(0)
        const categoria = await Categoria.findOne({
            where: { id },
            include: [
                {
                    model: Objeto,
                    as: 'objetos',
                    include: [({
                        model: ObjetoCaracteristicas,
                        as: 'objetoCaracteristicas'
                    })],
                },
                {
                    model: Caracteristicas,
                    as: 'caracteristicas'
                }
            ]
        });

        // //ver las carac que hay
        // const objetos = categoria.objetos
        // const caracteristicas = categoria.caracteristicas

        // const caracArray = caracteristicas.map(c => Number(c.id));
        // console.log(caracArray);

        // const caracCont = Array(caracArray.length).fill(0);
        // console.log(caracCont);

        // objetos.forEach(obj => {
        //     const intermedias = obj.objetoCaracteristicas

        //     intermedias.forEach(oc => {
        //         const idCar = Number(oc.idCaracteristica);
        //         for (let i = 0; i < caracArray.length; i++) {
        //             if (idCar === caracArray[i]) {
        //                 caracCont[i]++;
        //             }
        //         }
        //     });
        // });

        // let muchasCarac = false
        // if (caracArray.length >= 10) {
        //     muchasCarac
        // }

        // if (!muchasCarac) {
        //     //coger la carac mas pequeña y colocarla en la 1º columna
        //     let peq = caracCont[0]
        //     for (let i = 0; i < caracCont.length; i++) {
        //         if (caracCont[i] < peq && caracCont[i] >= 3) {
        //             peq = caracArray[i]
        //         }
        //     }
        //     caracC[0] = peq

        //     //colocar los obj de esa carac
        //     let objCaracPeq = []
        //     let caracDeObjPeq = []
        //     objetos.forEach(obj => {
        //         const intermedias = obj.objetoCaracteristicas

        //         intermedias.forEach(oc => {
        //             const idCar = Number(oc.idCaracteristica);
        //             if (idCar == peq) {
        //                 objCaracPeq.push(oc.idObjetos)
        //                 for (let i = 0; i < oc.length; i++) {
        //                     caracDeObjPeq.push(oc.idObjetos, ":", idCar)
        //                 }
        //             }
        //         });
        //     });
        //     if (objCaracPeq.length == 3) {
        //         for (let i = 0; i < objCaracPeq.length; i++) {
        //             obj[i * 3] = objCaracPeq[i]
        //         }
        //     } else if (objCaracPeq.length < 3) throw new Error("Problema al colocar objetos de la 1º carac")
        //     else {
        //         //voy a buscar el objeto que menos carac tenga
        //         const contPrio = {};

        //         caracDeObjPeq.forEach(item => {
        //             const [x] = item.split(":");
        //             contPrio[x] = (contPrio[x] || 0) + 1;
        //         });

        //         const objPrio = Object.entries(contPrio)
        //             .reduce((min, [x, count]) => (count < min[1] ? [x, count] : min))[0];

        //         console.log(objPrio);

        //     }

        //     //de los objetos seleccionados escoger el que menos caracteristicas tenga (la prioridad)
        //     objCaracPeq.forEach(o => {

        //     });
        // } else {

        // }


        // //let sudoku = [caracC, caracF, obj]
        // return categoria //sudoku


        /* ------------------ AQUI EMPIEZA EL ALGORITMO ---------------
           Inserto aquí la implementación que:
             - normaliza la categoría de Sequelize,
             - selecciona automáticamente filas/cols si no se pasan,
             - selecciona hasta 9 objetos (pool),
             - crea candidatos por celda (3x3),
             - resuelve (MRV backtracking),
             - genera puzzle (quita pistas manteniendo unicidad cuando es posible),
             - devuelve { puzzle, solution, pool, candidates, filasChars, colsChars }.
           No borro los comentarios previos.
        ----------------------------------------------------------------*/

        // --- helpers locales ---
        function deepCopyLocal(x) { return JSON.parse(JSON.stringify(x)); }

        function normalizeCategoriaLocal(categoriaSequelize) {
            const dv = categoriaSequelize && categoriaSequelize.dataValues ? categoriaSequelize.dataValues : categoriaSequelize;
            const objetos = (dv.objetos || []).map(o => {
                const od = o && o.dataValues ? o.dataValues : o;
                const ocRaw = od.objetoCaracteristicas || od.objetoCaracteristicases || [];
                const oc = (ocRaw || []).map(x => {
                    const xd = x && x.dataValues ? x.dataValues : x;
                    return {
                        id: xd.id,
                        idCaracteristica: xd.idCaracteristica != null ? xd.idCaracteristica : (xd.id_caracteristica != null ? xd.id_caracteristica : xd.idCaracteristica),
                        idObjetos: xd.idObjetos != null ? xd.idObjetos : (xd.id_objetos != null ? xd.id_objetos : xd.idObjetos)
                    };
                });
                return {
                    id: od.id,
                    nombre: od.nombre,
                    idCategoria: od.idCategoria,
                    objetoCaracteristicas: oc
                };
            });

            const caracteristicas = (dv.caracteristicas || []).map(c => {
                const cd = c && c.dataValues ? c.dataValues : c;
                return { id: cd.id, nombre: cd.nombre };
            });

            return {
                id: dv.id,
                nombre: dv.nombre,
                objetos,
                caracteristicas
            };
        }

        function indexFromNormalizedLocal(ncat) {
            const objetos = ncat.objetos.map(o => ({
                id: o.id,
                nombre: o.nombre,
                idCategoria: o.idCategoria,
                caracteristicas: (o.objetoCaracteristicas || []).map(oc => oc.idCaracteristica)
            }));
            const byId = {};
            objetos.forEach(o => byId[o.id] = o);
            return { objetos, byId };
        }

        function buildCandidatesGridLocal(filasChars, colsChars, objetos, mode = "any") {
            const N = filasChars.length;
            const grid = Array.from({ length: N }, () => Array.from({ length: N }, () => []));
            for (let r = 0; r < N; r++) {
                for (let c = 0; c < N; c++) {
                    const cf = filasChars[r], cc = colsChars[c];
                    for (const o of objetos) {
                        const hasF = o.caracteristicas.includes(cf);
                        const hasC = o.caracteristicas.includes(cc);
                        if (mode === "any" ? (hasF || hasC) : (hasF && hasC)) {
                            grid[r][c].push(o.id);
                        }
                    }
                }
            }
            return grid;
        }

        function selectPoolOf9Local(candidatesGrid) {
            const N = candidatesGrid.length;
            const freq = {};
            for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) for (const id of candidatesGrid[r][c]) freq[id] = (freq[id] || 0) + 1;
            const distinct = Object.keys(freq).map(x => parseInt(x));
            if (distinct.length <= 9) return distinct;

            const covered = Array.from({ length: N }, () => Array.from({ length: N }, () => false));
            const pool = new Set();
            while (pool.size < 9) {
                let bestId = null, bestCover = -1;
                for (const idStr of Object.keys(freq)) {
                    const id = parseInt(idStr);
                    if (pool.has(id)) continue;
                    let cover = 0;
                    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (!covered[r][c] && candidatesGrid[r][c].includes(id)) cover++;
                    if (cover > bestCover) { bestCover = cover; bestId = id; }
                }
                if (bestId == null) break;
                pool.add(bestId);
                for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (candidatesGrid[r][c].includes(bestId)) covered[r][c] = true;
                let allCovered = true;
                for (let r = 0; r < N && allCovered; r++) for (let c = 0; c < N; c++) if (!covered[r][c]) { allCovered = false; break; }
                if (allCovered) break;
            }
            const remaining = Object.keys(freq).map(x => parseInt(x)).filter(id => !pool.has(id));
            remaining.sort((a, b) => freq[b] - freq[a]);
            for (const id of remaining) { if (pool.size >= 9) break; pool.add(id); }
            return Array.from(pool);
        }

        function restrictToPoolLocal(candidatesGrid, pool) {
            const setPool = new Set(pool);
            const N = candidatesGrid.length;
            const out = Array.from({ length: N }, () => Array.from({ length: N }, () => []));
            for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) out[r][c] = candidatesGrid[r][c].filter(id => setPool.has(id));
            return out;
        }

        function violatesRowOrColLocal(state, r, c, candidateId, byId) {
            const N = state.length;
            for (let cc = 0; cc < N; cc++) if (cc !== c && state[r][cc] === candidateId) return true;
            for (let rr = 0; rr < N; rr++) if (rr !== r && state[rr][c] === candidateId) return true;
            const cat = byId[candidateId].idCategoria;
            for (let cc = 0; cc < N; cc++) {
                if (cc === c) continue;
                const v = state[r][cc];
                if (v != null && byId[v].idCategoria === cat) return true;
            }
            for (let rr = 0; rr < N; rr++) {
                if (rr === r) continue;
                const v = state[rr][c];
                if (v != null && byId[v].idCategoria === cat) return true;
            }
            return false;
        }

        function solvePuzzleLocal(candidates, byId, maxSolutions = 2, timeoutMs = 3000) {
            const N = candidates.length;
            const state = Array.from({ length: N }, () => Array.from({ length: N }, () => null));
            const start = Date.now();
            const solutions = [];

            function pickCell() {
                let best = null, bestLen = Infinity;
                for (let r = 0; r < N; r++) {
                    for (let c = 0; c < N; c++) {
                        if (state[r][c] != null) continue;
                        const dom = candidates[r][c].filter(id => !violatesRowOrColLocal(state, r, c, id, byId));
                        if (dom.length === 0) return { r, c, domain: [] };
                        if (dom.length < bestLen) { bestLen = dom.length; best = { r, c, domain: dom }; }
                    }
                }
                return best;
            }

            function backtrack() {
                if (Date.now() - start > timeoutMs) return;
                let complete = true;
                for (let r = 0; r < N && complete; r++) for (let c = 0; c < N; c++) if (state[r][c] == null) { complete = false; break; }
                if (complete) { solutions.push(deepCopyLocal(state)); return; }
                const pick = pickCell();
                if (!pick || pick.domain.length === 0) return;
                for (const v of pick.domain) {
                    if (violatesRowOrColLocal(state, pick.r, pick.c, v, byId)) continue;
                    state[pick.r][pick.c] = v;
                    backtrack();
                    state[pick.r][pick.c] = null;
                    if (solutions.length >= maxSolutions) return;
                    if (Date.now() - start > timeoutMs) return;
                }
            }

            backtrack();
            return solutions;
        }

        function generatePuzzleFromSolutionLocal(solution, candidates, byId, timeoutPerCheck = 700) {
            const N = solution.length;
            const puzzle = deepCopyLocal(solution);
            const cells = [];
            for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) cells.push([r, c]);
            for (let i = cells.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [cells[i], cells[j]] = [cells[j], cells[i]]; }

            for (const [r, c] of cells) {
                const saved = puzzle[r][c]; puzzle[r][c] = null;
                const checkCandidates = candidates.map((row, rr) => row.map((col, cc) => {
                    if (puzzle[rr][cc] != null) return [puzzle[rr][cc]];
                    return col.slice();
                }));
                const sols = solvePuzzleLocal(checkCandidates, byId, 2, timeoutPerCheck);
                if (sols.length !== 1) puzzle[r][c] = saved;
            }
            return puzzle;
        }

        // --- flujo principal dentro de crearSudoku ---
        // normalizar y indexar
        const norm = normalizeCategoriaLocal(categoria);
        const { objetos, byId } = indexFromNormalizedLocal(norm);

        if (objetos.length < 9) throw new Error("La categoría debe tener al menos 9 objetos.");

        // elegir características filas/cols si no vienen: tomamos primeras 6 o extraemos de objetos
        const allChars = (norm.caracteristicas || []).map(c => c.id);
        let filasChars, colsChars;
        if (!allChars || allChars.length < 6) {
            const collect = new Set();
            objetos.forEach(o => (o.caracteristicas || []).forEach(id => collect.add(id)));
            const arr = Array.from(collect);
            if (arr.length < 6) throw new Error("No hay suficientes características (se requieren 6 si no pasas filas/cols).");
            filasChars = arr.slice(0, 3);
            colsChars = arr.slice(3, 6);
        } else {
            filasChars = allChars.slice(0, 3);
            colsChars = allChars.slice(3, 6);
        }

        const mode = "any"; // por defecto puedes cambiar a "both" si lo prefieres

        // construir candidatos 3x3
        const baseCandidates = buildCandidatesGridLocal(filasChars, colsChars, objetos, mode);

        for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) if (baseCandidates[r][c].length === 0) {
            throw new Error(`Celda (${r},${c}) no tiene candidatos. Revisa las características elegidas o cambia mode.`);
        }

        // seleccionar pool de 9
        let poolIds = selectPoolOf9Local(baseCandidates);
        if (poolIds.length < 9) {
            const freq = {};
            for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) for (const id of baseCandidates[r][c]) freq[id] = (freq[id] || 0) + 1;
            const more = Object.keys(freq).map(x => parseInt(x)).filter(id => !poolIds.includes(id)).sort((a, b) => freq[b] - freq[a]);
            for (const id of more) { if (poolIds.length >= 9) break; poolIds.push(id); }
        }

        // restringir candidatos al pool
        let candidates = restrictToPoolLocal(baseCandidates, poolIds);

        // fallback si alguna celda vacía
        let emptyFound = false;
        for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) if (candidates[r][c].length === 0) emptyFound = true;
        if (emptyFound) {
            const freq = {};
            for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) for (const id of baseCandidates[r][c]) freq[id] = (freq[id] || 0) + 1;
            const top9 = Object.keys(freq).map(x => parseInt(x)).sort((a, b) => freq[b] - freq[a]).slice(0, 9);
            poolIds = top9;
            candidates = restrictToPoolLocal(baseCandidates, poolIds);
            for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) if (candidates[r][c].length === 0) {
                throw new Error("No es posible seleccionar 9 objetos que cubran todas las celdas con las características dadas.");
            }
        }

        // resolver (encontrar solución completa)
        const sols = solvePuzzleLocal(candidates, byId, 2, 3000);
        if (sols.length === 0) throw new Error("No se encontró solución usando los 9 objetos seleccionados (prueba otro conjunto de características).");
        const solutionIds = sols[0];

        // generar puzzle (intentar mantener unicidad)
        const puzzleIds = generatePuzzleFromSolutionLocal(solutionIds, candidates, byId, 700);

        // convertir ids a nombres para salida (matriz de strings / null)
        function idsToNamesLocal(matrix) {
            return matrix.map(row => row.map(v => v == null ? null : byId[v].nombre));
        }
        const poolObjs = poolIds.map(id => ({ id, nombre: byId[id].nombre, idCategoria: byId[id].idCategoria }));

        // devolver el resultado: puzzle (3 arrays), solution y más info
        return {
            pool: poolObjs,
            candidates,        // ids (3x3)
            solution: idsToNamesLocal(solutionIds),
            puzzle: idsToNamesLocal(puzzleIds),
            filasChars, colsChars
        };

        /* ------------------ FIN DEL ALGORITMO ------------------ */
    }
}

export { CategoriaConnection }
