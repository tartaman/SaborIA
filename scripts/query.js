let mysql = require("mysql")

const conection = mysql.createConnection({
    host: "localhost",
    database: "saboria",
    user:"root",
    password:""
})

conection.connect(function(err) {
    if (err) throw err;
    let sql = "SELECT ingrediente.Id_ingrediente, ingrediente.nombre, medida.simbolo FROM ingrediente INNER JOIN medida ON ingrediente.id_medida = medida.id_medida;"
    conection.query(sql, function(err,result,fields) {
        if (err) throw err;
        console.log(result)
    })
})

