import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
//import { Server as SocketServer } from 'socket.io'

import { router as UsuarioRoutes } from '../routes/UsuarioRoutes.js'
import { router as CategoriaRoutes } from '../routes/CategoriaRoutes.js'
import { router as ObjetoRoutes } from '../routes/ObjetoRoutes.js'
import { router as CaracteristicaRoutes } from '../routes/CaracteristicasRoutes.js'
import { router as ObjetoCaracteristicaRoutes } from '../routes/ObjetoCaracteristicaRoutes.js'

//let io;

class Server {

    constructor() {
        this.app = express()
        this.serverHttp = createServer(this.app)
        //io = new SocketServer(this.serverHttp, { cors: { origin: '*' } })

        this.usuarioPath = '/api/usuario'
        this.categoriaPath = '/api/categoria'
        this.objetoPath = '/api/objeto'
        this.caracteristicaPath = '/api/caracteristica'
        this.objetoCaracteristicaPath = '/api/objetocaracteristica'

        this.middlewares()
        this.routes()
        //this.sockets()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
    }

    routes() {
        this.app.use(this.usuarioPath, UsuarioRoutes)
        this.app.use(this.categoriaPath, CategoriaRoutes)
        this.app.use(this.objetoPath, ObjetoRoutes)
        this.app.use(this.caracteristicaPath, CaracteristicaRoutes)
        this.app.use(this.objetoCaracteristicaPath, ObjetoCaracteristicaRoutes)
    }

    // sockets() {
    //     io.on('connection', (socket) => {
    //         console.log('Usuario conectado al websocket:', socket.id)
    //         socket.on('disconnect', () => {
    //             console.log('Usuario desconectado:', socket.id)
    //         })
    //     })
    // }

    listen() {
        this.serverHttp.listen(process.env.PORT, () => {
            console.log(`Express + WebSocket server listening on: ${process.env.PORT}`)
        })
    }
}

// export { io }
export default Server