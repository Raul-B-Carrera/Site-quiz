import { get_json } from "./main.js";

// Envia informações para o server
async function salvarResultadoNoBanco(dadosParaBanco) {
    try {
        const resposta = await fetch('http://localhost:3000/api/salvar-quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosParaBanco)
        });

        const resultado = await resposta.json();
        
        if (resposta.ok) {
            console.log("Usuário salvo no MySQL com sucesso! ID:", resultado.id_usuario);
            sessionStorage.setItem("dados_enviados_banco", "true");
        } else {
            console.error("Erro retornado pelo servidor:", resultado.erro);
        }
    } catch (erro) {
        console.error("Erro na comunicação com o servidor:", erro);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Pega e ordena os dados de pontuação
    const pontuacao = sessionStorage.getItem("pontuacao");
    let dados_jojo = [];

    if (pontuacao) {
        try {
            dados_jojo = JSON.parse(pontuacao);
            dados_jojo.sort((jojoA, jojoB) => jojoB.j - jojoA.j);
        } catch (e) {
            console.error("Erro ao ler pontuação do sessionStorage:", e);
        }
    }

    // 2. Define o tema visual da página com base no vencedor do placar
    const htmlElement = document.documentElement;
    if (dados_jojo.length > 0) {
        const vencedor = dados_jojo[0];
        htmlElement.setAttribute("data-tema", vencedor.nome);
    }

    // 3. Preenche na tela os dados do usuário
    const dados_usuario = sessionStorage.getItem("usuario");

    if (dados_usuario) {
        const usuario = JSON.parse(dados_usuario);

        // Mapeia tanto por ID quanto pela sequência de spans da caixa de usuário
        const campoNome = document.querySelector("#user_nome") || document.querySelectorAll(".dados_usuario span")[0] || document.querySelectorAll("span")[0];
        const campoEmail = document.querySelector("#user_email") || document.querySelectorAll(".dados_usuario span")[1] || document.querySelectorAll("span")[1];
        const campoIdade = document.querySelector("#user_idade") || document.querySelectorAll(".dados_usuario span")[2] || document.querySelectorAll("span")[2];
        const campoPart = document.querySelector("#user_part") || document.querySelectorAll(".dados_usuario span")[3] || document.querySelectorAll("span")[3];
        const campoSexo = document.querySelector("#user_sexo") || document.querySelectorAll(".dados_usuario span")[4] || document.querySelectorAll("span")[4];

        if (campoNome) campoNome.textContent = ` ${usuario.nome || ''}`;
        if (campoEmail) campoEmail.textContent = ` ${usuario.email || ''}`;
        if (campoIdade) campoIdade.textContent = ` ${usuario.idade || ''}`;
        if (campoPart) campoPart.textContent = ` ${usuario.part_jojo || usuario.part_favorita || ''}`;
        if (campoSexo) campoSexo.textContent = ` ${usuario.sexo || ''}`;

        // Garante que o envio ao banco só aconteça uma vez por sessão
        const jaEnviado = sessionStorage.getItem("dados_enviados_banco");
        if (!jaEnviado) {
            const respostasQuiz = JSON.parse(sessionStorage.getItem("respostas") || "[]");

            const dadosParaBanco = {
                nome: usuario.nome,
                email: usuario.email,
                idade: usuario.idade,
                sexo: usuario.sexo,
                part_favorita: usuario.part_jojo || usuario.part_favorita,
                respostas: respostasQuiz
            };

            salvarResultadoNoBanco(dadosParaBanco);
        }
    }

    // 4. Preenche as linhas do placar/ranking na tela
    if (dados_jojo.length > 0) {
        dados_jojo.forEach((jojo, i) => {
            let posicao = document.querySelector(`#rank_${i + 1}`);

            if (posicao) {
                let nome_formatado = jojo.nome.charAt(0).toUpperCase() + jojo.nome.slice(1);
                let campo_nome = posicao.querySelector(".nome_jojo");
                let campo_pontos = posicao.querySelector(".pontos_jojo");

                if (campo_nome) campo_nome.textContent = nome_formatado;
                if (campo_pontos) campo_pontos.textContent = jojo.j;

                if (i === 0) {
                    posicao.style.color = "red";
                }
            }
        });
    }

    // 5. Montagem do gráfico (Chart.js)
    const ctx1 = document.getElementById('bar_chart');
    if (ctx1 && dados_jojo.length > 0) {
        const labels = dados_jojo.map(item => item.nome.charAt(0).toUpperCase() + item.nome.slice(1));
        const pontos = dados_jojo.map(item => item.j);

        const paleta = dados_jojo.map((_, index) => {
            let matiz = index * (360 / dados_jojo.length);
            return `hsl(${matiz}, 80%, 50%)`;
        });

        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Pontuação por JoJo',
                    data: pontos,
                    backgroundColor: paleta,
                    borderColor: 'black',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { beginAtZero: true }
                }
            }
        });
    }
});