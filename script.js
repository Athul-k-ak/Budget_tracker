const incomeForm = document.getElementById("income-form");
const incomeAmount = document.getElementById("income-amount");
const displayIncome = document.getElementById("displayIncome");
const balance = document.getElementById("balance");

const expenseForm = document.getElementById("expense-form");
const expenseAmount = document.getElementById("expense-amount");
const expenseDesc = document.getElementById("expenseDesc");
const expenseCategory = document.getElementById("expense-category");
const expenseDate = document.getElementById("expense-date");

const startDate = document.getElementById("start-date");
const endDate = document.getElementById("end-date");
const filterBtn = document.getElementById("filter-btn");
const expenseTableBody = document.getElementById("expenseTableBody");

const totalExpenseDisplay = document.getElementById("totalExpenseDisplay"); 

let income = 0;
let expenses = [];

// Function to calculate and display total expenses
const displayTotalExpense = (filteredExpenses = expenses) => {
    const totalExpense = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalExpenseDisplay.textContent = `Total Expense: ₹ ${totalExpense}`; 
};

// Add income
incomeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    income = parseInt(incomeAmount.value);
    incomeAmount.value = "";
    displayIncome.textContent = `₹ ${income}`;
    updateBalance();
});

// Add expense
expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const expense = {
        description: expenseDesc.value,
        amount: parseInt(expenseAmount.value),
        category: expenseCategory.value,
        date: expenseDate.value
    };
    expenses.push(expense);
    expenseDesc.value = "";
    expenseAmount.value = "";
    expenseDate.value = "";
    expenseCategory.value = "Food";
    addExpenseToTable(expense);
    updateBalance();
    displayTotalExpense(); 
});

// Add expense to table
const addExpenseToTable = (expense) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${expense.description}</td>
        <td>Rs ${expense.amount}</td>
        <td>${expense.category}</td>
        <td>${expense.date}</td>
        <td><button class="btn btn-danger btn-sm" onclick="removeExpense('${expense.date}')">Delete</button></td>
    `;

    expenseTableBody.appendChild(row);
};

// Remove expense
const removeExpense = (date) => {
    expenses = expenses.filter((expense) => expense.date !== date);
    updateExpenseTable();
    updateBalance();
    displayTotalExpense(); 
};

// Update expense table
const updateExpenseTable = () => {
    expenseTableBody.innerHTML = "";
    expenses.forEach((expense) => addExpenseToTable(expense));
};

// Update balance
const updateBalance = () => {
    const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const currentBalance = income - totalExpense;
    balance.textContent = `₹ ${currentBalance}`;
    balance.classList.remove("text-danger", "text-success");
    if (currentBalance < 0) {
        balance.classList.add("text-danger");
    } else {
        balance.classList.add("text-success");
    }
};

// Filter expenses by date range
filterBtn.addEventListener("click", () => {
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);
    filterExpensesByDateRange(start, end);
});

// Filter expenses by date range
const filterExpensesByDateRange = (start, end) => {
    expenseTableBody.innerHTML = "";
    const filteredExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= start && expenseDate <= end;
    });

    filteredExpenses.forEach((expense) => addExpenseToTable(expense));
    displayTotalExpense(filteredExpenses);
};

// Initial call to display total expenses
displayTotalExpense(); 
