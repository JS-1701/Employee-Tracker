import {pool, connectToDb} from './connection.js'


await connectToDb();

class Server {
    async getDepartment() {
        try {
            const result = await pool.query('SELECT * FROM department');
            return result.rows;
        } catch (err) {
            throw err;
        }
    }


async getRoles() {
    try {
        const result = await pool.query('SELECT * FROM role');
        return result.rows;
    } catch (err) {
        throw err;
    }
}

async getEmployees() {
    try {
        const result = await pool.query('SELECT * FROM employee');
        return result.rows;
    } catch (err) {
        throw err;
    }
}

async addDepartment() {
    try {
        const result = await pool.query('INSERT INTO department (name) VALUES ($1)', ['new department']);
        return result;
    } catch (err) {
        throw err;
    }
}

async addRole(roleName: string, salary: number, departmentId: number) {

    try {

        const result = await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [roleName, salary, departmentId]);

        return result;

    } catch (err) {

        throw err;

    }

}

async addEmployee(firstName: string, lastName: string, roleId: number, managerId: number) {

    try {

        const result = await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);

        return result;

    } catch (err) {

        throw err;

    }

}

async updateEmployeeRole(employeeId: number, roleId: number) {

    try {

        const result = await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);

        return result;

    } catch (err) {

        throw err;

    }

    }

}

export default Server;