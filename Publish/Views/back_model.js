const express = require('express');
const router = express.Router();
const controller = require('../Models/model');


/*
* Vai buscar todos os dados necessários da tabela model a inseir na tabela a mostrar ao administrador
* Também mostra as opções de ver detalhes, editar e apagar.
*/
router.get("/", function(req,res){
    controller.all( rows => {
        res.render('list', {
            title: 'model',
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
                        link: './model/' + obj['modelID'],
                        image: {
                            src: './Models/Images/details.png'
                        },
                        tooltip: 'Detalhe'
                    }, {
                        label: '',
                        link: './model/' + obj['modelID'],
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
                            args: obj['modelID']
                        }]

                    }]
                }
            })
        });
    });
});


/*
* Vai mostrar ao administrador um form para inserir um/uma novo/nova model
*/
router.get("/form", function(req,res){
    res.render("form", {
        title: 'model',
        properties: Object.keys({"name":{"description":"model name","type":"string","unique":true}}).map(
            key => {
                return {
                    name: key,
                    type: {"name":{"description":"model name","type":"string","unique":true}}[key].type
                }
            }
        ),
        references: [{"model":"brand","label":"name","relation":"1-M"},{"model":"computer","label":"name","relation":"1-1","nonDependent":true}],
        hasReferences: [{"model":"brand","label":"name","relation":"1-M"},{"model":"computer","label":"name","relation":"1-1","nonDependent":true}].length !== 0
    });
});

/*
* Vai mostrar ao administrador os detalhes de um/uma determinado/a model
*/
// nos temos de ir buscar todos dados e envia-la para o res.render 
router.get("/:id", function(req,res){
    controller.get( req.params.id, obj => {
        res.render("details", {
            title: 'model',
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