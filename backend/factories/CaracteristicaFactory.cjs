const caracteristicas = async() => {
    const caracteristica = []

    caracteristica.push({
        idCategoria:1,
        nombre: 'Bandera con rojo'
    })

    caracteristica.push({
        idCategoria:1,
        nombre: 'Son de Europa'
    })

    caracteristica.push({
        idCategoria:1,
        nombre: 'Empieza con la "C"'
    })

    caracteristica.push({
        idCategoria:1,
        nombre: 'Son de Asia'
    })

    caracteristica.push({
        idCategoria:1,
        nombre: 'Han tenido revoluciones'
    })

    caracteristica.push({
        idCategoria:1,
        nombre: 'Han tenido dictaduras'
    })

    return caracteristica
}

module.exports = {
    caracteristicas
}