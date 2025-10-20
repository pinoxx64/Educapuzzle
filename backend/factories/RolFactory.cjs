const roles = async() => {
    const rol = []

    rol.push({
        nombre: 'Administrador'
    })

    rol.push({
        nombre: 'Alumno'
    })

    rol.push({
        nombre: 'Profesor'
    })

    return rol
}

module.exports = {
    roles
}