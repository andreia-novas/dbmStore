const express = require('express');
const router = express.Router();
const controller = require('../Models/computer');


/*
* Vai buscar todos os dados necessários da tabela computer a inseir na tabela a mostrar ao administrador
* Também mostra as opções de ver detalhes, editar e apagar.
*/
router.get("/", function(req,res){
    controller.all( rows => {
        res.render('list', {
            title: 'computer',
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
                        link: '../../back/computer/' + obj['computerID'],
                        image: "fa fa-info-circle",
                        tooltip: 'Details'
                    }, {
                        label: '',
                        link: '../../back/computer/edit/' + obj['computerID'],
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
                            args: obj['computerID']
                        }]

                    }]
                }
            })
        });
    });
});


/*
* Vai mostrar ao administrador um form para inserir um/uma novo/nova computer
*/
router.get("/form", function(req,res){
    res.render("form", {
        title: 'computer',
        properties: Object.keys({"name":{"description":"computer name","type":"string"},"ram":{"description":"computer ram","type":"integer"},"processor":{"description":"computer processor","type":"string"},"gpu":{"description":"computer gpu","type":"string"},"weight":{"description":"computer weight","type":"number"},"height":{"description":"computer height","type":"number"},"width":{"description":"computer width","type":"number"}}).map(
            key => {
                return {
                    name: key,
                    type: {"name":{"description":"computer name","type":"string"},"ram":{"description":"computer ram","type":"integer"},"processor":{"description":"computer processor","type":"string"},"gpu":{"description":"computer gpu","type":"string"},"weight":{"description":"computer weight","type":"number"},"height":{"description":"computer height","type":"number"},"width":{"description":"computer width","type":"number"}}[key].type
                }
            }
        ),
        references: [{"model":"model","label":"name","relation":"1-1"},{"model":"category","label":"name","relation":"1-M"},{"model":"product","label":"name","relation":"1-1","nonDependent":true}],
        hasReferences: [{"model":"model","label":"name","relation":"1-1"},{"model":"category","label":"name","relation":"1-M"},{"model":"product","label":"name","relation":"1-1","nonDependent":true}].length !== 0
    });
});


/*
* Vai mostrar ao administrador os detalhes de um/uma determinado/a computer
*/
// nos temos de ir buscar todos dados e envia-la para o res.render 
router.get("/:id", function(req,res){
    controller.get( req.params.id, obj => {
        res.render("details", {
            title: 'computer',
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
* Vai mostrar ao administrador um form para inserir um/uma novo/nova computer
*/
router.get("/edit/:id", function(req,res){
    controller.get( req.params.id, obj => {
        res.render("edit", {
            title: 'computer',
            id: req.params.id,
            properties: Object.keys({"name":{"description":"computer name","type":"string"},"ram":{"description":"computer ram","type":"integer"},"processor":{"description":"computer processor","type":"string"},"gpu":{"description":"computer gpu","type":"string"},"weight":{"description":"computer weight","type":"number"},"height":{"description":"computer height","type":"number"},"width":{"description":"computer width","type":"number"}}).map(
                key => {
                    return {
                        name: key,
                        value: obj[key],
                        type: obj[key].type
                    }
                }
            ),
            references: [{"model":"model","label":"name","relation":"1-1"},{"model":"category","label":"name","relation":"1-M"},{"model":"product","label":"name","relation":"1-1","nonDependent":true}].map(element => {
                return {
                    model: element.model,
                    values: obj[element.model + 'ID'],
                    label: element.label
                }
            }),
            hasReferences: [{"model":"model","label":"name","relation":"1-1"},{"model":"category","label":"name","relation":"1-M"},{"model":"product","label":"name","relation":"1-1","nonDependent":true}].length !== 0
        })
    });
});


module.exports = router;