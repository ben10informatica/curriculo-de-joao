let expressao = '';
let resultado = '0';
let historico = '';

const displayResultado = document.querySelector('.resultado');
const displayHistorico = document.querySelector('.historico');

function adicionarNumero(numero) {
    if (resultado === '0' && numero !== '.') {
        resultado = numero;
    } else {
        resultado += numero;
    }
    atualizarDisplay();
}

function adicionarOperador(operador) {
    if (resultado !== '0') {
        expressao += resultado + operador;
        historico = expressao;
        resultado = '0';
        atualizarDisplay();
    }
}

function calcular() {
    if (expressao !== '' && resultado !== '0') {
        expressao += resultado;
        historico = expressao + ' =';
        
        try {
            resultado = eval(expressao).toString();
            expressao = '';
        } catch (erro) {
            resultado = 'Erro';
            expressao = '';
        }
        
        atualizarDisplay();
    }
}

function limpar() {
    expressao = '';
    resultado = '0';
    historico = '';
    atualizarDisplay();
}

function apagar() {
    if (resultado.length > 1) {
        resultado = resultado.slice(0, -1);
    } else {
        resultado = '0';
    }
    atualizarDisplay();
}

function atualizarDisplay() {
    displayResultado.textContent = resultado;
    displayHistorico.textContent = historico;
}

// Adicionar suporte a teclado
document.addEventListener('keydown', (evento) => {
    const tecla = evento.key;
    
    if (tecla >= '0' && tecla <= '9' || tecla === '.') {
        adicionarNumero(tecla);
    } else if (['+', '-', '*', '/', '%'].includes(tecla)) {
        adicionarOperador(tecla);
    } else if (tecla === 'Enter') {
        calcular();
    } else if (tecla === 'Backspace') {
        apagar();
    } else if (tecla === 'Escape') {
        limpar();
    }
}); 