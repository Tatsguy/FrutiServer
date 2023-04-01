const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

const conectarMongoDB = ()=>{
    const linkMongo = "mongodb+srv://java:JevG0304@cluster0.efvsfb3.mongodb.net/fruITpy?retryWrites=true&w=majority"
    //const linkMongo='mongodb://127.0.0.1:27017/frutas'
    mongoose.connect(linkMongo).then(()=>{
        console.log("Conexion a mongoDB")
    })
    .catch(()=>{
        console.log("A ocurrido un error de conexion")
    })
}

module.exports = conectarMongoDB;
