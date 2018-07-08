const express = require('express');
const router = express.Router();
const controller = require('../Models/product');


/*
* Vai buscar todos os dados necessários da tabela product a inseir na tabela a mostrar ao administrador
* Também mostra as opções de ver detalhes, editar e apagar.
*/
router.get("/", function(req,res){
    controller.all( rows => {
        res.render('list', {
            title: 'product',
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
                        link: './product/' + obj['productID'],
                        image: {
                            src: './Models/Images/details.png'
                        },
                        tooltip: 'Detalhe'
                    }, {
                        label: '',
                        link: './product/' + obj['productID'],
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
                            args: obj['productID']
                        }]

                    }]
                }
            })
        });
    });
});


/*
* Vai mostrar ao administrador um form para inserir um/uma novo/nova product
*/
router.get("/form", function(req,res){
    res.render("form", {
        title: 'product',
        properties: Object.keys({"name":{"description":"product name","type":"string"},"price":{"description":"product price","type":"number"},"productQuantity":{"description":"quantity of a specific product","type":"integer"}}).map(
            key => {
                return {
                    name: key,
                    type: {"name":{"description":"product name","type":"string"},"price":{"description":"product price","type":"number"},"productQuantity":{"description":"quantity of a specific product","type":"integer"}}[key].type
                }
            }
        ),
        references: [{"model":"stock","label":"quantity","relation":"1-M"},{"model":"computer","label":"name","relation":"1-1"},{"model":"sale","label":"date","relation":"M-M"}],
        hasReferences: [{"model":"stock","label":"quantity","relation":"1-M"},{"model":"computer","label":"name","relation":"1-1"},{"model":"sale","label":"date","relation":"M-M"}].length !== 0
    });
});

/*
* Vai mostrar ao administrador os detalhes de um/uma determinado/a product
*/
// nos temos de ir buscar todos dados e envia-la para o res.render 
router.get("/:id", function(req,res){
    controller.get( req.params.id, obj => {
        res.render("details", {
            title: 'product',
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