const estadisticas = async () => {
    const estadisticas = []

    for (let i = 1; i <= 10; i++) {
        estadisticas.push({
            usuId: i,
            sudokuJugados: 0,
            sudokuGanados: 0
        })
    }
    return estadisticas
}
module.exports = {
    estadisticas
}
