export interface Caracteristica {
    id: number,
    idCategoria: number,
    nombre: string
}

export interface CaracteristicaResponse {
    message: string,
    status: number,
    caracteristica: Caracteristica
}