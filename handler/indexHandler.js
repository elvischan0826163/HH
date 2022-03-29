'use strict'
const sqlQuery = require("../sqlQuery")

//initial set up
exports.indexStart = function (req, res, next) {
    console.log('indexRouter Start')
    console.log(req.originalUrl);
    next();
}

exports.postStocK = async function (req, res, next) {
    try {
        console.log("staring poststock function");
        var result = await sqlQuery(`INSERT INTO storesdata (Stock, Amount, Time, Cname, Caddress, Ccontect, Store)  VALUES ("${req.body.Stock}", ${req.body.Amount}, "${req.body.Time}", "${req.body.Cname}", "${req.body.Caddress}", "${req.body.Ccontect}", "${req.user.store}");`);
        return res.redirect("/postStocK");
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

exports.getStockData = async function (req, res, next) {
    try {
        console.log(req.user.store)
        var result = await sqlQuery(`SELECT *, DATE_ADD(Time, INTERVAL 1 DAY) as Time1 FROM storesdata WHERE Store = "${req.user.store}" ORDER BY 'time' DESC;`);
        res.json(result);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

exports.changePassword = async function (req, res, next) {
    try {
        console.log("change pw")
        var result = await sqlQuery(`UPDATE user SET password = "${req.body.password}" WHERE store = "${req.user.store}";`);
        res.json(result);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

exports.deleteData = async function (req, res, next) {
    try{
        console.log("delete")
        var result = await sqlQuery(`DELETE FROM storesdata WHERE id = ${req.body.id} And store = "${req.user.store}"`);
        res.json(result);
    }
    catch(error){
        console.log(error);
        res.sendStatus(400);
    }
}

exports.adminCalling = async function (req, res, next) {
    try {
        console.log()
        if (req.user.store == 'Admin'){
            var result = await sqlQuery(`SELECT id, Stock, Amount, DATE_ADD(Time, INTERVAL 1 DAY) as Time, Store FROM storesdata WHERE DATE_FORMAT(Time,'%d') = DATE_FORMAT(Now(),'%d');`);
            res.json(result);
        }
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}