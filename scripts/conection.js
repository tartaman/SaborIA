let mysql = require("mysql")

let conetion = mysql.createConnection({
    host: "localhost",
    database: "saboria",
    user:"root",
    password:""
})

conetion.connect(function(err) {
    if (err) {
        throw err;
    } else {
        console.log("Conection succesful")
    }

})

conetion.end()