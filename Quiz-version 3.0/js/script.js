// retorno ao inicio
export async function get_json(nome) {
  let response = await fetch("../js/jojos.json");
  let jojos = await response.json();

  if (jojos === null) {
    window.location.href = "../index.html";
  }
}
