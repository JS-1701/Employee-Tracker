import {pool, connectToDb} from './connection.js'

await connectToDb();

class server {
    async GetDepartment() {
        try {
            const result = await pool.query('SELECT * FROM department');
            return result.rows;
        } catch (err) {
            throw err;
        }
    }
}
export default server; 