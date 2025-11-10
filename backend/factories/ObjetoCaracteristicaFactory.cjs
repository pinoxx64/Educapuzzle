const objetosCaracteristicas = async () => {
    const oc = []

    // 1 Alemania
    oc.push({ idObjetos:1, idCaracteristica: 1 })   // Bandera con rojo
    oc.push({ idObjetos:1, idCaracteristica: 2 })   // Son de Europa
    oc.push({ idObjetos:1, idCaracteristica:14 })   // Democracia

    // 2 Argentina
    oc.push({ idObjetos:2, idCaracteristica: 8 })   // Hablan español
    oc.push({ idObjetos:2, idCaracteristica: 9 })   // Son de América
    oc.push({ idObjetos:2, idCaracteristica:11 })   // Bandera con azul
    oc.push({ idObjetos:2, idCaracteristica:16 })   // Han sido colonias europeas

    // 3 Australia
    oc.push({ idObjetos:3, idCaracteristica:13 })   // Son de Oceanía
    oc.push({ idObjetos:3, idCaracteristica:11 })   // Bandera con azul
    oc.push({ idObjetos:3, idCaracteristica:14 })   // Democracia
    oc.push({ idObjetos:3, idCaracteristica:16 })   // Han sido colonias europeas

    // 4 Brasil
    oc.push({ idObjetos:4, idCaracteristica:10 })   // Bandera con verde
    oc.push({ idObjetos:4, idCaracteristica: 7 })   // Bandera con amarillo
    oc.push({ idObjetos:4, idCaracteristica:11 })   // Bandera con azul
    oc.push({ idObjetos:4, idCaracteristica: 9 })   // Son de América
    oc.push({ idObjetos:4, idCaracteristica:16 })   // Han sido colonias europeas

    // 5 Canada
    oc.push({ idObjetos:5, idCaracteristica: 1 })   // Bandera con rojo
    oc.push({ idObjetos:5, idCaracteristica: 9 })   // Son de América
    oc.push({ idObjetos:5, idCaracteristica:14 })   // Democracia

    // 6 Chile
    oc.push({ idObjetos:6, idCaracteristica: 1 })   // Bandera con rojo
    oc.push({ idObjetos:6, idCaracteristica:11 })   // Bandera con azul
    oc.push({ idObjetos:6, idCaracteristica: 8 })   // Hablan español
    oc.push({ idObjetos:6, idCaracteristica: 9 })   // Son de América
    oc.push({ idObjetos:6, idCaracteristica: 6 })   // Han tenido dictaduras
    oc.push({ idObjetos:6, idCaracteristica:16 })   // Han sido colonias europeas

    // 7 China
    oc.push({ idObjetos:7, idCaracteristica: 4 })   // Son de Asia
    oc.push({ idObjetos:7, idCaracteristica: 1 })   // Bandera con rojo
    oc.push({ idObjetos:7, idCaracteristica: 6 })   // Han tenido dictaduras
    oc.push({ idObjetos:7, idCaracteristica:15 })   // Grandes potencias económicas

    // 8 Colombia
    oc.push({ idObjetos:8, idCaracteristica: 7 })   // Bandera con amarillo
    oc.push({ idObjetos:8, idCaracteristica:11 })   // Bandera con azul
    oc.push({ idObjetos:8, idCaracteristica: 1 })   // Bandera con rojo
    oc.push({ idObjetos:8, idCaracteristica: 8 })   // Hablan español
    oc.push({ idObjetos:8, idCaracteristica: 9 })   // Son de América
    oc.push({ idObjetos:8, idCaracteristica:16 })   // Han sido colonias europeas

    // 9 Corena del Norte
    oc.push({ idObjetos:9, idCaracteristica: 4 })   // Son de Asia
    oc.push({ idObjetos:9, idCaracteristica: 1 })   // Bandera con rojo
    oc.push({ idObjetos:9, idCaracteristica: 6 })   // Han tenido dictaduras

    // 10 Egipto
    oc.push({ idObjetos:10, idCaracteristica:12 })  // Son de África
    oc.push({ idObjetos:10, idCaracteristica: 1 })  // Bandera con rojo
    oc.push({ idObjetos:10, idCaracteristica: 6 })  // Han tenido dictaduras
    oc.push({ idObjetos:10, idCaracteristica:16 })  // Han sido colonias europeas

    // 11 España
    oc.push({ idObjetos:11, idCaracteristica: 2 })  // Son de Europa
    oc.push({ idObjetos:11, idCaracteristica: 1 })  // Bandera con rojo
    oc.push({ idObjetos:11, idCaracteristica: 7 })  // Bandera con amarillo
    oc.push({ idObjetos:11, idCaracteristica: 8 })  // Hablan español

    // 12 Estados Unidos
    oc.push({ idObjetos:12, idCaracteristica:15 })  // Grandes potencias económicas
    oc.push({ idObjetos:12, idCaracteristica:11 })  // Bandera con azul
    oc.push({ idObjetos:12, idCaracteristica: 1 })  // Bandera con rojo
    oc.push({ idObjetos:12, idCaracteristica: 9 })  // Son de América
    oc.push({ idObjetos:12, idCaracteristica:14 })  // Democracia
    oc.push({ idObjetos:12, idCaracteristica:16 })  // Han sido colonias europeas

    // 13 Francia
    oc.push({ idObjetos:13, idCaracteristica: 2 })  // Son de Europa
    oc.push({ idObjetos:13, idCaracteristica: 1 })  // Bandera con rojo
    oc.push({ idObjetos:13, idCaracteristica:14 })  // Democracia
    oc.push({ idObjetos:13, idCaracteristica:16 })  // Han sido colonias europeas

    // 14 India
    oc.push({ idObjetos:14, idCaracteristica: 4 })  // Son de Asia
    oc.push({ idObjetos:14, idCaracteristica:10 })  // Bandera con verde
    oc.push({ idObjetos:14, idCaracteristica:16 })  // Han sido colonias europeas
    oc.push({ idObjetos:14, idCaracteristica:14 })  // Democracia (gran democracia)

    // 15 Italia
    oc.push({ idObjetos:15, idCaracteristica: 2 })  // Son de Europa
    oc.push({ idObjetos:15, idCaracteristica: 1 })  // Bandera con rojo
    oc.push({ idObjetos:15, idCaracteristica:10 })  // Bandera con verde
    oc.push({ idObjetos:15, idCaracteristica:14 })  // Democracia

    // 16 Japón
    oc.push({ idObjetos:16, idCaracteristica: 4 })  // Son de Asia
    oc.push({ idObjetos:16, idCaracteristica: 1 })  // Bandera con rojo
    oc.push({ idObjetos:16, idCaracteristica:15 })  // Grandes potencias económicas
    oc.push({ idObjetos:16, idCaracteristica:14 })  // Democracia

    // 17 México
    oc.push({ idObjetos:17, idCaracteristica: 8 })  // Hablan español
    oc.push({ idObjetos:17, idCaracteristica: 9 })  // Son de América
    oc.push({ idObjetos:17, idCaracteristica:10 })  // Bandera con verde
    oc.push({ idObjetos:17, idCaracteristica: 5 })  // Han tenido revoluciones
    oc.push({ idObjetos:17, idCaracteristica:16 })  // Han sido colonias europeas

    // 18 Rusia
    oc.push({ idObjetos:18, idCaracteristica: 1 })  // Bandera con rojo
    oc.push({ idObjetos:18, idCaracteristica:11 })  // Bandera con azul
    oc.push({ idObjetos:18, idCaracteristica: 6 })  // Han tenido dictaduras (hist.)
    oc.push({ idObjetos:18, idCaracteristica:15 })  // Grandes potencias económicas
    oc.push({ idObjetos:18, idCaracteristica: 2 })  // (también Europa, transcontinental)

    // 19 Sudáfrica
    oc.push({ idObjetos:19, idCaracteristica:12 })  // Son de África
    oc.push({ idObjetos:19, idCaracteristica:10 })  // Bandera con verde
    oc.push({ idObjetos:19, idCaracteristica: 7 })  // Bandera con amarillo
    oc.push({ idObjetos:19, idCaracteristica:14 })  // Democracia
    oc.push({ idObjetos:19, idCaracteristica:16 })  // Han sido colonias europeas

    return oc
}

module.exports = {
    objetosCaracteristicas
}
