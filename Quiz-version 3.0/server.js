import express from "express";
import cors from "cors";
import { inserir_usuario } from "./DAO/Usuario/inserirUsuario.js";
import { inserir_respostas } from "./DAO/Respostas/inserirRespostas.js";
import { buscarUsuarioPorNome } from "./DAO/Usuario/buscarUsuario.js";
import { atualizarParteFavorita } from "./DAO/Usuario/atualizarUsuario.js";

const app = express();
app.use(cors());
app.use(express.json());


// Post (Insere o usuario no banco de dados)
app.post("/api/salvar-quiz", async (req, res) => {
    try {
        // Exibe no terminal se os dados foram recebidos
        console.log("Dados recebidos no backend:", req.body);

        const { nome, email, idade, sexo, part_favorita, respostas } = req.body;

        // 1. Prepara os dados de usuário para o MySQL
        const usuario = { nome, email, idade, sexo, part_favorita };
        const id_usuario = await inserir_usuario(usuario);

        // 2. Grava o array de respostas no MySQL vinculando ao id_usuario gerado
        if (respostas && respostas.length > 0) {
            await inserir_respostas(id_usuario, respostas);
        }

        res.status(200).json({ 
            sucesso: true, 
            mensagem: "Quiz e respostas salvos com sucesso!", 
            id_usuario 
        });
    } catch (error) {
        console.error("Erro ao salvar dados no backend:", error);
        res.status(500).json({ sucesso: false, erro: error.message });
    }
});


// Get (Busca os dados da database)
app.get("/api/usuarios/:nome", async (req, res) => {
    try {
        const { nome } = req.params;
        console.log("A buscar utilizador pelo nome:", nome);

        const usuarios = await buscarUsuarioPorNome(nome);

        if (!usuarios || usuarios.length === 0) {
            return res.status(404).json({ 
                sucesso: false, 
                mensagem: "Nenhum utilizador encontrado com esse nome." 
            });
        }

        res.status(200).json({ 
            sucesso: true, 
            dados: usuarios 
        });
    } catch (error) {
        console.error("Erro ao buscar utilizador:", error);
        res.status(500).json({ sucesso: false, erro: error.message });
    }
});

// Update (Atualiza os dados da database)
app.put("/api/usuarios/atualizar-parte", async (req, res) => {
    try {
        const { id_usuario, part_favorita } = req.body;
        console.log(`A atualizar utilizador ID ${id_usuario} para a parte: ${part_favorita}`);

        const resultado = await atualizarParteFavorita(id_usuario, part_favorita);

        if (resultado.affectedRows > 0) {
            res.status(200).json({ 
                sucesso: true, 
                mensagem: "Parte favorita atualizada com sucesso!" 
            });
        } else {
            res.status(404).json({ 
                sucesso: false, 
                mensagem: "Utilizador não encontrado para atualização." 
            });
        }
    } catch (error) {
        console.error("Erro ao atualizar utilizador:", error);
        res.status(500).json({ sucesso: false, erro: error.message });
    }
});


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});