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
                        link: '../../back/stock/' + obj['stockID'],
                        image: "fa fa-info-circle",
                        tooltip: 'Details'
                    }, {
                        label: '',
                        link: '../../back/stock/edit/' + obj['stockID'],
                        image: "fa fa-edit",
                        tooltip: 'Edit'
                    }, {
                        label: '',
                        link: '#',
                        image: "fa fa-trash",
                        tooltip: 'Delete',
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


/*
* Vai mostrar ao administrador um form para inserir um/uma novo/nova stock
*/
router.get("/edit/:id", function(req,res){
    controller.get( req.params.id, obj => {
        res.render("edit", {
            title: 'stock',
            id: req.params.id,
            properties: Object.keys({"quantity":{"description":"quantity of a product","type":"integer"}}).map(
                key => {
                    return {
                        name: key,
                        value: obj[key],
                        type: obj[key].type
                    }
                }
            ),
            references: [{"model":"product","label":"productQuantity","relation":"1-M","nonDependent":true}].map(element => {
                return {
                    model: element.model,
                    values: obj[element.model + 'ID'],
                    label: element.label
                }
            }),
            hasReferences: [{"model":"product","label":"productQuantity","relation":"1-M","nonDependent":true}].length !== 0
        })
    });
});


module.exports = router;