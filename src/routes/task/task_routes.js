import express from 'express'
import controllers from '../../controllers'

const router = express.Router()

router.get('/getAll', controllers.task.getAll)

router.post('/create', controllers.task.createTask)

router.get('/getById/:id', controllers.task.getTaskById)

router.post('/edit', controllers.task.editTask)

router.delete('/remove/:id', controllers.task.removeTask)

module.exports = router