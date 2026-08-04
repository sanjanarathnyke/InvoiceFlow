const express = require("express");
const route = express.Router();

const {
    createCompany,
    getCompanies,
    getCompany,
    updateCompany
} = require("../controllers/companyController");

route.post("/", createCompany);
route.get("/", getCompanies);
route.get("/:id", getCompany);
route.put("/:id", updateCompany);

module.exports = route;