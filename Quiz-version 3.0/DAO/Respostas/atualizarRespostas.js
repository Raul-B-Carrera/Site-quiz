import { conexao } from '../conexao.js'

async function atualizarRespostas(codigo, infos) {

    const sql = `UPDATE Respostas SET num_pergunta = ?, descricao = ?, id_usuario = ? WHERE id_respostas = ${codigo} ;`
    const conn = await conexao()

    try {
        // Executar a consulta
        const [results] = await conn.query(sql, [...infos]);

        await conn.end()
        return results
    } catch (err) {
        return err.message
    }
}

export { atualizarRespostas }