const mongoose = require('mongoose');
const config = require('config');

const connectToDb = ()=>{
    try {
        mongoose.connect(config.get('mongoURI'));
        console.log('Connected To DB');
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = connectToDb