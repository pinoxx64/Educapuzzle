import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
//import { Server as SocketServer } from 'socket.io'

// import { router as UserRoutes } from '../routes/UserRoutes.js'
// import { router as SimulacionesRoutes } from '../routes/SimulacionesRoutes.js'
// import { router as CeldaRoutes } from '../routes/CeldaRoutes.js'

//let io;

class Server {

    constructor() {
        this.app = express()
        this.serverHttp = createServer(this.app)
        //io = new SocketServer(this.serverHttp, { cors: { origin: '*' } })

        // this.usersPath = '/api/user'
        // this.simulacionPath = '/api/simulacion'
        // this.celdaPath = '/api/celda'

        this.middlewares()
        this.routes()
        //this.sockets()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
    }

    routes() {
        // this.app.use(this.usersPath, UserRoutes)
        // this.app.use(this.simulacionPath, SimulacionesRoutes)
        // this.app.use(this.celdaPath, CeldaRoutes)
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