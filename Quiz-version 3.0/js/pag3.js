import { get_json } from "./main.js";

// Função para salvar a resposta no sessionStorage
function guardarResposta(resposta) {
  let respostasSalvas = JSON.parse(sessionStorage.getItem("respostas") || "[]");
  respostasSalvas.push(resposta);
  sessionStorage.setItem("respostas", JSON.stringify(respostasSalvas));
}

document.addEventListener("DOMContentLoaded", async () => {
  let dados_json = await get_json();

  const input_opcao = document.querySelectorAll(".q1, .q2, .q3, .q4");

  // Recebe o atributo data da pagina do html
  input_opcao.forEach((opcao) => {
    opcao.addEventListener("click", (event) => {
      // 1. Previne a navegação imediata
      event.preventDefault();

      // 2. Salva o texto da opção selecionada no sessionStorage
      const tagH2 = opcao.querySelector("h2");
      if (tagH2) {
        const textoResposta = tagH2.textContent.trim();
        guardarResposta(textoResposta);
      }

      // 3. Contagem de pontuação dos JoJos
      let jojo_escolhido = opcao.getAttribute("data_jojo");

      if (jojo_escolhido) {
        let lista_escolhidos = jojo_escolhido.split(", ");

        lista_escolhidos.forEach((jojo_atual) => {
          let jojo_escolhido_json = dados_json.find(
            (j) => j.nome === jojo_atual,
          );

          if (jojo_escolhido_json) {
            jojo_escolhido_json.j += 1;
            sessionStorage.setItem("pontuacao", JSON.stringify(dados_json));
          }
        });
      }

      // 4. Redireciona para a próxima página
      const linkProximaPagina = opcao.querySelector("a")?.getAttribute("href");
      if (linkProximaPagina) {
        window.location.href = linkProximaPagina;
      }
    });
  });
});