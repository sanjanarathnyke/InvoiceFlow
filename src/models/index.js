const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "users"
});

const Company = sequelize.define("Company", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    taxNumber: DataTypes.STRING
}, {
    tableName: "companies"
});

const Customer = sequelize.define("Customer", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING
}, {
    tableName: "customers"
});

const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2)
}, {
    tableName: "products"
});

const Invoice = sequelize.define("Invoice", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: DataTypes.INTEGER,
    companyId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    invoiceNumber: DataTypes.STRING,
    issueDate: DataTypes.DATEONLY,
    dueDate: DataTypes.DATEONLY,
    status: DataTypes.STRING,
    subtotal: DataTypes.DECIMAL(10, 2),
    tax: DataTypes.DECIMAL(10, 2),
    total: DataTypes.DECIMAL(10, 2)
}, {
    tableName: "invoices"
});

const InvoiceItem = sequelize.define("InvoiceItem", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    invoiceId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    unitPrice: DataTypes.DECIMAL(10, 2),
    total: DataTypes.DECIMAL(10, 2)
}, {
    tableName: "invoiceItems"
});

const Payment = sequelize.define("Payment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    invoiceId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL(10, 2),
    method: DataTypes.STRING,
    reference: DataTypes.STRING,
    paymentDate: DataTypes.DATEONLY
}, {
    tableName: "payments"
});


// User -> Companies
User.hasMany(Company, {
    foreignKey: "userId"
});

Company.belongsTo(User, {
    foreignKey: "userId"
});


// User -> Customers
User.hasMany(Customer, {
    foreignKey: "userId"
});

Customer.belongsTo(User, {
    foreignKey: "userId"
});


// User -> Products
User.hasMany(Product, {
    foreignKey: "userId"
});

Product.belongsTo(User, {
    foreignKey: "userId"
});


// User -> Invoices
User.hasMany(Invoice, {
    foreignKey: "userId"
});

Invoice.belongsTo(User, {
    foreignKey: "userId"
});


// Company -> Invoices
Company.hasMany(Invoice, {
    foreignKey: "companyId"
});

Invoice.belongsTo(Company, {
    foreignKey: "companyId"
});


// Customer -> Invoices
Customer.hasMany(Invoice, {
    foreignKey: "customerId"
});

Invoice.belongsTo(Customer, {
    foreignKey: "customerId"
});


// Invoice -> Invoice Items
Invoice.hasMany(InvoiceItem, {
    foreignKey: "invoiceId"
});

InvoiceItem.belongsTo(Invoice, {
    foreignKey: "invoiceId"
});


// Product -> Invoice Items
Product.hasMany(InvoiceItem, {
    foreignKey: "productId"
});

InvoiceItem.belongsTo(Product, {
    foreignKey: "productId"
});


// Invoice -> Payments
Invoice.hasMany(Payment, {
    foreignKey: "invoiceId"
});

Payment.belongsTo(Invoice, {
    foreignKey: "invoiceId"
});


// User -> Payments
User.hasMany(Payment, {
    foreignKey: "userId"
});

Payment.belongsTo(User, {
    foreignKey: "userId"
});


module.exports = {
    sequelize,
    User,
    Company,
    Customer,
    Product,
    Invoice,
    InvoiceItem,
    Payment
};
