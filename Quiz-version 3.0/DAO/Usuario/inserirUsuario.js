import pool from "../../conexao.js";

// Insere os valores
export async function inserir_usuario(usuario) {
    const sql = `INSERT INTO Usuario (nome, email, idade, part_favorita, sexo) VALUES (?, ?, ?, ?, ?)`;
    const valores = [usuario.nome, usuario.email, usuario.idade, usuario.part_favorita, usuario.sexo];
    
    const [resultado] = await pool.query(sql, valores);
    return resultado.insertId;
}