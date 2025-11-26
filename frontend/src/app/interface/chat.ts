export interface Chat {
    id: number,
    usu: string,
    mensaje: string
}

export interface ChatResponse {
      message: string,
      status: number,
      chat: Chat,
}
