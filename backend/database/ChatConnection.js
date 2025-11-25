import Chat from "../models/chat.js"
import Usuario from "../models/usuario.js"
import { io } from "../app/server.js"


class ChatConnection {
    getMensajes = async () => {
        let chat = []
        chat = await Chat.findAll({
            include: [{
                model: Usuario,
                as: 'usuarios',
                attributes: ['name']
            }]
        })

        if (!chat) throw new Error('No se encontraron mensajes de chat')

        chat = chat.map(c => ({
            id: c.id,
            usu: c.usuarios?.name,
            mensaje: c.mensaje,
        }))

        return chat
    }

    postMensaje = async (usuId, mensaje) => {
        const nuevoMensaje = await Chat.create({
            usuId,
            mensaje
        })

        const mensajeCreado = {
            id: nuevoMensaje.id,
            usuId: nuevoMensaje.usuId,
            mensaje: nuevoMensaje.mensaje
        }

        const mensajes = await this.getMensajes()
        console.log('mensajes', mensajes);
        io.emit("mensaje", {mensajes});
        return mensajeCreado
    }
}
export { ChatConnection }