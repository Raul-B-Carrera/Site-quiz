import conexao from "../../conexao.js";

async function atualizarParteFavorita(id_usuario, part_favorita) {
    console.log(`DAO Usuarios - Atualizando ID ${id_usuario} para a parte: ${part_favorita}`);

    const sql = `UPDATE Usuario SET part_favorita = ? WHERE id_usuario = ?;`;

    try {
        const [resultado] = await conexao.query(sql, [part_favorita, id_usuario]);
        return resultado;
    } catch (error) {
        console.error("Erro no DAO ao atualizar utilizador:", error.message);
        throw error;
    }
}

export { atualizarParteFavorita };