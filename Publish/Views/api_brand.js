const express = require('express');
const router = express.Router();

const controller = require('../Models/brand');

/*
* Vai buscar todos os dados necessários da tabela brand a inseir na tabela a mostrar ao utilizador 
* Também mostra a opção de ver detalhes
*/
// nos temos de ir buscar todos dados e envia-la para o res.render 
router.get("/", function(req,res){
    controller.all( rows => {
        res.render("table", {
            css:'./Public/styles.css',
            actions:['Details'],
            properties: [],
            title: 'brand',
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
                        link: './brand/' + obj['brandID'],
                        image: {
                            src: 'C:/Users/Andreia/Desktop/P1_AndreiaP_150221021_AndreiaN_150221080_BernardoG_150221099/Models/Images/details.png'
                            /*src: './Models/Images/details.png'*/
                        },
                        tooltip: 'Detalhe'
                    }]
                }
            }),
            columns: Object.keys(new controller()).map(key => {
                return {
                    name: key
                };
            })
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
            })
        })
    });
});

module.exports = router;