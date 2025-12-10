import { ChatConnection } from "../database/ChatConnection.js";

const conn = new ChatConnection()

const ChatController = {
    funGetMensajes: (req, res) => {
        conn.getMensajesPorTemas(req.params.id)
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
        conn.postMensaje(req.body.usuId, req.body.mensaje, req.body.temasId)
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
    },

    funGetNombreTemas: (req, res) => {
        conn.getNombreTemas()
            .then(temas => {
                res.status(200).json({
                    status: 200,
                    message: "Nombre del tema obtenido correctamente",
                    temas: temas
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },

    funPostTema: (req, res) => {
        conn.postTema(req.body.nombre)
            .then(tema => {
                res.status(200).json({
                    status: 200,
                    message: "Tema creado correctamente",
                    tema: tema
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