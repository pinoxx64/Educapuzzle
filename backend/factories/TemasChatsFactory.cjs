const temasChats = async() => {
    const temas = []

    temas.push({
        nombre: 'General'
    })

    temas.push({
        nombre: 'Fallos en el sudoku'
    })
    return temas
}

module.exports = {
    temasChats
}