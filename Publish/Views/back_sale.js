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
                        link: './sale/' + obj['saleID'],
                        image: {
                            src: './Models/Images/details.png'
                        },
                        tooltip: 'Detalhe'
                    }, {
                        label: '',
                        link: './sale/' + obj['saleID'],
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

module.exports = router;