import jwt from 'jsonwebtoken'

export const generateJWT = (uid = '', roles = []) => {
    return jwt.sign({uid, roles}, process.env.SECRETORPRIVATEKEY, {
        expiresIn: '72h'
    })
}