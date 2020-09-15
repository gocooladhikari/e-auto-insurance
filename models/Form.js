const mongoose = require('mongoose')
const Schema = mongoose.Schema

const formSchema = new Schema({
    aboutVehicle: [{
        vinNumber: {type: Number, default: 0}
    }],
    firstName: {type: String, default: ''},
    lastName: {type: String, default: ''},
    phoneNumber: {type: Number, default: 0},
    maritalStatus: {type: String, default: ''},
    vehicleNumber: {type: Number, default: 0},
    driverNumber: {type: Number, default: 0},
    homeOwner: {type: String, default: ''},
    minValue: {type: Number, default: 0},
    fullValue: {type: Number, default: 0}
})

const Form1 = mongoose.model('formdata', formSchema)
module.exports = Form1