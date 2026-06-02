// js/result.js
import { get_json } from "./main.js";

document.addEventListener("DOMContentLoaded", async () => {
  let dados_json = await get_json();

  // calculo para definir o jojo com maior pontos
  let vencedor = dados_json.reduce((maior, atual) => {
    if (atual.j > maior.j) {
      return atual;
    }
    else {
      return maior;
    }
  });

  // Maneira de trasnformar a página inteira em um template, para assim colocar htmlEmlement, como se fosse um textContent
  const htmlElement = document.documentElement;

  // Switch para determinar o dado que vai ser enviado para o css/html
  switch (vencedor.nome) {
    case "jonathan":
      htmlElement.setAttribute('data-tema', 'jonathan');
      break;
    case "joseph":
      htmlElement.setAttribute('data-tema', 'joseph');
      break;
    case "jotaro":
      htmlElement.setAttribute('data-tema', 'jotaro');
      break;
    case "josuke4":
      htmlElement.setAttribute('data-tema', 'josuke4');
      break;
    case "giorno":
      htmlElement.setAttribute('data-tema', 'giorno');
      break;
    case "jolyne":
      htmlElement.setAttribute('data-tema', 'jolyne');
      break;
    case "johnny":
      htmlElement.setAttribute('data-tema', 'johnny');
      break;
    case "josuke8":
      htmlElement.setAttribute('data-tema', 'josuke8');
      break;
    default:
      return null;
      break
  }
});