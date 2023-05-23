const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  img : {
    type : String,
    required : true
 },
 seater : {
    type : Number,
    required : true
 },
 carType : {
  type : String,
  required : true
 },
 name : {
    type : String,
    required : true
 },
 rateperkm : {
    type : Number,
    required : true
 },
 available_Date : {
    type : Date,
    required : true
 },
 Book :{
    type : String,
    required : true
 },
 fare :{
    type : String,
    required : true
 }
});

module.exports = Car = mongoose.model('car',carSchema);