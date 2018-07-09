const express = require('express');
const router = express.Router();
const controller = require('../Models/category');


/*
* Vai buscar todos os dados necessários da tabela category a inseir na tabela a mostrar ao administrador
* Também mostra as opções de ver detalhes, editar e apagar.
*/
router.get("/", function(req,res){
    controller.all( rows => {
        res.render('list', {
            title: 'category',
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
                        link: '../../back/category/' + obj['categoryID'],
                        image: "fa fa-info-circle",
                        tooltip: 'Details'
                    }, {
                        label: '',
                        link: '../../back/category/edit/' + obj['categoryID'],
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
                            args: obj['categoryID']
                        }]

                    }]
                }
            })
        });
    });
});


/*
* Vai mostrar ao administrador um form para inserir um/uma novo/nova category
*/
router.get("/form", function(req,res){
    res.render("form", {
        title: 'category',
        properties: Object.keys({"name":{"description":"category name","type":"string","unique":true}}).map(
            key => {
                return {
                    name: key,
                    type: {"name":{"description":"category name","type":"string","unique":true}}[key].type
                }
            }
        ),
        references: [{"model":"computer","label":"name","relation":"1-M","nonDependent":true}],
        hasReferences: [{"model":"computer","label":"name","relation":"1-M","nonDependent":true}].length !== 0
    });
});


/*
* Vai mostrar ao administrador os detalhes de um/uma determinado/a category
*/
// nos temos de ir buscar todos dados e envia-la para o res.render 
router.get("/:id", function(req,res){
    controller.get( req.params.id, obj => {
        res.render("details", {
            title: 'category',
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
* Vai mostrar ao administrador um form para inserir um/uma novo/nova category
*/
router.get("/edit/:id", function(req,res){
    controller.get( req.params.id, obj => {
        res.render("edit", {
            title: 'category',
            id: req.params.id,
            properties: Object.keys({"name":{"description":"category name","type":"string","unique":true}}).map(
                key => {
                    return {
                        name: key,
                        value: obj[key],
                        type: obj[key].type
                    }
                }
            ),
            references: [{"model":"computer","label":"name","relation":"1-M","nonDependent":true}].map(element => {
                return {
                    model: element.model,
                    values: obj[element.model + 'ID'],
                    label: element.label
                }
            }),
            hasReferences: [{"model":"computer","label":"name","relation":"1-M","nonDependent":true}].length !== 0
        })
    });
});


module.exports = router;