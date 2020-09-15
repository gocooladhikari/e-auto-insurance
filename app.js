const express = require("express");
const expressLayout = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const session = require('express-session')
const mongoose = require("mongoose");
const passport = require('passport')
const httpMsgs = require('http-msgs')
var unirest = require("unirest")
const dotenv = require("dotenv")

dotenv.config()


// MOngoDB Atlas connection string
// mongodb://localhost:27017/infinity-3D
mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("DB connected!!!");
    }
)


const app = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Express session
app.use(
    session({
        secret: 'louis-e-auto',
        resave: true,
        saveUninitialized: true
    })
)

// Passport
app.use(passport.initialize())
app.use(passport.session())

// Public directories
app.use(express.static(__dirname + "/public"));

app.use('/uploads', express.static('uploads'))
app.use('/uploads', express.static('./uploads'))

// EJS
app.use(expressLayout)
app.set("view engine", "ejs");


app.get('/', (req, res) => [
    res.render('index')
   
])

app.use('/form', require('./routes/form'))


// Vin Geberator

// var req = unirest("GET", "https://vindecoder.p.rapidapi.com/decode_vin");

// req.query({
//     "vin": "4F2YU09161KM33122"
// })

// req.headers({
//     "x-rapidapi-host": "vindecoder.p.rapidapi.com",
//     "x-rapidapi-key":  "83d07d7120msh6ef7ae6fa7efbdfp16803cjsn10e0b95f6a1b",
//     "useQueryString": true
// })


// req.end(function (res) {
//     if (res.error) console.log(res.error);

//     console.log(res.body);
// })


app.use('*', (req, res) => {
    res.send('Page Not Found. 404!!!')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is up and running on port 3000");
});
