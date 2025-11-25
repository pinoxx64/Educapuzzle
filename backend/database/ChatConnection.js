import Chat from "../models/chat.js"
import Usuario from "../models/usuario.js"


class ChatConnection {
    getMensajes = async() => {
        let chat = []
        chat = await Chat.findAll({
            include: [{
                model: Usuario,
                as: 'usuarios'
            }]
        })

        if (!chat) throw new Error('No se encontraron mensajes de chat')
        
        chat = chat.map( c => ({
            id: c.id,
            usuId: c.usuId,
            mensaje: c.mensaje,
        }))

        return chat
    }

    postMensaje = async(usuId, mensaje) => {
        const nuevoMensaje = await Chat.create({
            usuId,
            mensaje
        })

        const mensajeCreado = {
            id: nuevoMensaje.id,
            usuId: nuevoMensaje.usuId,
            mensaje: nuevoMensaje.mensaje
        }
        
        return mensajeCreado
    }
}
export { ChatConnection}