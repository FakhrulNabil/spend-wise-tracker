const balance = document.getElementById('balance');
const list = document.getElementById('list');
const form = document.getElementById('transaction-form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// 1. Create a place to store our data
let transactions = [];

// 2. Function to add a transaction
function addTransaction(e) {
    e.preventDefault(); // Prevents the page from refreshing on submit

    const transaction = {
        id: Math.floor(Math.random() * 1000000),
        text: text.value,
        amount: +amount.value // The '+' converts the string to a number
    };

    transactions.push(transaction);
    updateDOM();
    
    // Clear inputs
    text.value = '';
    amount.value = '';
}

// 3. Function to update the UI
function updateDOM() {
    list.innerHTML = ''; // Clear the list first

    transactions.forEach(transaction => {
        const sign = transaction.amount < 0 ? '-' : '+';
        const item = document.createElement('li');

        // Add class based on value
        item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

        item.innerHTML = `
            ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
        `;

        list.appendChild(item);
    });

    updateBalance();
}

// 4. Function to calculate the total balance
function updateBalance() {
    const total = transactions
        .reduce((acc, item) => (acc += item.amount), 0)
        .toFixed(2);

    balance.innerText = `$${total}`;
}

form.addEventListener('submit', addTransaction);