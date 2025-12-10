import Estadistcas from "../models/estadistcas.js";

class EstadisticasConnection {
    getEstadisticas = async (usuId) => {
        let estadisticas = []
        estadisticas = await Estadistcas.findOne({
            where: { usuId }
        });

        if (!estadisticas) throw new Error('No se encontraron estadísticas para el usuario');
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