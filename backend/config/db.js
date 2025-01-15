import mysql from 'mysql2';

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost', // Database host
  user: 'root',      // Database user
  password: '',      // Database password
  database: 'analytics' // Database name
});

// Connect to the database and log any errors
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database'); // Log successful connection
});

// Export the database connection for use in other files
export default db;