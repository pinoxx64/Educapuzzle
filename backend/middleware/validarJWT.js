import jwt from 'jsonwebtoken'
import {StatusCodes} from "http-status-codes";

export const validJWT = (req, res, next) => {
    const token = req.header('token')
    console.log(token)

    if (!token) {
        return res.status(StatusCodes.NETWORK_AUTHENTICATION_REQUIRED).json({
            msg: 'Necesitas tener la sesion iniciada.'
        })
    }

    try {
        const { uid, roles } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        req.userId = uid
        req.roles = roles

        next()
    }catch (error) {
        res.status(StatusCodes.NOT_ACCEPTABLE).json({
            msg: 'No se ha podido validar el token.'
        })
    }
}