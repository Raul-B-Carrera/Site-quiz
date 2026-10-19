// Criação do button e atribuição de função ao click
const button_cadastro = document.querySelector(".button_cadastro");
if (button_cadastro) {
    button_cadastro.addEventListener("click", cadastro);
}

const confirmar = document.querySelector(".confirmar");
if (confirmar) {
    confirmar.addEventListener("click", confirmarAtualizacao);
}

// Botão "NÃO" que redireciona para o quiz
function cadastro() {
  window.location.href = "./cadastro.html";
}

// Botão de "CONFIRMAR" que aplica a busca e atualização
async function confirmarAtualizacao() {
  const nomeDigitado = document.querySelector(".nome").value.trim();
  
  // Pega o valor selecionado da parte favorita
  const selectParte = document.querySelector("select"); 
  const novaParteFavorita = selectParte ? selectParte.value : null;

  if (nomeDigitado === "") {
    alert("Por favor, digite seu nome.");
    return;
  }

  try {
    // Busca o usuário e seu ID
    const respostaBusca = await fetch(`http://localhost:3000/api/usuarios/${encodeURIComponent(nomeDigitado)}`);
    const dadosBusca = await respostaBusca.json();

    if (!respostaBusca.ok || !dadosBusca.sucesso) {
      alert(dadosBusca.mensagem || "Nenhum usuário cadastrado foi encontrado.");
      return;
    }

    // Pega o primeiro usuário retornado e o id correspondente
    const usuarioEncontrado = dadosBusca.dados[0];
    const idUsuario = usuarioEncontrado.id_usuario || usuarioEncontrado.id;

    // 2. Envia a requisição PUT para atualizar a parte favorita no banco de dados
    const respostaAtualizacao = await fetch("http://localhost:3000/api/usuarios/atualizar-parte", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_usuario: idUsuario,
        part_favorita: novaParteFavorita
      })
    });

    const dadosAtualizacao = await respostaAtualizacao.json();

    if (respostaAtualizacao.ok && dadosAtualizacao.sucesso) {
      
      sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
      
      // Redireciona para o quiz
      window.location.href = "../pags/quest1.html";
    } else {
      alert(dadosAtualizacao.mensagem || "Erro ao atualizar a parte favorita.");
    }

  } catch (erro) {
    console.error("Erro ao conectar com o servidor:", erro);
    alert("Erro de conexão com o servidor Node.js.");
  }
}