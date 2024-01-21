
let Express = require('express');
let app = Express();
const cors = require("cors");
let jwt = require('jsonwebtoken')
require("dotenv").config(); //library call for using .env in node.js

const path = require('path')




app.use(cors()); //cors for frontend compatibility
app.use(Express.json()); // parse object data
app.use(Express.urlencoded({ extended: true }))  // parse form data



// middleware for build folder in Server
// and also required for publishing site
app.use(Express.static('./build'));
// app.use(Express.static(path.join(__dirname, 'build')))







// API's
let users = [];
let orders = [];

// Client side request
app.post("/create-user", async (req, res) => {
    users = [...users, req.body]
    console.log(users);
    res.json({ success: 'You are Registered' })
})

// log in with token
app.post("/login-user", async (req, res) => {
    let logUser = users.find((user) => user.email === req.body.email && user.password === req.body.password)
    console.log(logUser);
    if (logUser) {
        // generate token by jsonjwt library
        jwt.sign({ ...logUser }, 'Authenticated by ABS', { expiresIn: '1d' }, function (err, token) {
            res.json({ logUser, token });
        })
    } else {
        res.json({ success: 'User Not Found' }); // important for toast of error if user not found
    }
})

// verify token
app.get("/user-token", async (req, res) => {
    console.log(req.query);

    if (req.query) {
        // Verify token by jsonjwt library
        jwt.verify(req.query.token, 'Authenticated by ABS', async function (error, tokenData) {
            // console.log(tokenData);
            let verifyedUser = users.find((user) => user.email === tokenData.email && user.password === tokenData.password)
            res.json({ success: verifyedUser });
        })
    }
})


// add items to user orders 
app.post("/ordered_products", async (req, res) => {

    const { Orders } = req.body;
    console.log(Orders);
    orders = [...Orders, ...orders]
    res.json({ success: true })
})




// pending page route
app.get("/get-pending-orders", async (req, res) => {
    console.log(req.query);
    if (req.query) {
        res.json({ success: orders });
    }
})



// error handler recomended in testing & server
// always use in bottom because there are more routes of get 
// that can be distroyed by this so use path '/' in below
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// app.get('*', (req, res) => {
//     res.send('404 not found from server')
// })




app.listen(process.env.port || 6080, function () {
    console.log('Server is listening at port = ' + process.env.port);
});
