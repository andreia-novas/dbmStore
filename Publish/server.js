var express = require('express');
var app = express();

var server = app.listen(8082,function () {
    console.log('Example app listening on port 8082')
});

function mapping(object, type) {
    var obj = new type();
    Object.keys(object).forEach(function (value) {
        if (obj.hasOwnProperty(value)) //Se o objeto possuir o atributo que se está a verificar então recebe o valor retornado da query da base de dados
            obj[value] = object[value];
    });
    return obj;
}

var Brand = require('./Models/brand.js');

app.get("/Brand/post", (req, res) => {
    new Brand("yeeeeeeyNadoeNada").save();
    res.send("yey");
});

app.get("/Brand/:id", (req,res) => {
    Brand.get(req.params.id, (row) => {
        res.json(row)
    });
});

app.get("/Brand/put/:id", (req, res) => {
    var obj = new Brand("amotemuito");
    obj.brandID = req.params.id
    console.log(obj)
    obj.save((err) => {
        res.json({
            success: !err
        });
    });
});