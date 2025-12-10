export interface Chat {
    id: number,
    usu: string,
    temasId: number,
    mensaje: string
}

export interface ChatResponse {
      message: string,
      status: number,
      chat: Chat,
}
