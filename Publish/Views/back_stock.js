const express = require('express');
const router = express.Router();
const controller = require('../Models/stock');


/*
* Vai buscar todos os dados necessários da tabela stock a inseir na tabela a mostrar ao administrador
* Também mostra as opções de ver detalhes, editar e apagar.
*/
router.get("/", function(req,res){
    controller.all( rows => {
        res.render('list', {
            title: 'stock',
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
                    }),
                    actions: [{
                        label: '',
                        link: './stock/' + obj['stockID'],
                        image: {
                            src: './Models/Images/details.png'
                        },
                        tooltip: 'Detalhe'
                    }, {
                        label: '',
                        link: './stock/' + obj['stockID'],
                        image: {
                            src: './Models/Images/edit.png'
                        },
                        tooltip: 'Editar'
                    }, {
                        label: '',
                        link: '#',
                        image: {
                            src: './Models/Images/delete.png'
                        },
                        tooltip: 'Apagar',
                        events: [{
                            name: "onclick",
                            function: "apagar",
                            args: obj['stockID']
                        }]

                    }]
                }
            })
        });
    });
});


/*
* Vai mostrar ao administrador um form para inserir um/uma novo/nova stock
*/
router.get("/form", function(req,res){
    res.render("form", {
        title: 'stock',
        properties: Object.keys({"quantity":{"description":"quantity of a product","type":"integer"}}).map(
            key => {
                return {
                    name: key,
                    type: {"quantity":{"description":"quantity of a product","type":"integer"}}[key].type
                }
            }
        ),
        references: [{"model":"product","label":"productQuantity","relation":"1-M","nonDependent":true}],
        hasReferences: [{"model":"product","label":"productQuantity","relation":"1-M","nonDependent":true}].length !== 0
    });
});

/*
* Vai mostrar ao administrador os detalhes de um/uma determinado/a stock
*/
// nos temos de ir buscar todos dados e envia-la para o res.render 
router.get("/:id", function(req,res){
    controller.get( req.params.id, obj => {
        res.render("details", {
            title: 'stock',
            properties: Object.keys(obj).map(key => {
                return {
                    name: key,
                    value: obj[key]
                }
            })
        })
    });
});

module.exports = router;