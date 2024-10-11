import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./env.js"


export const generrateToken = (payload, expiresIn = "10d") => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: expiresIn})
}

export const verifyToken = (token) => {
    return jwt.verify(token,JWT_SECRET)
}