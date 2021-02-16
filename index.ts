import mongoose from 'mongoose'
import Server from './clases/server'
import usuarioRutas from './rutas/usuario'
import bodyParser from 'body-parser'
import contactoRutas from './rutas/contacto'
import yoRutas from './rutas/imagenesYo'
import fileupload from 'express-fileupload'

const server = new Server()

//BODY PARSER
server.app.use(bodyParser.urlencoded({ extended: true }))
server.app.use(bodyParser.json())

// FILEUPLOAR
server.app.use(fileupload())

//CONECTAR BD
mongoose.connect(
    'mongodb://localhost:27017/victorBase',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    (err) => {
        if (err) throw "err"
        console.log('CONECTADO')
    }
)

//RUTAS
server.app.use('/usuario', usuarioRutas)
server.app.use('/contacto', contactoRutas)
server.app.use('/uploadYo', yoRutas)

//CONECTAR AL SERVER
server.start(() => {
    console.log(`Servidor Victor corriendo en el puerto ${server.port}`)
})