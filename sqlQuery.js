'use strict'
const mysql = require('mysql');

var client = mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATANAME,
    port: process.env.DB_PORT
});

client.connect();

const sqlQuery = async function(sqlStatement){
    try {
        return new Promise(function (resolve, reject) {
            client.query(sqlStatement, function (err, results) {
                if (err) {
                    console.log(err);
                }
                resolve(results)
            })
        })
        .then(function (result) {
            return(result)
        })
    }
    catch (err){
        console.log(err);
        return err;
    }
}

module.exports = sqlQuery;