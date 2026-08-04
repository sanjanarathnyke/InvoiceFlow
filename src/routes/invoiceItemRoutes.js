const express = require("express");
const router = express.Router();

const {
  createInvoiceItem,
} = require("../controllers/invoiceItemController");

router.post("/", createInvoiceItem);

module.exports = router;
