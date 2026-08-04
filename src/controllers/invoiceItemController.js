const { InvoiceItem } = require("../models");

exports.createInvoiceItem = async (req, res) => {
  try {
    const {
      invoiceId,
      productId,
      name,
      description,
      quantity,
      unitPrice,
    } = req.body;

    const total = quantity * unitPrice;

    const invoiceItem = await InvoiceItem.create({
      invoiceId,
      productId,
      name,
      description,
      quantity,
      unitPrice,
      total,
    });

    res.status(201).json({
      message: "Invoice item created successfully",
      invoiceItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
