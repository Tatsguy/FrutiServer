const Fruta = require('../models/frutaModelo')
const User = require('../models/usuarioModelo')
//Esto es el servidor
const socket = (io) => {
    io.on('connection', (socket) => {
        console.log("Script servidor")

        socket.on('cliente:loginMe', async (body) => {
            io.emit('servidor:respLogin',
                await User.find({ usuario: body.usu, password: body.pas }))
        })

        socket.on('cliente:buscarFruta', async () => {
            io.emit('servidor:verFrutaHistorial',
                await Fruta.find({}))
        })

        socket.on('cliente:buscarFrutaDia', async (dia) => {
            io.emit('servidor:verFrutaDiaria',
                await Fruta.find({ fechaRegistro: dia }))
        })

        socket.on('cliente:insertarFresco', async (datos) => {
            const frutoAct = await Fruta.find({ fechaRegistro: datos.fecha, nombre: datos.nombre })
            if (!frutoAct.length == 0) {
                const oldCant = frutoAct[0].cantidad
                const oldFres = frutoAct[0].frescos
                await Fruta.updateOne({ fechaRegistro:{$eq:datos.fecha}, nombre:{$eq:datos.nombre} }, { $set: { cantidad: oldCant+1, frescos: oldFres + 1 } })
            } else {
                await new Fruta({ fechaRegistro: datos.fecha, nombre: datos.nombre, cantidad: 1, frescos: 1, podridos: 0 }).save()
            }
            io.emit('servidor:actualizacionTotal')
        })


        socket.on('cliente:insertarPodrido', async (datos) => {
            const frutoAct = await Fruta.find({ fechaRegistro: datos.fecha, nombre: datos.nombre })
            if (!frutoAct.length == 0) {
                const oldCant = frutoAct[0].cantidad
                const oldPod = frutoAct[0].podridos
                await Fruta.updateOne({ fechaRegistro:{$eq:datos.fecha}, nombre:{$eq:datos.nombre} }, { $set: { cantidad: oldCant+1, podridos: oldPod + 1 } })
            } else {
                await new Fruta({ fechaRegistro: datos.fecha, nombre: datos.nombre, cantidad: 1, frescos: 0, podridos: 1 }).save()
            }
            io.emit('servidor:actualizacionTotal',('Actualizate'))
        })


    })//Fin de la conexion
}

module.exports = socket;