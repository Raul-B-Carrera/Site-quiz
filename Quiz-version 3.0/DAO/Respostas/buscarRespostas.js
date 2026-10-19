import { conexao } from "../conexao.js";

async function buscarRespostas() {
  console.log("DAO de Respostas");

  const sql = `SELECT * FROM Respostas;`;
  const conn = await conexao();

  try {
    const [rows, fields] = await conn.query(sql);
    await conn.end();
    return rows;
  } catch (error) {
    return error.message;
  }
}