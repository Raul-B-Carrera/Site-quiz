// Criação do button e atribuição de função ao click
const button_cadastro = document.querySelector(".button_cadastro");
button_cadastro.addEventListener("click", pegar_dados);

function pegar_dados(event){
    if (event) event.preventDefault(); 

    let form = document.querySelector('form');

    // Sobe os dados para o JSON
    let usuario = {
        nome: form.nome.value,
        email: form.email.value,
        idade: form.idade.value,
        sexo: form.sexo.value,
        part_jojo: form.part_jojo.value
    };
    
    //Manda os dados da pagina para o JSON (traduzidos em string)
    sessionStorage.usuario = JSON.stringify(usuario);
    // Encaminha para próxima página
    window.location.href = './index.html';
}