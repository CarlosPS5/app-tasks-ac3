import express from 'express'
import controllers from '../../controllers'
import middlwares from '../../middlewares'

const router = express.Router()

router.post('/register', controllers.user.register)

router.post('/login', controllers.user.login)

router.get('/logout', controllers.user.logout)

router.get('/auth', controllers.user.auth)

router.get('/usersData', middlwares.middlewares.isAdmin ,controllers.user.usersData)

router.delete('/deleteUser/:id', middlwares.middlewares.isAdmin, controllers.user.deleteUser)

module.exports = router