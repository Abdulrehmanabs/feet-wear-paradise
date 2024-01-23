


let mongoose = require('mongoose');
let dbConnect = mongoose.connect('mongodb+srv://abdulrehmanabs:abs786@cluster0.x3s1kd8.mongodb.net/feet-wear-paradise').then((result) => {
    console.log("DB CONNECTED...........................................................................")
}).catch((error) => {
    console.log(error)
});

module.exports = dbConnect;