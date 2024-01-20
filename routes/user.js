
const Express = require('express');
const router = Express.Router();

let { User } = require('../modals/user')
let webtoken = require('jsonwebtoken');


// Use body-parser middleware for Express.Router to parse JSON and form data
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));



// send users=[] to Client
router.get('/import-user', async function (req, res) {

    let allUsers = await User.find({});
    // console.log(allUsers);
    res.json(allUsers); // Js ki item response ma send kerna ka liya
    // string send kerna ka liya
    // res.send('only string');
    // file send kerna ka liya
    // res.sendFile();
})

// Create User
router.post('/createUser', async function (req, res) {

    let data = { ...req.body, img: req.file.filename }
    let newUser = new User(data)
    await newUser.save()
    res.send({ succes: true })
})

// Update User
// router.put('/update-user', async function (req, res) {

//     let data = { ...req.body, img: req.file.filename }
//     let userIndex = await User.findOneAndUpdate({ _id: req.body._id }, data, { new: true });
//     console.log(userIndex);
//     res.json({ succes: true });
// })


// Login User
router.post('/login-user', async function (req, res) {
    // console.log(req.body);
    let loggedUser = await User.findOne({ email: req.body.email, password: req.body.password })

    if (loggedUser) {
        webtoken.sign({ ...loggedUser }, 'cat say meow', { expiresIn: '2d' }, function (err, token) {
            res.json({ loggedUser, newToken: token });
        })
    }
    // res.json(loggedUser);
})

// token checker
router.post("/token-route", async function (req, res) {
    // console.log(req.body);
    webtoken.verify(req.body.LS_token, 'cat say meow', async function (err, myData) {
        console.log(myData);
        let loggedUser = await User.findOne({ email: myData._doc.email, password: myData._doc.password })
        res.json(loggedUser);
    })

})





// Del User
// router.delete('/del-user', async function (req, res) {
//     let userDel = await User.findByIdAndDelete(req.query.delId)
//     console.log(userDel);
//     res.json({ succes: true });
// })


// Edit User
// router.get('/edit-user', async function (req, res) {

//     let user = await User.findById(req.query.editId)
//     // console.log(req.query.editId);
//     res.json(user);
// })



module.exports = router