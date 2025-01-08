// view all departments 
// view all roles 
// view all employees
// add department 
// add a role 
// add an employee
// update an emplyee role
import inquirer from "inquirer";
import Server from './Server';
const tools = new Server();
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
        const response = await inquirer.prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the department:',
            }
        ]);
        await tools.addDepartment(response.departmentName);
        console.log(`Department "${response.departmentName}" added successfully!`);
        init();
    }
    catch (err) {
        console.error('Error adding department:', err);
    }
};
const addRole = async () => {
    try {
        const departments = await tools.getDepartment();
        const departmentChoices = departments.map((department) => ({
            name: department.name,
            value: department.id,
        }));
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
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Select the department for the role:',
                choices: departmentChoices,
            }
        ]);
        await tools.addRole(response.roleName, response.salary, response.departmentId);
        console.log(`Role "${response.roleName}" added successfully!`);
        init();
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
const updateEmployeeRole = async () => {
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
};
init();
