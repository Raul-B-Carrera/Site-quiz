// Cria o session storage da página
export async function get_json() {
  let dados_session = sessionStorage.getItem("pontuacao");

  // Manda os dados do JSON para o session storage da página atual (traduzidos em parse)
  if (dados_session) {
    return JSON.parse(dados_session);
  }

  //Alimentação com JSON (nham nham)
  let response = await fetch("../js/jojo.json");
  let jojos = await response.json();

  //Caso conexão com JSON for comprometida o código volta para o começo
  if (!jojos || jojos.length === 0) {
    window.location.href = "../index.html";
    return null;
  }

  //Manda os dados da pagina para o JSON (traduzidos em string)
  sessionStorage.setItem("pontuacao", JSON.stringify(jojos));
  return jojos;
}
