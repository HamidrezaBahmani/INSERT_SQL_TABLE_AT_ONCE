const mysql = require("mysql");

// Create a connection to your MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  port: 8111,
  user: "web_app",
  password: "test123",
  database: "web_app",
});

// Define the structure of your table
const tableDefinition = `
    CREATE TABLE IF NOT EXISTS your_table (
        column1 VARCHAR(255),
        column2 INT,
        column3 TEXT,
        -- Add more columns as needed with appropriate datatypes
        PRIMARY KEY (column1) -- Assuming column1 is a primary key
    );
`;

// Insert predefined and filled data into the table
const data = [
  ["John Doe", 25, "john@example.com"],
  ["Jane ss", 30, "jane@example.com"],
  // Add more rows as needed
];

const columns = ["column1", "column2", "column3"]; // Add the actual column names
const placeholders = columns.map(() => "?").join(", ");
const insertQuery = `INSERT INTO your_table (${columns.join(
  ", "
)}) VALUES ${data.map(() => `(${placeholders})`).join(", ")}`;

// Connect to the database and execute queries
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    return;
  }

  connection.query(tableDefinition, (err) => {
    if (err) {
      console.error("Error creating table:", err.message);
      connection.end();
      return;
    }

    const insertValues = data.flat();

    connection.query(insertQuery, insertValues, (err) => {
      if (err) {
        console.error("Error inserting data:", err.message);
      } else {
        console.log("Data inserted successfully.");
      }

      // Close the database connection
      connection.end();
    });
  });
});
