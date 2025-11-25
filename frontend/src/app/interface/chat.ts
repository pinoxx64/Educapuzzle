export interface Chat {
    //sort(arg0: (a: any, b: any) => number): Chat[];
    id: number,
    usu: string,
    mensaje: string
}

export interface ChatResponse {
      message: string,
      status: number,
      chat: Chat,
}
