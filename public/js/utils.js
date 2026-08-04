// ── InvoiceFlow Utilities ──────────────────────────────────────────────────

// ── Currency formatter ─────────────────────────────────────────────────────
function fmtCurrency(val) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(val) || 0);
}

// ── Date formatter ─────────────────────────────────────────────────────────
function fmtDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

// ── Status badge HTML ──────────────────────────────────────────────────────
function statusBadge(status = "") {
  const map = {
    paid:       "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    pending:    "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    overdue:    "bg-rose-500/20 text-rose-400 border border-rose-500/30",
    draft:      "bg-slate-500/20 text-slate-400 border border-slate-500/30",
    cancelled:  "bg-red-500/20 text-red-400 border border-red-500/30",
  };
  const cls = map[status?.toLowerCase()] || map.draft;
  return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}">${status || "draft"}</span>`;
}

// ── Toast notification ─────────────────────────────────────────────────────
function showToast(msg, type = "success") {
  const colors = { success: "from-emerald-600 to-emerald-500", error: "from-rose-600 to-rose-500", info: "from-indigo-600 to-indigo-500" };
  const icons  = { success: "✓", error: "✕", info: "ℹ" };
  const el = document.createElement("div");
  el.className = `fixed top-5 right-5 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-xl text-white text-sm font-medium shadow-2xl bg-gradient-to-r ${colors[type] || colors.info} transform translate-x-full transition-transform duration-300`;
  el.innerHTML = `<span class="text-base">${icons[type]}</span><span>${msg}</span>`;
  document.body.appendChild(el);
  requestAnimationFrame(() => { el.style.transform = "translateX(0)"; });
  setTimeout(() => {
    el.style.transform = "translateX(130%)";
    setTimeout(() => el.remove(), 350);
  }, 3200);
}

// ── Modal helpers ──────────────────────────────────────────────────────────
function openModal(id)  { document.getElementById(id)?.classList.remove("hidden"); }
function closeModal(id) { document.getElementById(id)?.classList.add("hidden"); }

// ── Skeleton row ──────────────────────────────────────────────────────────
function skeletonRows(cols = 5, rows = 4) {
  return Array.from({ length: rows }, () =>
    `<tr>${Array.from({ length: cols }, () =>
      `<td class="px-6 py-4"><div class="h-4 bg-slate-700 rounded animate-pulse w-3/4"></div></td>`
    ).join("")}</tr>`
  ).join("");
}

// ── Confirm dialog ─────────────────────────────────────────────────────────
function confirmDelete(msg = "Are you sure you want to delete this?") {
  return new Promise(resolve => {
    const overlay = document.createElement("div");
    overlay.className = "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm";
    overlay.innerHTML = `
      <div class="bg-slate-800 border border-slate-700 rounded-2xl p-7 max-w-sm w-full mx-4 shadow-2xl transform transition-all">
        <div class="flex items-center gap-4 mb-5">
          <div class="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 text-2xl">⚠</div>
          <div>
            <h3 class="text-white font-semibold text-lg">Confirm Delete</h3>
            <p class="text-slate-400 text-sm mt-0.5">${msg}</p>
          </div>
        </div>
        <div class="flex gap-3 justify-end">
          <button id="cd-cancel" class="px-5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm transition-colors">Cancel</button>
          <button id="cd-confirm" class="px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium transition-colors">Delete</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector("#cd-cancel").onclick  = () => { overlay.remove(); resolve(false); };
    overlay.querySelector("#cd-confirm").onclick = () => { overlay.remove(); resolve(true); };
  });
}

// ── Generate & download invoice PDF ───────────────────────────────────────
function downloadInvoicePdf(invoice) {
  const btn = document.getElementById("dl-label");
  if (btn) btn.textContent = "Preparing…";

  const co   = invoice.Company || {};
  const cust = invoice.Customer || {};
  const items = invoice.InvoiceItems || [];

  const rows = items.length
    ? items.map((it, i) => `
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:8px 10px;color:#334155;">${i + 1}</td>
        <td style="padding:8px 10px;color:#0f172a;font-weight:600;">${it.name || "—"}</td>
        <td style="padding:8px 10px;color:#475569;">${it.description || "—"}</td>
        <td style="padding:8px 10px;color:#475569;text-align:center;">${it.quantity}</td>
        <td style="padding:8px 10px;color:#475569;text-align:right;">${fmtCurrency(it.unitPrice)}</td>
        <td style="padding:8px 10px;color:#0f172a;font-weight:600;text-align:right;">${fmtCurrency(it.total)}</td>
      </tr>`).join("")
    : `<tr><td colspan="6" style="padding:16px;text-align:center;color:#94a3b8;">No line items.</td></tr>`;

  const html = `
    <div style="width:100%;max-width:720px;margin:0 auto;padding:32px;background:#ffffff;color:#0f172a;font-family:'ui-monospace','SFMono-Regular',Menlo,Consolas,monospace;font-size:13px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="vertical-align:top;">
            <p style="font-size:22px;font-weight:800;color:#4f46e5;margin:0 0 4px;">${co.name || "InvoiceFlow"}</p>
            <p style="margin:0;color:#475569;">${co.address || ""}</p>
            <p style="margin:0;color:#475569;">${co.email || ""}</p>
            <p style="margin:0;color:#475569;">${co.phone || ""}</p>
            ${co.taxNumber ? `<p style="margin:0;color:#475569;">Tax: ${co.taxNumber}</p>` : ""}
          </td>
          <td style="vertical-align:top;text-align:right;">
            <p style="font-size:26px;font-weight:800;margin:0 0 8px;color:#0f172a;">INVOICE</p>
            <p style="margin:0;color:#334155;">${invoice.invoiceNumber || "INV-" + invoice.id}</p>
            <p style="margin:0;color:#475569;">Issue: ${fmtDate(invoice.issueDate)}</p>
            <p style="margin:0;color:#475569;">Due: ${fmtDate(invoice.dueDate)}</p>
          </td>
        </tr>
      </table>
      <hr style="border:none;border-top:2px solid #4f46e5;margin:24px 0;">
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr>
          <td style="vertical-align:top;width:50%;">
            <p style="font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#94a3b8;margin:0 0 6px;">Bill To</p>
            <p style="margin:0;font-weight:700;color:#0f172a;">${cust.name || "—"}</p>
            <p style="margin:0;color:#475569;">${cust.address || ""}</p>
            <p style="margin:0;color:#475569;">${cust.email || ""}</p>
            <p style="margin:0;color:#475569;">${cust.phone || ""}</p>
          </td>
          <td style="vertical-align:top;text-align:right;">
            <p style="font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#94a3b8;margin:0 0 6px;">Status</p>
            <p style="margin:0;font-weight:700;color:#4f46e5;text-transform:capitalize;">${invoice.status || "draft"}</p>
          </td>
        </tr>
      </table>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="background:#4f46e5;color:#ffffff;">
            <th style="padding:10px;text-align:left;">#</th>
            <th style="padding:10px;text-align:left;">Item</th>
            <th style="padding:10px;text-align:left;">Description</th>
            <th style="padding:10px;text-align:center;">Qty</th>
            <th style="padding:10px;text-align:right;">Unit Price</th>
            <th style="padding:10px;text-align:right;">Total</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        <tr>
          <td style="width:60%;"></td>
          <td style="width:40%;">
            <table style="width:100%;border-collapse:collapse;font-size:13px;">
              <tr><td style="padding:6px 10px;color:#475569;">Subtotal</td><td style="padding:6px 10px;text-align:right;color:#0f172a;">${fmtCurrency(invoice.subtotal)}</td></tr>
              <tr><td style="padding:6px 10px;color:#475569;">Tax</td><td style="padding:6px 10px;text-align:right;color:#0f172a;">${fmtCurrency(invoice.tax)}</td></tr>
              <tr>
                <td style="padding:10px;color:#0f172a;font-weight:800;border-top:2px solid #0f172a;">Total</td>
                <td style="padding:10px;text-align:right;color:#4f46e5;font-weight:800;border-top:2px solid #0f172a;">${fmtCurrency(invoice.total)}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>`;

  const el = document.createElement("div");
  el.style.position = "fixed";
  el.style.left = "-9999px";
  el.style.top = "0";
  el.style.background = "#ffffff";
  el.innerHTML = html;
  document.body.appendChild(el);

  return html2pdf().set({
    margin: [10, 10, 10, 10],
    filename: `${(invoice.invoiceNumber || "invoice-" + invoice.id)}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  }).from(el).save()
    .then(() => { showToast("Invoice PDF downloaded!", "success"); })
    .catch(err => { showToast("PDF generation failed: " + err.message, "error"); })
    .finally(() => {
      el.remove();
      if (btn) btn.textContent = "Download PDF";
    });
}

// ── Sidebar active link ────────────────────────────────────────────────────
function highlightNav() {
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(a => {
    if (a.dataset.nav === page) {
      a.classList.add("bg-indigo-600/20", "text-indigo-400", "border-r-2", "border-indigo-500");
      a.classList.remove("text-slate-400");
    }
  });
}

// ── Render user name in nav ────────────────────────────────────────────────
function initNav() {
  highlightNav();
  const el = document.getElementById("nav-user-name");
  if (el) el.textContent = API.getUserName();
  document.getElementById("logout-btn")?.addEventListener("click", () => API.logout());
}

window.fmtCurrency = fmtCurrency;
window.fmtDate     = fmtDate;
window.statusBadge = statusBadge;
window.showToast   = showToast;
window.openModal   = openModal;
window.closeModal  = closeModal;
window.skeletonRows = skeletonRows;
window.confirmDelete = confirmDelete;
window.downloadInvoicePdf = downloadInvoicePdf;
window.initNav     = initNav;
