"use strict"
const express = require("express")
//application middleware
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const hb = require('express-handlebars');
const path = require('path')
//to read .env file
require("dotenv").config();

const app = express();
app.set("views", "./views");
app.engine('handlebars', hb.engine({ defaultLayout: 'main' }));
app.set("view engine", "handlebars");

app.use('/js', express.static(path.join(__dirname, "node_modules/jquery/dist")))
app.use(express.static(path.join(__dirname, "public")))
//cookparser first, extended flase to use node library
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport
const expressSession = require('express-session');
const userAuth = require('./userAuth');
app.use(expressSession({
    secret: 'thisRealSecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
userAuth.authSetup(app)

const indexRouter = require("./router/indexRouter");

app.use("/", indexRouter);
app.listen(process.env.PORT || 3000);
module.exports = app;