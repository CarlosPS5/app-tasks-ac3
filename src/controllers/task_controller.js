import models from '../models'
import jwt_decode from 'jwt-decode'

const getAll = async (req,res) => {
    try {
        const publicTasks = await models.task.find({is_public: true})
        const userTasks = await models.task.find({is_public:false, user:jwt_decode(req.headers.cookie).user.username})
        const tasks = publicTasks.concat(userTasks)
        res.send({
            status: 'success',
            data: tasks,
            code: 200
        })

    }catch(err){
        res.send({
            status: 'failed',
            data: 'Unable to load tasks',
            code: 500
        })
    }

}

const createTask = async (req,res) => {
    try {
        const task = new models.task({
            title: req.body.title,
            description: req.body.description,
            is_public: req.body.is_public,
            user: jwt_decode(req.headers.cookie).user.username
        })
        task.save()

        res.send({
            status: 'success',
            data: task,
            code: 200
        })

    }catch(err) {
        res.send({
            status: 'failed',
            data: 'No se ha podido crear la task',
            code: 500
        })
    }
}

const getTaskById = async(req,res) => {
    try {
        const task = await models.task.findOne({_id: req.params.id})
        if(task) {
            res.send({
                status: 'success',
                data: task,
                code: 200
            })
        } else {
            res.send({
                status: 'failed',
                data: 'No se encontró la task',
                code: 500
            })
        }

    }catch(err) {
        res.send({
            status: 'failed',
            data: 'Error obteniendo la task',
            code: 500
        })
    }
}

const editTask = async(req,res) => {
    try {
        const task = await models.task.findById(req.body._id)
        task.title = req.body.title
        task.description = req.body.description
        task.is_public = req.body.is_public
        task.save()

        res.send({
            status: 'success',
            data: task,
            code: 200
        })

    }catch(err) {
        res.send({
            status: 'failed',
            data: 'Unable to edit the task',
            code:500
        })
    }

}

const removeTask = async(req,res) => {
    try {
        console.log(req.params.id)
        const task = await models.task.deleteOne({_id:req.params.id})
        if(task) {
            res.send({
                status: 'success',
                data: 'Eliminado correctamente',
                code: 200
            })
        } else {
            res.send({
                status: 'failed',
                data: 'Error eliminado',
                code: 500
            })
        }
    }catch(err) {
        res.send({
            status: 'failed',
            data: 'Unable to remove the task',
            code: 500
        })
    }
}

module.exports = {
    getAll,
    getTaskById,
    createTask,
    editTask,
    removeTask
}