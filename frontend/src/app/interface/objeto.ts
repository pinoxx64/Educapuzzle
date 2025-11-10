export interface Objeto {
    id: number,
    idCategoria: number,
    nombre: string
}

export interface ObjetoResponse {
    message: string,
    status: number,
    objeto: Objeto
}
