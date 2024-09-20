let mysql = require("mysql")

const conection = mysql.createConnection({
    host: "localhost",
    database: "saboria",
    user:"root",
    password:""
})

conection.connect(function(err) {
    if (err) {
        throw err;
    } else {
        console.log("Conection succesful")
    }
})
module.exports = conection
conection.end()