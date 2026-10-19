import conexao from "../../conexao.js";

async function buscarUsuarios() {
  console.log("DAO de Usuarios");

  const sql = `SELECT * FROM Usuario;`;

  try {
    const [rows] = await conexao.query(sql);
    return rows;
  } catch (error) {
    console.error("Erro no DAO ao buscar todos os usuarios:", error.message);
    throw error;
  }
}

async function buscarUsuarioPorNome(nome) {
  console.log("DAO Usuarios - A pesquisar por:", nome);

  const sql = `SELECT * FROM Usuario WHERE LOWER(TRIM(nome)) LIKE LOWER(?);`;

  try {
    const termoBusca = `%${nome.trim()}%`;
    const [rows] = await conexao.query(sql, [termoBusca]);
    return rows;
  } catch (error) {
    console.error("Erro no DAO ao buscar usuario:", error.message);
    throw error;
  }
}

export { buscarUsuarios, buscarUsuarioPorNome };