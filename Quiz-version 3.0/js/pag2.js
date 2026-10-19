import { get_json } from "./main.js";

// Função para salvar a resposta selecionada no sessionStorage
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
      // 1. Evita a navegação imediata do link <a>
      event.preventDefault();

      // 2. Salva a resposta no sessionStorage (texto do h2)
      const tagH2 = opcao.querySelector("h2");
      if (tagH2) {
        const textoResposta = tagH2.textContent.trim();
        guardarResposta(textoResposta);
      }

      // 3. Sua lógica original de contagem de pontos dos JoJos
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

      // 4. Redireciona para a próxima página após salvar tudo
      const linkProximaPagina = opcao.querySelector("a")?.getAttribute("href");
      if (linkProximaPagina) {
        window.location.href = linkProximaPagina;
      }
    });
  });
});