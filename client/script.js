const API = "/api"; // server serves client so relative path works
// ---------- Auth & session ----------
async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");
  msg.innerText = "";

  try {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    // redirect to dashboard
    window.location.href = "dashboard.html";
  } catch (err) {
    msg.innerText = err.message;
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

// ---------- Dashboard logic ----------
async function ensureAuth() {
  const token = localStorage.getItem("token");
  if (!token) return window.location.href = "index.html";
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (document.getElementById("adminName")) document.getElementById("adminName").innerText = user.name || "";
}

// Fetch and render employees
async function loadEmployees() {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${API}/employees`, {
      headers: { "Authorization": "Bearer " + token }
    });
    if (!res.ok) throw new Error("Failed to load employees");
    const data = await res.json();
    renderTable(data.employees || []);
  } catch (err) {
    alert(err.message);
    logout();
  }
}

function renderTable(list) {
  const tbody = document.querySelector("#empTable tbody");
  tbody.innerHTML = "";
  list.forEach(emp => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.position || "-"}</td>
      <td>${emp.department || "-"}</td>
      <td>${emp.salary ?? 0}</td>
      <td class="actions">
        <button class="small" onclick="openEdit('${emp._id}')">Edit</button>
        <button class="small" onclick="delEmp('${emp._id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ---------- Modal create/edit ----------
const modal = document.getElementById("modal");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
let editingId = null;

if (document.getElementById("addBtn")) {
  document.getElementById("addBtn").addEventListener("click", () => {
    openModal();
  });
  document.getElementById("logoutBtn").addEventListener("click", logout);
  document.getElementById("cancelBtn").addEventListener("click", closeModal);
  document.getElementById("saveBtn").addEventListener("click", saveEmployee);
  document.getElementById("search").addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase();
    const rows = Array.from(document.querySelectorAll("#empTable tbody tr"));
    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(q) ? "" : "none";
    });
  });

  // On load
  ensureAuth().then(loadEmployees);
}

function openModal(emp = null) {
  editingId = emp ? emp._id : null;
  document.getElementById("modalTitle").innerText = emp ? "Edit Employee" : "Add Employee";
  document.getElementById("empName").value = emp ? emp.name : "";
  document.getElementById("empEmail").value = emp ? emp.email : "";
  document.getElementById("empPosition").value = emp ? emp.position : "";
  document.getElementById("empDept").value = emp ? emp.department : "";
  document.getElementById("empSalary").value = emp ? emp.salary : "";
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
  editingId = null;
}

async function openEdit(id) {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${API}/employees/${id}`, { headers: { "Authorization": "Bearer " + token } });
    if (!res.ok) throw new Error("Failed to fetch employee");
    const data = await res.json();
    openModal(data.employee);
  } catch (err) {
    alert(err.message);
  }
}

async function saveEmployee() {
  const name = document.getElementById("empName").value.trim();
  const email = document.getElementById("empEmail").value.trim();
  const position = document.getElementById("empPosition").value.trim();
  const department = document.getElementById("empDept").value.trim();
  const salary = Number(document.getElementById("empSalary").value || 0);
  const token = localStorage.getItem("token");

  if (!name || !email) return alert("Name and email required");

  try {
    let res;
    if (editingId) {
      res = await fetch(`${API}/employees/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
        body: JSON.stringify({ name, email, position, department, salary })
      });
    } else {
      res = await fetch(`${API}/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
        body: JSON.stringify({ name, email, position, department, salary })
      });
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Save failed");
    closeModal();
    loadEmployees();
  } catch (err) {
    alert(err.message);
  }
}

async function delEmp(id) {
  if (!confirm("Delete employee?")) return;
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${API}/employees/${id}`, {
      method: "DELETE",
      headers: { "Authorization": "Bearer " + token }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Delete failed");
    loadEmployees();
  } catch (err) {
    alert(err.message);
  }
}

// If page is index.html (login) already loaded, attach login if not earlier
if (document.getElementById("loginBtn") === null && document.getElementById("email")) {
  // login called by inline listener in index.html. nothing to do.
}
