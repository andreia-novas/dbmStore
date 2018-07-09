const express = require('express');
const router = express.Router();
const controller = require('../Models/sale');


/*
* Vai buscar todos os dados necessários da tabela sale a inseir na tabela a mostrar ao administrador
* Também mostra as opções de ver detalhes, editar e apagar.
*/
router.get("/", function(req,res){
    controller.all( rows => {
        res.render('list', {
            title: 'sale',
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
                        link: '../../back/sale/' + obj['saleID'],
                        image: "fa fa-info-circle",
                        tooltip: 'Details'
                    }, {
                        label: '',
                        link: '../../back/sale/edit/' + obj['saleID'],
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
                            args: obj['saleID']
                        }]

                    }]
                }
            })
        });
    });
});


/*
* Vai mostrar ao administrador um form para inserir um/uma novo/nova sale
*/
router.get("/form", function(req,res){
    res.render("form", {
        title: 'sale',
        properties: Object.keys({"date":{"description":"date of a sale","type":"string"}}).map(
            key => {
                return {
                    name: key,
                    type: {"date":{"description":"date of a sale","type":"string"}}[key].type
                }
            }
        ),
        references: [{"model":"product","label":"name","relation":"M-M","nonDependent":true}],
        hasReferences: [{"model":"product","label":"name","relation":"M-M","nonDependent":true}].length !== 0
    });
});


/*
* Vai mostrar ao administrador os detalhes de um/uma determinado/a sale
*/
// nos temos de ir buscar todos dados e envia-la para o res.render 
router.get("/:id", function(req,res){
    controller.get( req.params.id, obj => {
        res.render("details", {
            title: 'sale',
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
* Vai mostrar ao administrador um form para inserir um/uma novo/nova sale
*/
router.get("/edit/:id", function(req,res){
    controller.get( req.params.id, obj => {
        res.render("edit", {
            title: 'sale',
            id: req.params.id,
            properties: Object.keys({"date":{"description":"date of a sale","type":"string"}}).map(
                key => {
                    return {
                        name: key,
                        value: obj[key],
                        type: obj[key].type
                    }
                }
            ),
            references: [{"model":"product","label":"name","relation":"M-M","nonDependent":true}].map(element => {
                return {
                    model: element.model,
                    values: obj[element.model + 'ID'],
                    label: element.label
                }
            }),
            hasReferences: [{"model":"product","label":"name","relation":"M-M","nonDependent":true}].length !== 0
        })
    });
});


module.exports = router;