import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import env from 'node-env-file'
import routes from './routes'
import cookieParser from 'cookie-parser'
import './db'

const server = express()

//settings.
env('./.env')
server.set('port', process.env.PORT || 8080)

//middlewares.
server.use(morgan('dev'))
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended:false}))
server.use(cookieParser(`${process.env.SECRET_KEY}`))

//routes.
server.use('/user', routes.user_routes)
server.use('/tasks', routes.task_routes)


//listen.
server.listen(server.get('port'), () => {
    console.log("Server running on port:", server.get('port'))
})




