
let Express = require('express');
let app = Express();
const cors = require("cors");
// require('./db') // DB Coonection
let jwt = require('jsonwebtoken')
require("dotenv").config(); //library call for using .env in node.js
const path = require('path')


// routes of sub directory files..................
let userRoute = require('./routes/user')
app.use("/userApi", userRoute);


// Use body-parser middleware for Express.Routes to parse JSON and form data
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors()); //cors for frontend compatibility
app.use(Express.json()); // parse object data
app.use(Express.urlencoded({ extended: true }))  // parse form data



// middleware for build folder in Server
// and also required for publishing site
app.use(Express.static(path.join(__dirname, 'build')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})




// API's
let users = [];
let orders = [];

// Client side request
app.post("/create-user", async (req, res) => {
    // console.log(req.body);
    users = [...users, req.body]
    res.json({ success: 'You are Registered' })
})

// log in with token
app.post("/login-user", async (req, res) => {
    let logUser = users.find((user) => user.email === req.body.email && user.password === req.body.password)
    // console.log(logUser);
    if (logUser) {
        // generate token by jsonjwt library
        jwt.sign({ ...logUser }, 'Authenticated by ABS', { expiresIn: '1d' }, function (err, token) {
            res.json({ logUser, token });
        })
    } else {
        res.json('User Not Found'); // important for toast of error if user not found
    }
})

// verify token
app.get("/user-token", async (req, res) => {
    // console.log(req.query);
    // Verify token by jsonjwt library
    jwt.verify(req.query.token, 'Authenticated by ABS', async function (error, tokenData) {
        // console.log(tokenData);
        let verifyedUser = users.find((user) => user.email === tokenData.email && user.password === tokenData.password)
        res.json(verifyedUser);
    })
})


// add items to user orders 
app.post("/ordered_products", async (req, res) => {

    const { Orders } = req.body;
    // console.log(Orders);
    orders = [...Orders, ...orders]
    res.json({ success: true })
})




// pending page route
app.get("/pending_orders", async (req, res) => {
    res.json({ success: orders });
})

// error handler
app.get('*', (req, res) => {
    res.send('404 not found from server')
})



app.listen(process.env.port, function () {
    console.log('Server is listening at port = ' + process.env.port);
});
