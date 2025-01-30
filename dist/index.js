// view all departments 
// view all roles 
// view all employees
// add department 
// add a role 
// add an employee
// update an emplyee role
import inquirer from "inquirer";
import Server from "./Server.js";
const tools = new Server();
import { pool } from './connection.js';
async function init() {
    try {
        const response = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'view all departments',
                    'view all roles',
                    'view all employees',
                    'add department',
                    'add a role',
                    'add an employee',
                    'update an employee role',
                    'remove a role',
                    'exit'
                ],
            }
        ]);
        switch (response.action) {
            case 'view all departments':
                await viewDepartments();
                break;
            case 'view all roles':
                await viewRoles();
                break;
            case 'view all employees':
                await viewEmployees();
                break;
            case 'add department':
                await addDepartment();
                break;
            case 'add a role':
                await addRole();
                break;
            case 'add an employee':
                await addEmployee();
                break;
            case 'update an employee role':
                await updateEmployeeRole();
                break;
            case 'remove a role':
                await removeRole();
                break;
            default:
                console.log('Exiting...');
                process.exit(0);
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
}
const viewDepartments = async () => {
    try {
        const rows = await tools.getDepartment();
        console.table(rows);
        init();
    }
    catch (err) {
        console.error('Error viewing departments:', err);
    }
};
const viewRoles = async () => {
    try {
        const rows = await tools.getRoles();
        console.table(rows);
        init();
    }
    catch (err) {
        console.error('Error viewing roles:', err);
    }
};
const viewEmployees = async () => {
    try {
        const rows = await tools.getEmployees();
        console.table(rows);
        init();
    }
    catch (err) {
        console.error('Error viewing employees:', err);
    }
};
const addDepartment = async () => {
    try {
        const departmentCreate = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the name of the department',
            },
        ]);
        await pool.query('INSERT INTO department (name) VALUES ($1)', [departmentCreate.name]);
        console.log('Department added successfully');
        init(); // Call `init()` to go back to the main menu
    }
    catch (error) {
        console.error('Error adding department:', error);
    }
};
const addRole = async () => {
    try {
        // Get departments to create a list of choices for the user
        let departments = await tools.getDepartment();
        let departmentChoices = departments.map((department) => ({
            name: department.name,
            value: department.id,
        }));
        // Ask all the questions in a single prompt
        const response = await inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'Enter the title of the role:',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for the role:',
                validate: (input) => {
                    return !isNaN(Number(input)) || 'Please enter a valid number';
                },
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Select the department for the role:',
                choices: departmentChoices,
            },
        ]);
        // Convert salary to a number before inserting it into the database
        const salary = Number(response.salary);
        // Call the addRole method from tools with the user's input
        await tools.addRole(response.roleName, salary, response.departmentId);
        console.log(`Role "${response.roleName}" added successfully!`);
        init(); // Go back to the main menu
    }
    catch (err) {
        console.error('Error adding role:', err);
    }
};
const addEmployee = async () => {
    try {
        const roles = await tools.getRoles();
        const roleChoices = roles.map((role) => ({
            name: role.title,
            value: role.id,
        }));
        const response = await inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the first name of the employee:',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the last name of the employee:',
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'Select the role for the employee:',
                choices: roleChoices,
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'Enter the manager ID for the employee:',
            }
        ]);
        await tools.addEmployee(response.firstName, response.lastName, response.roleId, response.managerId);
        console.log(`Employee "${response.firstName} ${response.lastName}" added successfully!`);
        init();
    }
    catch (err) {
        console.error('Error adding employee:', err);
    }
};
async function updateEmployeeRole() {
    try {
        const employees = await tools.getEmployees();
        const employeeChoices = employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
        }));
        const roles = await tools.getRoles();
        const roleChoices = roles.map((role) => ({
            name: role.title,
            value: role.id,
        }));
        const response = await inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Select the employee to update:',
                choices: employeeChoices,
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'Select the new role for the employee:',
                choices: roleChoices,
            }
        ]);
        await tools.updateEmployeeRole(response.employeeId, response.roleId);
        console.log('Employee role updated successfully!');
        init();
    }
    catch (err) {
        console.error('Error updating employee role:', err);
    }
}
;
const removeRole = async () => {
    try {
        // Fetch all roles
        const roles = await tools.getRoles(); // Assuming this fetches roles as an array
        const roleChoices = roles.map((role) => ({
            name: role.title, // Display the role title to the user
            value: role.id, // Use the role ID to identify it
        }));
        // Prompt the user to select a role to delete
        const { roleId } = await inquirer.prompt([
            {
                type: 'list',
                name: 'roleId',
                message: 'Select the role you want to remove:',
                choices: roleChoices,
            },
        ]);
        // Delete the selected role from the database
        await pool.query('DELETE FROM role WHERE id = $1', [roleId]);
        console.log('Role deleted successfully!');
        // Return to the main menu
        await init();
    }
    catch (error) {
        console.error('Error removing role:', error);
    }
};
init();
