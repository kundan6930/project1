// Get HTML elements
const transactionForm = document.getElementById('transactionForm');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const transactionTable = document.getElementById('transactionTable');
const balanceElement = document.getElementById('balance');

// Initialize transaction array
let transactions = [];

// Add event listener for form submission
transactionForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form submission

  // Get user input values
  const description = descriptionInput.value;
  const amount = +amountInput.value; // Convert to number
  const type = typeInput.value;

  // Validate inputs
  if (description.trim() === '' || isNaN(amount)) {
    alert('Please enter valid values');
    return;
  }

  // Create new transaction object
  const transaction = {
    id: Date.now(),
    description,
    amount,
    type
  };

  // Add transaction to array
  transactions.push(transaction);

  // Clear form inputs
  descriptionInput.value = '';
  amountInput.value = '';

  // Update transaction table and balance
  updateTransactionTable();
  updateBalance();
});

// Delete transaction
function deleteTransaction(id) {
  // Find index of transaction with given id
  const index = transactions.findIndex((transaction) => transaction.id === id);

  // Remove transaction from array
  if (index > -1) {
    transactions.splice(index, 1);
  }

  // Update transaction table and balance
  updateTransactionTable();
  updateBalance();
}

// Update transaction table
function updateTransactionTable() {
  // Clear existing rows
  transactionTable.innerHTML = `
    <tr>
      <th>Description</th>
      <th>Amount</th>
      <th>Type</th>
      <th>Actions</th>
    </tr>
  `;

  // Add rows for each transaction
  transactions.forEach((transaction) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${transaction.description}</td>
      <td>${transaction.amount}</td>
      <td class="${transaction.type}">${transaction.type}</td>
      <td><button onclick="deleteTransaction(${transaction.id})">Delete</button></td>
    `;
    transactionTable.appendChild(row);
  });
}

// Update balance
function updateBalance() {
  const income = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = income - expense;
  balanceElement.textContent = balance;
}
