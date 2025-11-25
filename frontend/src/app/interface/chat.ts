export interface Chat {
    id: number,
    usuId: number,
    mensaje: string
}

export interface ChatResponse {
      message: string,
      status: number,
      chat: Chat,
}
