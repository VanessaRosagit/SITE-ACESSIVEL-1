const form = document.getElementById('formularioVinte');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!this.checkValidity()) {
        const primeiroErro = this.querySelector(':invalid');
        primeiroErro.focus(); // Acessibilidade: leva o foco ao erro
        alert("Por favor, preencha os campos obrigatórios corretamente.");
    } else {
        const dados = new FormData(this);
        console.log("Enviando:", Object.fromEntries(dados));
        alert("Sucesso! Verifique o console.");
    }
});

// Mensagem de confirmação ao limpar (opcional para evitar perda acidental)
form.addEventListener('reset', function(e) {
    const confirmacao = confirm("Tem certeza que deseja limpar todos os 20 campos?");
    if (!confirmacao) {
        e.preventDefault();
    }
});