import { get_json } from "./main.js";

document.addEventListener("DOMContentLoaded", async () => {
  let dados_json = await get_json();

  // Recebe o atributo data da pagina do html
  input_opcao.forEach((opcao) => {
    opcao.addEventListener("click", (event) => {
      let jojo_escolhido = opcao.getAttribute("data_jojo");

      // Cria uma separação por virgula, para conseguir adicionar mais elementos em um data
      let lista_escolhidos = jojo_escolhido.split(", ");

      // Lê cada item do data
      lista_escolhidos.forEach((jojo_atual) => {
        let jojo_escolhido_json = dados_json.find(
          (j) => j.nome === jojo_atual,
        );

        if (jojo_escolhido_json) {
          jojo_escolhido_json.j += 1;

          //Manda os dados da pagina para o JSON (traduzidos em string)
          sessionStorage.setItem("pontuacao", JSON.stringify(dados_json));
        }
      });
    });
  });
});
