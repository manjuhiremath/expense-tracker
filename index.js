function getExpenses() {
    const expenses = localStorage.getItem('expenses');
    return expenses ? JSON.parse(expenses) : [];
  }

  function saveExpenses(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  
  function renderExpenses() {
    const expenses = getExpenses();
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = ''; 

    expenses.forEach((expense, index) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'expense-item');
      li.innerHTML = `
        <strong>${expense.amount}</strong> - ${expense.description} (${expense.category})
        <button class="btn btn-sm btn-warning float-end ms-2 edit-btn">Edit</button>
        <button class="btn btn-sm btn-danger float-end delete-btn">Delete</button>
      `;
      
      li.querySelector('.delete-btn').addEventListener('click', function () {
        deleteExpense(index);
      });

      li.querySelector('.edit-btn').addEventListener('click', function () {
        editExpense(index);
      });

      expenseList.appendChild(li);
    });
  }

  function addExpense() {
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    if (amount && description && category) {
      const newExpense = { amount, description, category };
      const expenses = getExpenses();
      expenses.push(newExpense);
      saveExpenses(expenses);
      renderExpenses();
      
      document.getElementById('amount').value = '';
      document.getElementById('description').value = '';
      document.getElementById('category').value = 'Food';
    } else {
      alert('Please fill out all fields.');
    }
  }

  function deleteExpense(index) {
    const expenses = getExpenses();
    expenses.splice(index, 1);
    saveExpenses(expenses);
    renderExpenses();
  }

  function editExpense(index) {
    const expenses = getExpenses();
    const expense = expenses[index];

    document.getElementById('amount').value = expense.amount;
    document.getElementById('description').value = expense.description;
    document.getElementById('category').value = expense.category;

    deleteExpense(index);
  }

  document.getElementById('addExpenseBtn').addEventListener('click', addExpense);

  window.onload = renderExpenses;