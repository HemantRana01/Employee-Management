# Employee Management System

This is an Employee Management System built with Node.js, Express, Sequelize, and MySQL.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/employee-management.git
   cd employee-management
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**

   Make sure you have MySQL installed and running. Create a database for the project:
   ```sql
   CREATE DATABASE employee_db;
   ```

4. **Configure the database:**

   Update the database configuration in `src/config/config.js` with your MySQL credentials.

5. **Start the server:**
   ```bash
   npm start
   ```

6. **Run migrations and seeders:**
   ```bash
   npx sequelize-cli db:seed:all
   ```
7. **Restart the server:**
   ```bash
   npm start
   ```