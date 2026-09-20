import express from "express";
import cors from "cors";
import { inserir_usuario } from "./DAO/Usuario/inserirUsuario.js";
import { inserir_respostas } from "./DAO/Respostas/inserirRespostas.js";

const app = express();
app.use(cors());
app.use(express.json());

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

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});