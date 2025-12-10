import Chat from "../models/chat.js"
import Usuario from "../models/usuario.js"
import { io } from "../app/server.js"
import TemasChat from "../models/temaschat.js"


class ChatConnection {
    getMensajesPorTemas = async (temasId) => {
        let chat = []
        chat = await Chat.findAll({
            where: { temasId },
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
            temasId: c.temasId
        }))

        return chat
    }

    postMensaje = async (usuId, mensaje, temasId) => {
        const nuevoMensaje = await Chat.create({
            usuId,
            mensaje,
            temasId
        })

        const mensajeCreado = {
            id: nuevoMensaje.id,
            usuId: nuevoMensaje.usuId,
            mensaje: nuevoMensaje.mensaje,
            temasId: nuevoMensaje.temasId
        }

        const mensajes = await this.getMensajesPorTemas(nuevoMensaje.temasId);
        console.log('mensajes', mensajes);
        io.emit("mensaje", { mensajes });
        return mensajeCreado
    }

    getNombreTemas = async () => {
        const temas = await TemasChat.findAll({
            attributes: ["id", "nombre"]
        });

        return temas.map(t => ({
            id: t.id,
            nombre: t.nombre
        }));
    }

    postTema = async (nombre) => {
        const nuevoTema = await TemasChat.create({
            nombre
        });

        const temaCreado = {
            id: nuevoTema.id,
            nombre: nuevoTema.nombre
        };
        const temas = await this.getNombreTemas();
        io.emit("tema", { temas });
        return temaCreado;
    }

}
export { ChatConnection }