// Function to retrieve expenses from local storage
function getExpenses() {
    return JSON.parse(localStorage.getItem('expenses')) || [];
}

// Function to save expenses to local storage
function saveExpenses(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to render expenses list
function renderExpenses() {
    const expensesList = document.getElementById('expense-list');
    expensesList.innerHTML = '';

    const expenses = getExpenses();
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.description} - $${expense.amount}</span>
            <span class="delete" data-index="${index}">❌</span>
        `;
        expensesList.appendChild(li);
    });

    // Add event listener for delete expense
    expensesList.querySelectorAll('.delete').forEach(deleteButton => {
        deleteButton.addEventListener('click', deleteExpense);
    });
}

// Function to add expense
function addExpense(description, amount) {
    const expenses = getExpenses();
    expenses.push({ description, amount });
    saveExpenses(expenses);
    renderExpenses();
}

// Function to delete expense
function deleteExpense(event) {
    const index = event.target.dataset.index;
    const expenses = getExpenses();
    expenses.splice(index, 1);
    saveExpenses(expenses);
    renderExpenses();
}

// Event listener for form submission
document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value.trim());

    if (description && !isNaN(amount) && amount > 0) {
        addExpense(description, amount);
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
    } else {
        alert('Please enter a valid description and amount.');
    }
});

// Render initial expenses
renderExpenses();
