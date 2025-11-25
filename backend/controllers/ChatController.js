import { ChatConnection } from "../database/ChatConnection.js";

const conn = new ChatConnection()

const ChatController = {
    funGetMensajes: (req, res) => {
        conn.getMensajes()
            .then(chat => {
                res.status(200).json({
                    status: 200,
                    message: "Mensajes de chat obtenidos correctamente",
                    chat: chat
                })
            }
            )
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },

    funPostMensaje: (req, res) => {
        conn.postMensaje(req.body.usuId, req.body.mensaje)
            .then(mensaje => {
                res.status(200).json({
                    status: 200,
                    message: "Mensaje creado correctamente",
                    mensaje: mensaje
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    }
}

export default ChatController