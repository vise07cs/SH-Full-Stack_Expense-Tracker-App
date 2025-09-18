const expenseList = document.getElementById("expenseList");
const addBtn = document.getElementById("addExpenseBtn");

async function fetchExpenses() {
  const res = await fetch("http://localhost:3010/expense/getExpenses");
  const expenses = await res.json();

  expenseList.innerHTML = ""; // clear old list
  expenses.forEach(exp => {
    const div = document.createElement("div");
    div.innerHTML = `
      ${exp.amount} - ${exp.description} (${exp.category})
      <button onclick="deleteExpense(${exp.id})">Delete</button>
    `;
    expenseList.appendChild(div);
  });
}

addBtn.addEventListener("click", async () => {
  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

  if (!amount || !description || !category) {
    alert("Please fill all fields!");
    return;
  }

  await fetch("http://localhost:3010/expense/addExpense", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, description, category,userId:1 })
  });

  // Refresh list
  fetchExpenses();
});

// Delete expense
async function deleteExpense(id) {
  await fetch(`http://localhost:3010/expense/deleteExpense/${id}`, {
    method: "DELETE",
  });
  fetchExpenses();
}

// Load expenses when page opens
window.onload = fetchExpenses;
