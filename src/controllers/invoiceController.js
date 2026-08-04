const { Invoice, InvoiceItem } = require("../models");

exports.createInvoice = async (req, res) => {
  try {
    const {
      userId,
      companyId,
      customerId,
      invoiceNumber,
      issueDate,
      dueDate,
      status = "draft",
      taxRate = 0,
      items = [],
    } = req.body;

    let subtotal = 0;
    items.forEach((item) => {
      subtotal += item.quantity * item.unitPrice;
    });
    const tax = (subtotal * taxRate) / 100;
    const total = subtotal + tax;

    const invoice = await Invoice.create({
      userId,
      companyId,
      customerId,
      invoiceNumber,
      issueDate,
      dueDate,
      status,
      subtotal,
      tax,
      total,
    });

    if (items.length > 0) {
      const invoiceItems = items.map((item) => ({
        invoiceId: invoice.id,
        productId: item.productId || null,
        name: item.name,
        description: item.description || null,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.quantity * item.unitPrice,
      }));
      await InvoiceItem.bulkCreate(invoiceItems);
    }

    res.status(201).json({
      message: "Invoice created successfully",
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }

    const {
      customerId,
      invoiceNumber,
      issueDate,
      dueDate,
      status,
      taxRate,
    } = req.body;

    await invoice.update({
      customerId,
      invoiceNumber,
      issueDate,
      dueDate,
      status,
      taxRate,
    });

    res.status(200).json({
      message: "Invoice updated successfully",
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }
    await invoice.destroy();
    res.status(200).json({
      message: "Invoice deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};