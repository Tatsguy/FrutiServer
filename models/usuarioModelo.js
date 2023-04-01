const mongoose= require('mongoose');
const usuarioSchema = new mongoose.Schema({
    usuario:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tipo:{
        type:String,
        default:'usuario'
    },
    estatus:{
        type:Boolean,
        default:true
    }
});

module.exports = mongoose.model('usuarios',usuarioSchema);