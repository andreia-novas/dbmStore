const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const api = require('../Controllers/api.js');

/**
const backoffice = require('../Controllers/backoffice.js');
**/
const bodyParser = require('body-parser');

//Permite converter os dados que vem dos formulários
app.use(bodyParser.urlencoded());

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache'); //extensão dos ficheiros das views
app.set('views', 'C:/Users/Andreia/Desktop/P1_AndreiaP_150221021_AndreiaN_150221080_BernardoG_150221099/Models/Views'); //indicação de qual a pasta que irá conter as views

app.use('/api', api);

/**
app.use('/backoffice', backoffice);
**/
    const frontEndcategory= require('../Controllers/api_category.js');
    app.use('/category', frontEndcategory);
    const frontEndbrand= require('../Controllers/api_brand.js');
    app.use('/brand', frontEndbrand);
    const frontEndmodel= require('../Controllers/api_model.js');
    app.use('/model', frontEndmodel);
    const frontEndcomputer= require('../Controllers/api_computer.js');
    app.use('/computer', frontEndcomputer);
    const frontEndstock= require('../Controllers/api_stock.js');
    app.use('/stock', frontEndstock);
    const frontEndsale= require('../Controllers/api_sale.js');
    app.use('/sale', frontEndsale);
    const frontEndproduct= require('../Controllers/api_product.js');
    app.use('/product', frontEndproduct);



const server = app.listen(8082,function () {
    console.log('Example app listening on port 8082')
});