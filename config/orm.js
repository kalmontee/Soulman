const connection = require("./connection.js");

function printQuestionMarks(num) {
    let arr = [];

    for (let i = 0; i < num; i++) {
        arr.push("?");
    }
}

function objToSql(obj) {
    let arr = [];

    for (let key in obj) {
        let value = obj[key];

        if (Object.hasOwnProterty.call(obj, key)) {
            if (typeof value === "string") {
                // value = "'" + value + "'";
                value += "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

const orm = {
    all(tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, (err, results) => {
            if (err) throw err;
            cb(results);
        });
    },

    create(table, cols, vals, cb) {
        let queryString = 'INSERT INTO ' + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        connection.query(queryString, vals, (err, results) => {
            if (err) throw err;
            cb(results);
        });
    }
}

module.exports = orm;