import {pool, connectToDb} from './connection.js'

await connectToDb();

class server {
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

async addRole() {
    try {
        const result = await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',)
        return result;
    } catch (err) {
        throw err;
    }
}

async addEmployee() {
    try {
        const result = await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', ['new', 'employee', 1, 1]);
        return result;
    } catch (err) {
        throw err;
    }
}

async updateEmployeeRole() {
    try {
        const result = await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [2, 1]);
        return result;
    } catch (err) {
        throw err;
    }
}

}



export default server; 