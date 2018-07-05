var express = require('express');
var router = express.Router();

router.get("/", function(req,res){
    controller.all( rows => {
        res.render('list', {
            title: '',
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
                        link: './/Detalhe/' + obj.id,
                        image: {
                            src: '../Images/details.png'
                        },
                        tooltip: 'Detalhe'
                    }, {
                        label: '',
                        link: './/Editar/' + obj.id,
                        image: {
                            src: '../Images/edit.png'
                        },
                        tooltip: 'Editar'
                    }, {
                        label: '',
                        link: '#',
                        image: {
                            src: '../Images/delete.png'
                        },
                        tooltip: 'Apagar',
                        events: [{
                            name: "onclick",
                            function: "apagar",
                            args: obj.id
                        }]

                    }]
                }
            })
        });
    });
});

module.exports = router;