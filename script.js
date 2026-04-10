// --- LÓGICA DO MENU ---
function toggleMenu() {
    const menu = document.getElementById("menuLateral");
    const isOpen = menu.style.width === "250px";
    menu.style.width = isOpen ? "0" : "250px";
}

// --- ACESSIBILIDADE ---
let fontSize = 16;
function alterarFonte(delta) {
    fontSize += delta;
    if(fontSize >= 12 && fontSize <= 28) {
        document.documentElement.style.fontSize = fontSize + "px";
    }
}

const btnContraste = document.getElementById('btnContraste');
btnContraste?.addEventListener('click', () => {
    document.body.classList.toggle('alto-contraste');
    localStorage.setItem('contraste', document.body.classList.contains('alto-contraste'));
});

// Voz
const synth = window.speechSynthesis;
function falar(texto) {
    if (synth.speaking) synth.cancel();
    const mensagem = new SpeechSynthesisUtterance(texto);
    mensagem.lang = 'pt-BR';
    synth.speak(mensagem);
}
document.getElementById('btnPararVoz')?.addEventListener('click', () => synth.cancel());

// --- GESTÃO DE DADOS ---

// Dados Fictícios Iniciais
const dadosIniciais = [
    { id: "101", nome: "Ana Silva", cpf: "123.456.789-00", cargo: "Desenvolvedora Frontend", cidade: "São Paulo - SP" },
    { id: "102", nome: "Bruno Oliveira", cpf: "234.567.890-11", cargo: "Gerente de Projetos", cidade: "Curitiba - PR" },
    { id: "103", nome: "Carla Souza", cpf: "345.678.901-22", cargo: "Analista de Dados", cidade: "Rio de Janeiro - RJ" },
    { id: "104", nome: "Diego Santos", cpf: "456.789.012-33", cargo: "Designer UX/UI", cidade: "Belo Horizonte - MG" },
    { id: "105", nome: "Elena Pereira", cpf: "567.890.123-44", cargo: "Engenheira de Software", cidade: "Recife - PE" }
];

document.addEventListener('DOMContentLoaded', () => {
    // Restaurar contraste
    if (localStorage.getItem('contraste') === 'true') document.body.classList.add('alto-contraste');

    // Inicializar banco de dados se estiver vazio
    if (!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', JSON.stringify(dadosIniciais));
    }

    if (document.getElementById('tabelaPessoas')) popularTabela();

    const form = document.getElementById('formularioVinte');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const lista = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const novo = {
            id: Math.floor(Math.random() * 1000).toString(),
            nome: document.getElementById('f1_nome').value,
            cpf: document.getElementById('f2_cpf').value,
            cargo: document.getElementById('f9_cargo').value,
            cidade: document.getElementById('f8_cidade').value
        };
        lista.push(novo);
        localStorage.setItem('usuarios', JSON.stringify(lista));
        alert("Candidato cadastrado com sucesso!");
        window.location.href = 'tabela.html';
    });
});

function popularTabela() {
    const tbody = document.querySelector('#tabelaPessoas tbody');
    const dados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    tbody.innerHTML = dados.map(u => `
        <tr>
            <td>${u.id}</td>
            <td><strong>${u.nome}</strong></td>
            <td>${u.cpf}</td>
            <td>${u.cargo}</td>
            <td>
                <button class="btn-ouvir-linha" onclick="falar('Candidato ${u.nome}, Cargo ${u.cargo}')">🔊 Ouvir</button>
            </td>
        </tr>
    `).join('');
}

function lerTabelaInteira() {
    const dados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    let texto = "Iniciando leitura dos candidatos. ";
    dados.forEach(u => {
        texto += `ID ${u.id}, Nome ${u.nome}, Cargo ${u.cargo}. `;
    });
    falar(texto);
}

function limparDados() {
    if(confirm("Deseja apagar todos os registros e voltar aos dados iniciais?")) {
        localStorage.removeItem('usuarios');
        location.reload();
    }
}