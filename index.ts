import Server from "./clases/server"

const server = new Server();

server.start(()=> {
    console.log(`Servidor Victor corriendo en el puerto ${server.port}`)
})