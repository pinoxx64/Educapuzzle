import Estadistcas from "../models/estadistcas";

class EstadisticasConnection {
    getEstadisticas = async (usuId) => {
        let estadisticas = await Estadistcas.findOne({
            where: { usuId }
        });

        if (!estadisticas) throw new Error('No se encontraron estadísticas para el usuario');
        estadisticas = estadisticas.map(es => ({
            id: es.id,
            usuId: es.usuId,
            sudokuJugados: es.sudokuJugados,
            sudokuGanados: es.sudokuGanados,
        }))
        return estadisticas;
    }

    postEstadisticas = async (usuId) => {
        const nuevasEstadisticas = await Estadistcas.create({
            usuId
        })
        const estadisticasCreadas = {
            id: nuevasEstadisticas.id,
            usuId: nuevasEstadisticas.usuId,
            sudokuJugados: nuevasEstadisticas.sudokuJugados,
            sudokuGanados: nuevasEstadisticas.sudokuGanados
        }
        return estadisticasCreadas
    }

    sumarSudokuJugado = async (usuId) => {
        const estadisticas = await Estadistcas.findOne({
            where: { usuId }
        });
        if (!estadisticas) throw new Error('No se encontraron estadísticas para el usuario');
        estadisticas.sudokuJugados += 1;
        await estadisticas.save();
        return estadisticas;
    }

    sumarSudokuGanados = async (usuId) => {
        const estadisticas = await Estadistcas.findOne({
            where: { usuId }
        });
        if (!estadisticas) throw new Error('No se encontraron estadísticas para el usuario');
        estadisticas.sudokuGanados += 1;
        await estadisticas.save();
        return estadisticas;
    }
}

export { EstadisticasConnection }