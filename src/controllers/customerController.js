const { Customer } = require("../models");

exports.createCustomer = async (req, res) => {
  try {
    const { userId, name, email, phone, address } = req.body;

    const customer = await Customer.create({
      userId,
      name,
      email,
      phone,
      address,
    });
    res.status(201).json({
      message: "customer created successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const { name, email, phone, address } = req.body;
    await customer.update({ name, email, phone, address });

    res.json({
      message: "customer updated successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    await customer.destroy();
    res.json({
      message: "customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
