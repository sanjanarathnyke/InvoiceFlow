// ── InvoiceFlow API Helper ─────────────────────────────────────────────────
const BASE_URL = "http://localhost:3000/api";

const API = {
  // ── Token helpers ──────────────────────────────────────────────────────────
  getToken()    { return localStorage.getItem("invoiceflow_token"); },
  setToken(t)   { localStorage.setItem("invoiceflow_token", t); },
  removeToken() { localStorage.removeItem("invoiceflow_token"); },
  getUserId()   { return localStorage.getItem("invoiceflow_userId"); },
  setUserId(id) { localStorage.setItem("invoiceflow_userId", String(id)); },
  getUserName() { return localStorage.getItem("invoiceflow_userName") || "User"; },
  setUserName(n){ localStorage.setItem("invoiceflow_userName", n); },

  // ── Guard: redirect to login if no token ──────────────────────────────────
  requireAuth() {
    if (!this.getToken()) { window.location.href = "/index.html"; return false; }
    return true;
  },

  // ── Core fetch ─────────────────────────────────────────────────────────────
  async request(method, path, body = null, auth = true) {
    const headers = { "Content-Type": "application/json" };
    if (auth && this.getToken()) headers["Authorization"] = `Bearer ${this.getToken()}`;
    const opts = { method, headers };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(BASE_URL + path, opts);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
    return data;
  },

  get(path, auth = true)        { return this.request("GET",    path, null, auth); },
  post(path, body, auth = true) { return this.request("POST",   path, body, auth); },
  put(path, body, auth = true)  { return this.request("PUT",    path, body, auth); },
  delete(path, auth = true)     { return this.request("DELETE", path, null, auth); },

  // ── Auth ───────────────────────────────────────────────────────────────────
  async login(email, password) {
    const data = await this.post("/users/login", { email, password }, false);
    if (data.token)    this.setToken(data.token);
    if (data.user?.id) this.setUserId(data.user.id);
    if (data.user?.name) this.setUserName(data.user.name);
    return data;
  },
  async register(name, email, password) {
    return this.post("/users/register", { name, email, password }, false);
  },
  logout() {
    this.removeToken();
    localStorage.removeItem("invoiceflow_userId");
    localStorage.removeItem("invoiceflow_userName");
    window.location.href = "/index.html";
  },

  // ── Customers ──────────────────────────────────────────────────────────────
  getCustomers()           { return this.get("/customers"); },
  getCustomer(id)          { return this.get(`/customers/${id}`); },
  createCustomer(data)     { return this.post("/customers", data); },
  updateCustomer(id, data) { return this.put(`/customers/${id}`, data); },
  deleteCustomer(id)       { return this.delete(`/customers/${id}`); },

  // ── Products ───────────────────────────────────────────────────────────────
  getProducts()            { return this.get("/products"); },
  getProduct(id)           { return this.get(`/products/${id}`); },
  createProduct(data)      { return this.post("/products", data); },
  updateProduct(id, data)  { return this.put(`/products/${id}`, data); },
  deleteProduct(id)        { return this.delete(`/products/${id}`); },

  // ── Invoices ───────────────────────────────────────────────────────────────
  getInvoices()            { return this.get("/invoices"); },
  getInvoice(id)           { return this.get(`/invoices/${id}`); },
  createInvoice(data)      { return this.post("/invoices", data); },
  updateInvoice(id, data)  { return this.put(`/invoices/${id}`, data); },
  deleteInvoice(id)        { return this.delete(`/invoices/${id}`); },

  // ── Invoice Items ──────────────────────────────────────────────────────────
  createInvoiceItem(data)  { return this.post("/invoice-items", data); },

  // ── Payments ───────────────────────────────────────────────────────────────
  getPayments()            { return this.get("/payments"); },
  createPayment(data)      { return this.post("/payments", data); },
  deletePayment(id)        { return this.delete(`/payments/${id}`); },

  // ── Company ────────────────────────────────────────────────────────────────
  getCompanies()           { return this.get("/companies"); },
  getCompany(id)           { return this.get(`/companies/${id}`); },
  createCompany(data)      { return this.post("/companies", data); },
  updateCompany(id, data)  { return this.put(`/companies/${id}`, data); },
};

window.API = API;
