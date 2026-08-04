const { Payment } = require("../models");

exports.createPayment = async (req, res) => {
  try {
    const {
      invoiceId,
      userId,
      amount,
      method,
      reference,
      paymentDate,
    } = req.body;

    const payment = await Payment.create({
      invoiceId,
      userId,
      amount,
      method,
      reference,
      paymentDate,
    });

    res.status(201).json({
      message: "Payment created successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getPayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    const { amount, method, reference, paymentDate } = req.body;
    await payment.update({ amount, method, reference, paymentDate });

    res.status(200).json({
      message: "Payment updated successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }
    await payment.destroy();
    res.status(200).json({
      message: "Payment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
