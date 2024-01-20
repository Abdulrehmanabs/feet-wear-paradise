
let mongoose = require('mongoose');

let userSchema = new mongoose.Schema(
    {
        email: String,
        password: String,
        img: String,
        ads: Array
    }
)

let User = mongoose.model('user', userSchema);
module.exports.User = User;
