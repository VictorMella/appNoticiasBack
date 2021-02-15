import mongoose from 'mongoose'
import Server from './clases/server'
import usuarioRutas from './rutas/usuario'
import bodyParser from 'body-parser'

const server = new Server()

//BODY PARSER
server.app.use(bodyParser.urlencoded({ extended: true }))
server.app.use(bodyParser.json())

//RUTAS
server.app.use('/usuario', usuarioRutas)

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



//CONECTAR AL SERVER
server.start(() => {
    console.log(`Servidor Victor corriendo en el puerto ${server.port}`)
})