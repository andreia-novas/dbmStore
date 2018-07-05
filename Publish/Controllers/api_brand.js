const express = require('express');
const router = express.Router();

const controller = require('../Models/brand');

/*
* Vai buscar todos os dados necessários da tabela brand a inseir na tabela a mostrar ao utilizador 
*/
// nos temos de ir buscar todos dados e envia-la para o res.render 
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
            properties: [],
            title: 'brand'
        });
    });
});

/*
* Vai mostrar ao utilizador os detalhes de um/uma determinado/a brand
*/
// nos temos de ir buscar todos dados e envia-la para o res.render 
router.get("/:id", function(req,res){
    controller.get( req.params.id, obj => {
        res.render("details", {
            title: 'brand',
            properties: Object.keys(obj).map(key => {
                return {
                    name: key,
                    value: obj[key]
                }
            })/*,
            actions: [{
                label: '',
                link: './brand/Detalhe/' + obj.id,
                image: {
                    src: './Models/Images/details.png'
                },
                tooltip: 'Detalhe'
            }]*/
        })
    });
});

module.exports = router;