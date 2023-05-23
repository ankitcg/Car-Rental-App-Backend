const mongoose = require('mongoose');

const addcarSchema = new mongoose.Schema({
    carname:{
        type:String
    },
    type:{
        type:Number,
    },
    model:{
        type:String
    },
    milage:{
        type:Number
    },
    perkm:{
        type:Number
    },
    image:{
        type:String
    },
    availablefrom:{
        type:String
    },
    availabletill:{
        type:String
    },
    description:{
        type:String
    },
    cardetails:{
        type:String
    },
    details:{
        type:String
    }
})

module.exports = AddCar = mongoose.model('addcar',addcarSchema);