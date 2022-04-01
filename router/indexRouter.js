'use strict'
const indexRouter = require("express").Router();
const indexHandler = require('../handler/indexHandler');
const userAuth = require('../userAuth');

indexRouter.use(indexHandler.indexStart)

//main page
indexRouter.get('/', (req, res) => res.render("index"));

indexRouter.get('/postStocK', userAuth.isAuth, (req, res) => res.render("postStock"));

indexRouter.post('/postStocK', userAuth.isAuth, indexHandler.postStocK);

indexRouter.get('/getStocK', userAuth.isAuth, (req, res) => res.render("getStock"));

indexRouter.get('/getStockData', userAuth.isAuth, indexHandler.getStockData);

indexRouter.get('/login', (req, res) => res.render("login"));

indexRouter.post('/login', userAuth.authUser);

indexRouter.get('/logined', (req, res) => res.render("index"));

indexRouter.get('/failLogin', (req, res) => res.render("login", {msg: "登入失敗"}));

indexRouter.get('/logouted', (req, res) => res.render("login", {msg2: "已登出"}));

indexRouter.get('/requestLogin', (req, res) => res.render("login", {msg: "請求登入"}));

indexRouter.get('/logout', userAuth.cancelAuth);

indexRouter.get('/password', userAuth.isAuth, (req, res) => res.render("password"));

indexRouter.put('/changePassword', userAuth.isAuth, indexHandler.changePassword);

indexRouter.delete('/deleteData', userAuth.isAuth, indexHandler.deleteData);

indexRouter.get('/admin', userAuth.isAuth, (req, res) => res.render("admin"));

indexRouter.get('/adminCalling', userAuth.isAuth, indexHandler.adminCalling);

indexRouter.get("/searchingData", userAuth.isAuth, indexHandler.searchingData)

module.exports = indexRouter;