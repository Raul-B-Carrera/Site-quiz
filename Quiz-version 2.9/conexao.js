import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "root",
    database: "quiz__db",
    waitForConnections: true,
    connectionLimit: 10
});

export async function testarConexao() {
    try {
        const conn = await pool.getConnection();
        await conn.ping();
        console.log("Conexão com o MySQL bem-sucedida!");
        conn.release();
    } catch (erro) {
        console.error("Falha ao conectar com o MySQL:", erro.message);
    }
}

export default pool;