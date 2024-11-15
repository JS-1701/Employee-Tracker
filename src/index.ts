// view all departments 
// view all roles 
// view all employees
// add department 
// add a role 
// add an employee
// update an emplyee role
import inquirer from "inquirer"
import server from '.Server';
const tools = new server();
function init(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add department', 'add a role', 'add an employee', 'update an employee role', 'exit'],
        }
    ]).then((response) => {
        if (response.action === 'view all departments') {
            // find a way to output data to the console. may need to destructure it. 
            const rows = tools.GetDepartment(); 
        } else if (response.action === 'view all roles') {

        } else if (response.action === 'view all emplyees') {
        } else if (response.action === 'add departments') {
        } else if (response.action === 'add a role') {
        } else if (response.action === 'add an employee') {
        } else if (response.action === 'update an employee role') {
        } else {

        }

    } );
}
