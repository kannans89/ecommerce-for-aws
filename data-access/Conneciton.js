var mysql = require('mysql');


    function getConnection(){

        return mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "flipkart"
        });

    }


    module.exports = getConnection;