var express = require('express');
var router = express.Router();

router.get("/", function(req,res){
    res.send("View: frontoffice")
})


router.get("/category", function(req, res) {
    res.send("View: Category");
})

router.get("/category/:id", function(req, res) {
    res.send("View: Category com id "+ req.params.id);
})


router.get("/brand", function(req, res) {
    res.send("View: Brand");
})

router.get("/brand/:id", function(req, res) {
    res.send("View: Brand com id "+ req.params.id);
})


router.get("/model", function(req, res) {
    res.send("View: Model");
})

router.get("/model/:id", function(req, res) {
    res.send("View: Model com id "+ req.params.id);
})


router.get("/computer", function(req, res) {
    res.send("View: Computer");
})

router.get("/computer/:id", function(req, res) {
    res.send("View: Computer com id "+ req.params.id);
})


router.get("/stock", function(req, res) {
    res.send("View: Stock");
})

router.get("/stock/:id", function(req, res) {
    res.send("View: Stock com id "+ req.params.id);
})


router.get("/sale", function(req, res) {
    res.send("View: Sale");
})

router.get("/sale/:id", function(req, res) {
    res.send("View: Sale com id "+ req.params.id);
})


router.get("/product", function(req, res) {
    res.send("View: Product");
})

router.get("/product/:id", function(req, res) {
    res.send("View: Product com id "+ req.params.id);
})


module.exports = router;