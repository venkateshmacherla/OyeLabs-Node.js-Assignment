const mysql = require('mysql');

const customers = [
  {
    email: 'anurag11@yopmail.com',
    name: 'anurag'
  },
  {
    email: 'sameer11@yopmail.com',
    name: 'sameer'
  },
  {
    email: 'ravi11@yopmail.com',
    name: 'ravi'
  },
  {
    email: 'akash11@yopmail.com',
    name: 'akash'
  },
  {
    email: 'anjali11@yopmail.com',
    name: 'anjai'
  },
  {
    email: 'santosh11@yopmail.com',
    name: 'santosh'
  }
];

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

// Function to insert customers into the database
function insertCustomers(customers) {
  customers.forEach(customer => {
    // Check if the email already exists
    pool.query('SELECT * FROM customers WHERE email = ?', [customer.email], (error, results) => {
      if (error) {
        console.error('Error querying the database:', error);
        return;
      }

      if (results.length > 0) {
        // Email exists, update the customer's name
        pool.query('UPDATE customers SET name = ? WHERE email = ?', [customer.name, customer.email], error => {
          if (error) {
            console.error('Error updating customer:', error);
          }
        });
      } else {
        // Email doesn't exist, insert a new customer
        pool.query('INSERT INTO customers (email, name) VALUES (?, ?)', [customer.email, customer.name], error => {
          if (error) {
            console.error('Error inserting customer:', error);
          }
        });
      }
    });
  });
}

// Call the function to insert customers
insertCustomers(customers);
