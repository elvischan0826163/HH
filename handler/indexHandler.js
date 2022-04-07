'use strict'
const e = require("express");
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
        if(req.body.Amount == ""){
            var result = await sqlQuery(`INSERT INTO storesdata (Stock, Amount, Time, Cname, Caddress, Ccontect, Month, Store)  VALUES ("${req.body.Stock}", 0, "${req.body.Time}", "${req.body.Cname}", "${req.body.Caddress}", "${req.body.Ccontect}", "${req.body.Month}", "${req.user.store}");`);
        }
        else{
            var result = await sqlQuery(`INSERT INTO storesdata (Stock, Amount, Time, Cname, Caddress, Ccontect, Month, Store)  VALUES ("${req.body.Stock}", ${req.body.Amount}, "${req.body.Time}", "${req.body.Cname}", "${req.body.Caddress}", "${req.body.Ccontect}", "${req.body.Month}", "${req.user.store}");`);
        }
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
        var result = await sqlQuery(`SELECT *, DATE_ADD(Time, INTERVAL 1 DAY) as Time1 FROM storesdata WHERE Store = "${req.user.store}" ORDER BY Time DESC;`);
        res.json(result);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

exports.searchingData = async function (req, res, next) {
    try {
        var From, To;
            if (req.query.From != "") {
                From = req.query.From;
            }
            else {
                From = "0000-00-00"
            }
            if (req.query.To != "") {
                To = req.query.To;
            }
            else {
                To = "2222-02-02"
            }
            if (req.query.Cname != ""){
                console.log("checkingPoint1")
                console.log(`SELECT *, DATE_ADD(Time, INTERVAL 1 DAY) as Time1 FROM storesdata WHERE Time >= "${From}" AND Time <= '${To}' And Store = '${req.user.store}'And Cname REGEXP '${req.query.Cname}' ORDER BY Time DESC;`);
                var result = await sqlQuery(`SELECT *, DATE_ADD(Time, INTERVAL 1 DAY) as Time1 FROM storesdata WHERE Time >= "${From}" AND Time <= '${To}' And Store = '${req.user.store}'And Cname REGEXP '${req.query.Cname}' ORDER BY Time DESC;`);
                res.json(result);
            }
            else {
                console.log("checkingPoint2")
                console.log(req.query.Cname);
                console.log(req.query.From);
                console.log(req.query.To);
                var result = await sqlQuery(`SELECT *, DATE_ADD(Time, INTERVAL 1 DAY) as Time1 FROM storesdata WHERE Time >= "${From}" AND Time <= '${To}' And Store = '${req.user.store}' ORDER BY Time DESC;`);
                res.json(result);
            }
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
    try {
        console.log("delete")
        var result = await sqlQuery(`DELETE FROM storesdata WHERE id = ${req.body.id} And store = "${req.user.store}";`);
        res.json(result);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

exports.adminCalling = async function (req, res, next) {
    try {
        console.log()
        if (req.user.store == 'Admin') {
            var result = await sqlQuery(`SELECT id, Stock, Amount, DATE_ADD(Time, INTERVAL 1 DAY) as Time, Store FROM storesdata WHERE DATE_FORMAT(Time,'%d') = DATE_FORMAT(Now(),'%d') AND Time < DATE(NOW());`);
            res.json(result);
        }
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}


exports.customerCalling = async function (req, res, next) {
    try {
        console.log()
            var result = await sqlQuery(`SELECT *, DATE_ADD(Time, INTERVAL 1 DAY) as Time, Store FROM storesdata WHERE DATE_FORMAT(Time,'%d') = DATE_FORMAT(Now(),'%d') AND Time < DATE(NOW()) And store = "${req.user.store}";`);
            res.json(result);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}