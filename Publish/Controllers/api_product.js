var express = require('express');
var router = express.Router();


// 
const controller = require('../Models/product');
// nos temos de ir bucar todos dados e envia-la para o res.render 
router.get("/", function(req,res){
    controller.all( rows => {
        res.render("table", {
            columns: Object.keys(new controller()).map(key => {
            return {
            name: key
            };
            }),
            rows: rows.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    })
                }
            }),
            properties: []
        });
    });
});

module.exports = router;