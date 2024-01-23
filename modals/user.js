
let mongoose = require('mongoose');


// User schema
let userSchema = new mongoose.Schema(
    { email: String, password: String, first: String, last: String }
)

// Orders schema
let OrderSchema = new mongoose.Schema(
    { owner: String, title: String, dic: String, price: String, img: String, size: String }
)

// creating and importing all users data in this var 
let User = mongoose.model('user', userSchema);
let Order = mongoose.model('order', OrderSchema);


module.exports = { User, Order };
