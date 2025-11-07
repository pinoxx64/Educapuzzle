export interface ObjetoCaracteristica {
    id?: number,
    idObjeto: number,
    idCaracteristica: number
}

export interface ObjetoCaracteristicaResponse {
    message: string,
    status: number,
    objetoCaracteristica: ObjetoCaracteristica
}
