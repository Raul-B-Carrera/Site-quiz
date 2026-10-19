import { get_json } from "./main.js";

// Função para salvar a resposta no sessionStorage
function guardarResposta(resposta) {
    let respostasSalvas = JSON.parse(sessionStorage.getItem("respostas") || "[]");
    respostasSalvas.push(resposta);
    sessionStorage.setItem("respostas", JSON.stringify(respostasSalvas));
}

document.addEventListener("DOMContentLoaded", () => {
    const opcoes = document.querySelectorAll(".grid1 div");

    opcoes.forEach((opcao) => {
        opcao.addEventListener("click", (e) => {
            e.preventDefault();

            // Pega o texto da opção selecionada (ex: "Hamon" ou "Stand")
            const textoResposta = opcao.querySelector("h2").textContent.trim();

            // Grava a opção no sessionStorage
            guardarResposta(textoResposta);

            // Obtém o link para a próxima questão
            const linkProximaPagina = opcao.querySelector("a").getAttribute("href");

            // Redireciona para a próxima página
            window.location.href = linkProximaPagina;
        });
    });
});