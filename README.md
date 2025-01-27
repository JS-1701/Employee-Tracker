# Employee Management System

## Description
The Employee Management System is a command-line application built with Node.js, Inquirer, and PostgreSQL. It allows business owners to view and manage their company's departments, roles, and employees in an organized and efficient way. With this tool, users can interact with a database to retrieve and modify information about their business operations.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

---

## Installation

Follow these steps to set up and run the application locally:

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```bash
   cd employee-management-system
   ```
3. Install the necessary dependencies:
   ```bash
   npm install
   ```
4. Set up the PostgreSQL database:
   - Create a PostgreSQL database named `employee_db`.
   - Run the provided SQL schema and seed files to set up the database structure and initial data.
   ```bash
   psql -U <your_username> -d employee_db -f db/schema.sql
   psql -U <your_username> -d employee_db -f db/seeds.sql
   ```
5. Configure the database connection:
   - Update the `.env` file with your PostgreSQL credentials:
     ```
     DB_HOST=localhost
     DB_PORT=5432
     DB_USER=<your_username>
     DB_PASSWORD=<your_password>
     DB_NAME=employee_db
     ```

---

## Usage

1. Start the application by running the following command in the terminal:
   ```bash
   node index.js
   ```
2. Use the interactive prompts to navigate through the application's features, such as viewing, adding, and updating information.

---

## Features

- View all departments, roles, and employees in a formatted table.
- Add new departments, roles, and employees to the database.
- Update an employee's role.
- Organized and intuitive command-line interface.

### User Story

**As a business owner:**
I want to view and manage the departments, roles, and employees in my company so that I can organize and plan my business effectively.

### Acceptance Criteria

- When the application starts, users are presented with the following options:
  - View all departments
  - View all roles
  - View all employees
  - Add a department
  - Add a role
  - Add an employee
  - Update an employee role
- Detailed and formatted tables are displayed for departments, roles, and employees.
- Prompt-based input allows users to easily add or modify data in the database.

---

## Demo

A walkthrough video demonstrating the application's functionality is available at the following link:

[Walkthrough Video](https://www.youtube.com/watch?v=1UG8bMw509c)

---

## Technologies Used

- **Node.js**: JavaScript runtime for server-side applications.
- **Inquirer**: Library for creating interactive command-line prompts.
- **PostgreSQL**: Relational database management system.
- **dotenv**: Module for managing environment variables.

---

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request.

---

## Questions

If you have any questions, feel free to reach out:

- GitHub: [JS-1701](https://github.com/JS-1701)
- Email: [first.it.giveth13@gmail.com]



