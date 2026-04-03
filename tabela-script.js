// Exemplo de dados para até 20 pessoas
const listaPessoas = [
    { id: 1, nome: "João Silva", cpf: "123.456.789-01", idade: 34, endereco: "Rua A, 100 - São Paulo/SP" },
    { id: 2, nome: "Maria Oliveira", cpf: "987.654.321-02", idade: 28, endereco: "Av. Paulista, 1500 - São Paulo/SP" },
    { id: 3, nome: "Carlos Souza", cpf: "456.123.789-03", idade: 45, endereco: "Rua das Flores, 45 - Rio de Janeiro/RJ" },
    { id: 4, nome: "Ana Beatriz", cpf: "321.654.987-04", idade: 22, endereco: "Praça da Sé, 10 - São Paulo/SP" },
    { id: 5, nome: "Roberto Lima", cpf: "159.357.456-05", idade: 39, endereco: "Rua Bahia, 200 - Curitiba/PR" }
    // Você pode adicionar até a pessoa 20 aqui seguindo o mesmo padrão
];

const tbody = document.querySelector('#tabelaPessoas tbody');
const synth = window.speechSynthesis;

function popularTabela() {
    tbody.innerHTML = "";
    
    listaPessoas.forEach(pessoa => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${pessoa.id}</td>
            <th scope="row">${pessoa.nome}</th>
            <td>${pessoa.cpf}</td>
            <td>${pessoa.idade} anos</td>
            <td>${pessoa.endereco}</td>
            <td>
                <button class="btn-ouvir-linha" onclick="ouvir('${pessoa.nome}, CPF ${pessoa.cpf}, ${pessoa.idade} anos, mora em ${pessoa.endereco}')">
                    Ouvir 🔊
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function ouvir(texto) {
    synth.cancel(); // Para fala atual antes de começar nova
    const mensagem = new SpeechSynthesisUtterance(texto);
    mensagem.lang = 'pt-BR';
    synth.speak(mensagem);
}

document.getElementById('btnLerTudo').addEventListener('click', () => {
    let relatorioCompleto = "Iniciando leitura da lista de usuários. ";
    listaPessoas.forEach(p => {
        relatorioCompleto += `Usuário ${p.id}: ${p.nome}. CPF: ${p.cpf}. Idade: ${p.idade}. Endereço: ${p.endereco}. `;
    });
    ouvir(relatorioCompleto);
});

document.getElementById('btnParar').addEventListener('click', () => synth.cancel());

// Inicializa a tabela
document.addEventListener('DOMContentLoaded', popularTabela);


// --- Lógica de Tamanho de Fonte ---
let fontSizeAtual = 16; // Tamanho inicial em pixels

const btnAumentar = document.getElementById('btnAumentar');
const btnDiminuir = document.getElementById('btnDiminuir');
const btnReset = document.getElementById('btnReset');

function atualizarTamanhoFonte() {
    document.documentElement.style.fontSize = fontSizeAtual + "px";
}

btnAumentar.addEventListener('click', () => {
    if (fontSizeAtual < 24) { // Limite máximo para não quebrar a tabela
        fontSizeAtual += 2;
        atualizarTamanhoFonte();
    }
});

btnDiminuir.addEventListener('click', () => {
    if (fontSizeAtual > 12) { // Limite mínimo para manter legibilidade
        fontSizeAtual -= 2;
        atualizarTamanhoFonte();
    }
});

btnReset.addEventListener('click', () => {
    fontSizeAtual = 16;
    atualizarTamanhoFonte();
});


const btnContraste = document.getElementById('btnContraste');
const body = document.body;


// Verifica se o usuário já tinha ativado o contraste antes


if (localStorage.getItem('contraste') === 'ativo') {
    body.classList.add('alto-contraste');
}

btnContraste.addEventListener('click', () => {
    body.classList.toggle('alto-contraste');
    
    // Salva a preferência
    if (body.classList.contains('alto-contraste')) {
        localStorage.setItem('contraste', 'ativo');
    } else {
        localStorage.setItem('contraste', 'inativo');
    }
});