const mongoose= require('mongoose');
const frutasSchema = new mongoose.Schema({
    nombre:{
        type:String,
    },
    cantidad:{
        type:Number
    },
    frescos:{
        type:Number,
    },
    podridos:{
        type:Number,
    },
    fechaRegistro:{
        type:Date
    }
});

module.exports = mongoose.model('frutas',frutasSchema);