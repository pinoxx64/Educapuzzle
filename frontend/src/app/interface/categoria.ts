export interface Categoria {
    id: number,
    nombre: string,
    idCreador: number,
    idPuzzle: number
}

export interface CategoriaResponse {
      message: string,
      status: number,
      categoria: Categoria,
}