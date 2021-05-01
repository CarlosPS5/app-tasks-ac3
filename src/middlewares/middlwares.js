import jwt_decode from 'jwt-decode'
import models from '../models'

const isAuth = (req,res,next) => {
    try {
        req.cookies.taskCookie === undefined
        ?
        res.redirect('http://localhost:3000')
        :
        next()
    }catch(err) {
        res.send({
            status: 'failed',
            data: 'Hubo un error chekeando la autenticación',
            code: 500
        })
    }
}

const isUser = (req,res,next) => {
    try {


    }catch(err) {
        res.send({
            status: 'failed',
            data: 'Error de rol',
            code: 500
        })
    }
}

const isAdmin = async (req,res,next) => {
    try {
        const id = jwt_decode(req.headers.cookie).user._id
        const user = await models.user.findById(id)
        if(user) {
            if(user.rol == '608343aa56195f1829eded13') {
                next()
            } else {            
                res.send({
                    status: 'failed',
                    data: 'Unauthorized',
                    code: 500
                })
            }

        } else {
            res.send({
                status: 'failed',
                data: 'No se encuentra el usuario',
                code: 500
            })
        }

    }catch(err) {
        res.send({
            status: 'failed',
            data: 'Error de rol',
            code: 500
        })
    }
}

module.exports = {
    isAuth,
    isUser,
    isAdmin
}