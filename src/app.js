const express = require("express");

const app = express();

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const customerRoutes = require("./routes/customerRoutes");
const productRoutes = require("./routes/productRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const invoiceItemRoutes = require("./routes/invoiceItemRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app.use("/api/users", userRoutes);
app.use("/api/companies",companyRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/invoice-items", invoiceItemRoutes);
app.use("/api/payments", paymentRoutes);

app.get("/",(req,res)=>{
    res.send("Invoceg api running")
});

module.exports = app;