const {
  Invoice,
  InvoiceItem,
  Customer,
  Company,
  Product,
} = require("../models");

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
      subtotal,
      tax,
      total,
      items = [],
    } = req.body;

    // Accept pre-calculated totals from frontend, or calculate from items
    let calcSubtotal = subtotal !== undefined ? parseFloat(subtotal) : 0;
    let calcTax = tax !== undefined ? parseFloat(tax) : 0;
    let calcTotal = total !== undefined ? parseFloat(total) : 0;

    if (subtotal === undefined && items.length > 0) {
      items.forEach((item) => {
        calcSubtotal += item.quantity * parseFloat(item.unitPrice);
      });
      calcTotal = calcSubtotal + calcTax;
    }

    const invoice = await Invoice.create({
      userId,
      companyId,
      customerId,
      invoiceNumber,
      issueDate,
      dueDate,
      status,
      subtotal: calcSubtotal,
      tax: calcTax,
      total: calcTotal,
    });

    if (items.length > 0) {
      const invoiceItems = items.map((item) => ({
        invoiceId: invoice.id,
        productId: item.productId || null,
        name: item.name,
        description: item.description || null,
        quantity: item.quantity,
        unitPrice: parseFloat(item.unitPrice),
        total: item.quantity * parseFloat(item.unitPrice),
      }));
      await InvoiceItem.bulkCreate(invoiceItems);
    }

    res.status(201).json({
      message: "Invoice created successfully",
      invoice,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      include: [
        { model: Customer, attributes: ["id", "name", "email"] },
        { model: Company, attributes: ["id", "name"] },
      ],
      order: [["id", "DESC"]],
    });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id, {
      include: [
        {
          model: Customer,
          attributes: ["id", "name", "email", "phone", "address"],
        },
        {
          model: Company,
          attributes: ["id", "name", "email", "phone", "address", "taxNumber"],
        },
        {
          model: InvoiceItem,
          include: [{ model: Product, attributes: ["id", "name"] }],
        },
      ],
    });
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    const {
      customerId,
      companyId,
      invoiceNumber,
      issueDate,
      dueDate,
      status,
      subtotal,
      tax,
      total,
    } = req.body;

    await invoice.update({
      customerId,
      companyId,
      invoiceNumber,
      issueDate,
      dueDate,
      status,
      subtotal,
      tax,
      total,
    });

    res.status(200).json({
      message: "Invoice updated successfully",
      invoice,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    await invoice.destroy();
    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
