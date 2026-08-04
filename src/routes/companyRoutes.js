const express = require("express");

const route = express.Router();

const {
    createCompany,
    getCompany
}= require("../controllers/companyController");

route.post("/",createCompany);
route.get("/:id",getCompany);

module.exports = route;