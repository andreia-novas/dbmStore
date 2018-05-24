var express = require('express');
var router = express.Router();

/**
* Método que faz o mapeamento entre um objeto retornado pelo módulo sqlite num objeto de uma classe
criada
* @param {any} object Representa o objeto retornado pela query à abse de dados
* @param {any} type Representa o tipo de objeto que se pretende converter
* @returns Devolve um objeto do tipo "type" com o conteúdo que está no objeto "object"
*/
function mapping(object, type) {
    var obj = new type();
    Object.keys(object).forEach(function (value) {
        if (obj.hasOwnProperty(value)) //Se o objeto possuir o atributo que se está a verificar então recebe o valor retornado da query da base de dados
            obj[value] = object[value];
    });
    return obj;
}

    var Category = require('../Models/category.js');
    var Brand = require('../Models/brand.js');
    var Model = require('../Models/model.js');
    var Computer = require('../Models/computer.js');
    var Stock = require('../Models/stock.js');
    var Sale = require('../Models/sale.js');
    var Product = require('../Models/product.js');


    //Adicionar um Category à base de dados
    router.post('/category', function(req, res) {
        mapping(req.body, Category).save();
    });

    //Obter todos os Category da base de dados
    router.get('/category', function(req, res) {
        Category.all(function (rows){
            res.json(rows);
        });
    });

    //Obter um Category pelo seu id
    router.get('/category/:id', function(req, res) {
        Category.get(req.params.id, function(row){
            res.json(row);
        });
    });

    //Atualizar o Category com o id passado
    router.put('/category/:id', function(req, res) {
        var category = mapping(req.body, Category);
        category.categoryID = req.params.id;
        category.save(function (err) {
            res.json({
                success: !err
            });
        });
    });

    //Apagar o Category com o id passado
    router.delete('/category/:id', function (req, res){
        Category.delete(req.params.id, function (err){
            res.json({
                success: !err
            });
        });
    });

    //Adicionar um Brand à base de dados
    router.post('/brand', function(req, res) {
        mapping(req.body, Brand).save();
    });

    //Obter todos os Brand da base de dados
    router.get('/brand', function(req, res) {
        Brand.all(function (rows){
            res.json(rows);
        });
    });

    //Obter um Brand pelo seu id
    router.get('/brand/:id', function(req, res) {
        Brand.get(req.params.id, function(row){
            res.json(row);
        });
    });

    //Atualizar o Brand com o id passado
    router.put('/brand/:id', function(req, res) {
        var brand = mapping(req.body, Brand);
        brand.brandID = req.params.id;
        brand.save(function (err) {
            res.json({
                success: !err
            });
        });
    });

    //Apagar o Brand com o id passado
    router.delete('/brand/:id', function (req, res){
        Brand.delete(req.params.id, function (err){
            res.json({
                success: !err
            });
        });
    });

    //Adicionar um Model à base de dados
    router.post('/model', function(req, res) {
        mapping(req.body, Model).save();
    });

    //Obter todos os Model da base de dados
    router.get('/model', function(req, res) {
        Model.all(function (rows){
            res.json(rows);
        });
    });

    //Obter um Model pelo seu id
    router.get('/model/:id', function(req, res) {
        Model.get(req.params.id, function(row){
            res.json(row);
        });
    });

    //Atualizar o Model com o id passado
    router.put('/model/:id', function(req, res) {
        var model = mapping(req.body, Model);
        model.modelID = req.params.id;
        model.save(function (err) {
            res.json({
                success: !err
            });
        });
    });

    //Apagar o Model com o id passado
    router.delete('/model/:id', function (req, res){
        Model.delete(req.params.id, function (err){
            res.json({
                success: !err
            });
        });
    });

    //Adicionar um Computer à base de dados
    router.post('/computer', function(req, res) {
        mapping(req.body, Computer).save();
    });

    //Obter todos os Computer da base de dados
    router.get('/computer', function(req, res) {
        Computer.all(function (rows){
            res.json(rows);
        });
    });

    //Obter um Computer pelo seu id
    router.get('/computer/:id', function(req, res) {
        Computer.get(req.params.id, function(row){
            res.json(row);
        });
    });

    //Atualizar o Computer com o id passado
    router.put('/computer/:id', function(req, res) {
        var computer = mapping(req.body, Computer);
        computer.computerID = req.params.id;
        computer.save(function (err) {
            res.json({
                success: !err
            });
        });
    });

    //Apagar o Computer com o id passado
    router.delete('/computer/:id', function (req, res){
        Computer.delete(req.params.id, function (err){
            res.json({
                success: !err
            });
        });
    });

    //Adicionar um Stock à base de dados
    router.post('/stock', function(req, res) {
        mapping(req.body, Stock).save();
    });

    //Obter todos os Stock da base de dados
    router.get('/stock', function(req, res) {
        Stock.all(function (rows){
            res.json(rows);
        });
    });

    //Obter um Stock pelo seu id
    router.get('/stock/:id', function(req, res) {
        Stock.get(req.params.id, function(row){
            res.json(row);
        });
    });

    //Atualizar o Stock com o id passado
    router.put('/stock/:id', function(req, res) {
        var stock = mapping(req.body, Stock);
        stock.stockID = req.params.id;
        stock.save(function (err) {
            res.json({
                success: !err
            });
        });
    });

    //Apagar o Stock com o id passado
    router.delete('/stock/:id', function (req, res){
        Stock.delete(req.params.id, function (err){
            res.json({
                success: !err
            });
        });
    });

    //Adicionar um Sale à base de dados
    router.post('/sale', function(req, res) {
        mapping(req.body, Sale).save();
    });

    //Obter todos os Sale da base de dados
    router.get('/sale', function(req, res) {
        Sale.all(function (rows){
            res.json(rows);
        });
    });

    //Obter um Sale pelo seu id
    router.get('/sale/:id', function(req, res) {
        Sale.get(req.params.id, function(row){
            res.json(row);
        });
    });

    //Atualizar o Sale com o id passado
    router.put('/sale/:id', function(req, res) {
        var sale = mapping(req.body, Sale);
        sale.saleID = req.params.id;
        sale.save(function (err) {
            res.json({
                success: !err
            });
        });
    });

    //Apagar o Sale com o id passado
    router.delete('/sale/:id', function (req, res){
        Sale.delete(req.params.id, function (err){
            res.json({
                success: !err
            });
        });
    });

    //Adicionar um Product à base de dados
    router.post('/product', function(req, res) {
        mapping(req.body, Product).save();
    });

    //Obter todos os Product da base de dados
    router.get('/product', function(req, res) {
        Product.all(function (rows){
            res.json(rows);
        });
    });

    //Obter um Product pelo seu id
    router.get('/product/:id', function(req, res) {
        Product.get(req.params.id, function(row){
            res.json(row);
        });
    });

    //Atualizar o Product com o id passado
    router.put('/product/:id', function(req, res) {
        var product = mapping(req.body, Product);
        product.productID = req.params.id;
        product.save(function (err) {
            res.json({
                success: !err
            });
        });
    });

    //Apagar o Product com o id passado
    router.delete('/product/:id', function (req, res){
        Product.delete(req.params.id, function (err){
            res.json({
                success: !err
            });
        });
    });

module.exports = router;