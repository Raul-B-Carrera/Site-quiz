import pool from "../../conexao.js";

export async function inserir_respostas(id_usuario, respostas) {
  try {
    // Transforma cada resposta no formato [descricao, id_usuario]
    const valores = respostas.map((resposta) => [
        typeof resposta === "object" ? resposta.descricao : resposta, 
        id_usuario
    ]);

    const sql = "INSERT INTO Respostas (descricao, id_usuario) VALUES ?";
    
    // Passa os valores dentro de um array [valores]
    const [resultado] = await pool.query(sql, [valores]);
    
    console.log("Respostas gravadas com sucesso no MySQL!");
    return resultado;
  } catch (error) {
    console.error("Erro ao salvar respostas no MySQL:", error.message);
    throw error;
  }
}