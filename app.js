const express = require('express');
const app = express();
const host = 'localhost';
const port = 5000;

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'server',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'appdb' 
});

var hits;

app.get('/', (req, res) => {
    const select = `SELECT * FROM hits`;

    connection.query(select, function(error,res) {
        if (error) throw error;
        hits = JSON.stringify(res)
    });

    res.send(`Hello from my sample Flask app, you have visited me ${hits} times`);

});

app.listen(port, () => {
    console.log(`Example app listening at ${host}:${port}`);

    const create = `CREATE TABLE IF NOT EXISTS hits_table (hits INT)`;

    connection.query(create, function(error, res) {
        if (error) throw error;
    });

    const replace = `REPLACE INTO hits_table (hits) values (1)`;

    connection.query(replace, function(error, res) {
        if (error) throw error;
    });

});
