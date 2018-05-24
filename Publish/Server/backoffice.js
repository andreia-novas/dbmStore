var express = require('express');
var router = express.Router();

router.get("/category", function(req, res) {
    res.send("View: Backoffice Category");
})

router.get("/category/:id", function(req, res) {
    res.send("View: Backoffice Category com id "+ req.params.id);
})

router.get("/brand", function(req, res) {
    res.send("View: Backoffice Brand");
})

router.get("/brand/:id", function(req, res) {
    res.send("View: Backoffice Brand com id "+ req.params.id);
})

router.get("/model", function(req, res) {
    res.send("View: Backoffice Model");
})

router.get("/model/:id", function(req, res) {
    res.send("View: Backoffice Model com id "+ req.params.id);
})

router.get("/computer", function(req, res) {
    res.send("View: Backoffice Computer");
})

router.get("/computer/:id", function(req, res) {
    res.send("View: Backoffice Computer com id "+ req.params.id);
})

router.get("/stock", function(req, res) {
    res.send("View: Backoffice Stock");
})

router.get("/stock/:id", function(req, res) {
    res.send("View: Backoffice Stock com id "+ req.params.id);
})

router.get("/sale", function(req, res) {
    res.send("View: Backoffice Sale");
})

router.get("/sale/:id", function(req, res) {
    res.send("View: Backoffice Sale com id "+ req.params.id);
})

router.get("/product", function(req, res) {
    res.send("View: Backoffice Product");
})

router.get("/product/:id", function(req, res) {
    res.send("View: Backoffice Product com id "+ req.params.id);
})


module.exports = router;