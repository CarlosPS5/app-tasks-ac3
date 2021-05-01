import models from '../models'
import jwt from 'jsonwebtoken'

const register = async (req,res) => {
    try {
        const usuario = await models.user.findOne({username: req.body.username})
        if(!usuario) {
            const rol = await models.role.findOne({name: req.body.rol})
            const encodedPass = await models.user.encode(req.body.password)
            const user = new models.user({
                username: req.body.username,
                password: encodedPass,
                rol: rol._id
            })
            user.save()

            const accessToken = jwt.sign({user}, process.env.SECRET_KEY)

            res.cookie('taskCookie', accessToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                secure: true,
                sameSite: true
            })

            res.send({
                status: 'success',
                data: {user},
                code: 200
            })
        }
        res.send({
            status: 'failed',
            data: 'El usuario ya existe en el sistema',
            code: 500
        })

    }catch(err){
        res.send({
            status: 'failed',
            data: 'Error al registrar el usuario',
            code: 500
        })
    }
    
}

const auth = (req,res) => {
    try {
        req.cookies.taskCookie === undefined
        ?
        res.send({
            status: 'failed',
            data: false,
            code:500
        })
        :
        res.send({
            status: 'success',
            data: true,
            code: 200
        })
    }catch(err) {
        res.send({
            status: 'failed',
            data: 'Hubo un error chekeando la autenticación',
            code: 500
        })
    }
}

const login = async (req,res) => {
    try {
        if(req.body.username === '' || req.body.password === '') {
            res.send({
                status: 'failed',
                data: 'Rellena los campos obligatorios',
                code: 500
            })
        } else {
            const user = await models.user.findOne({username: req.body.username})
            if(user) {
                if(models.user.compare(req.body.password,user.password)) {
                    const accessToken = jwt.sign({user}, process.env.SECRET_KEY)

                    res.cookie('taskCookie', accessToken, {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000,
                        secure: true,
                        sameSite: true
                    })

                    res.send({
                        status: 'success',
                        data: {user},
                        code: 200
                    })
                } else {
                    res.send({
                        status: 'failed',
                        data: 'Credenciales incorrectos',
                        code: 500
                    })
                }
            } else {
                res.send({
                    status: 'failed',
                    data: 'El usuario no existe en el sistema',
                    code: 500
                }) 
            }
        }

    }catch(err) {
        res.send({
            status: 'failed',
            data: 'Ha habido un fallo logeando al usuario',
            code: 500
        })
    }
}

const logout = (req,res) => {
    try {
        res.clearCookie('taskCookie')

        res.send({
            status: 'success',
            data: false,
            code: 200
        })
    } catch(err) {

        res.send({
            status: 'failed',
            data: 'No se ha podido desloguear al usuario',
            code: 500
        })
    }
}

const usersData = async (req,res) => {
    try{
        const users = await models.user.find({rol: "608343e256195f1829eded14"})
        res.send({
            status: 'success',
            data: users,
            code: 200
        })
    }catch(err) {
        res.send({
            status: 'failed',
            data: 'Unable to fetch users',
            code: 500
        })
    }
    
}

const deleteUser = async (req,res) => {
    try {
        const user = await models.user.findById(req.params.id)
        await models.user.deleteOne({_id: req.params.id})
        await models.task.deleteMany({user: user.username})
        res.send({
            status: 'success',
            data: 'User deleted',
            code: 200
        })

    }catch(err) {
        res.send({
            status: 'failed',
            data: 'Unable to delete user',
            code: 500
        })
    }
}

module.exports = {
    register,
    login,
    logout,
    auth,
    usersData,
    deleteUser
}