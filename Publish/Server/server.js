const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const api = require('../Controllers/api.js');
//const backoffice = require('../Controllers/backoffice.js');

const bodyParser = require('body-parser');

//Permite converter os dados que vem dos formulários
app.use(bodyParser.urlencoded());

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache'); //extensão dos ficheiros das views
app.set('views', 'C:/Users/Andreia/Desktop/P1_AndreiaP_150221021_AndreiaN_150221080_BernardoG_150221099/Models/Views'); //indicação de qual a pasta que irá conter as views

app.use('/api', api);

//app.use('/backoffice', backoffice);

app.use(express.static('Images' + '/public'));

    const frontEndcategory= require('../Views/api_category.js');
    app.use('/front/category', frontEndcategory);
    const frontEndbrand= require('../Views/api_brand.js');
    app.use('/front/brand', frontEndbrand);
    const frontEndmodel= require('../Views/api_model.js');
    app.use('/front/model', frontEndmodel);
    const frontEndcomputer= require('../Views/api_computer.js');
    app.use('/front/computer', frontEndcomputer);
    const frontEndstock= require('../Views/api_stock.js');
    app.use('/front/stock', frontEndstock);
    const frontEndsale= require('../Views/api_sale.js');
    app.use('/front/sale', frontEndsale);
    const frontEndproduct= require('../Views/api_product.js');
    app.use('/front/product', frontEndproduct);

    const backEndcategory= require('../Views/back_category.js');
    app.use('/back/category', backEndcategory);
    const backEndbrand= require('../Views/back_brand.js');
    app.use('/back/brand', backEndbrand);
    const backEndmodel= require('../Views/back_model.js');
    app.use('/back/model', backEndmodel);
    const backEndcomputer= require('../Views/back_computer.js');
    app.use('/back/computer', backEndcomputer);
    const backEndstock= require('../Views/back_stock.js');
    app.use('/back/stock', backEndstock);
    const backEndsale= require('../Views/back_sale.js');
    app.use('/back/sale', backEndsale);
    const backEndproduct= require('../Views/back_product.js');
    app.use('/back/product', backEndproduct);

const server = app.listen(8082,function () {
    console.log('Example app listening on port 8082')
});

