/* =========================================================
   CARRINHO.JS
   Lógica do carrinho de compras, compartilhada entre todas
   as páginas da loja (index.html, camisama.html, camisaazul.html,
   jaqueta.html).

   IMPORTANTE: este arquivo precisa estar SEMPRE na mesma pasta
   que os arquivos .html, em qualquer lugar onde o site for
   aberto ou hospedado (seu PC, GitHub Pages, etc). Sem ele,
   os botões de carrinho não vão funcionar.

   Usa o localStorage do navegador para guardar os itens,
   assim o carrinho continua o mesmo mesmo quando o usuário
   troca de página.
   ========================================================= */

// Chave usada para salvar os dados no localStorage
const CHAVE_CARRINHO = 'carrinho-brasil-loja';

// Lê o carrinho salvo no localStorage (ou retorna lista vazia se não existir)
function lerCarrinho() {
    const dados = localStorage.getItem(CHAVE_CARRINHO);
    return dados ? JSON.parse(dados) : [];
}

// Salva a lista de itens no localStorage
function salvarCarrinho(carrinho) {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
}

// Função chamada pelos botões "Adicionar ao carrinho" em qualquer página
function adicionarItem(nome, preco) {
    const carrinho = lerCarrinho();
    carrinho.push({ nome: nome, preco: preco });
    salvarCarrinho(carrinho);
    atualizarCarrinho();
}

// Remove 1 item da lista com base no índice clicado
function removerItem(index) {
    const carrinho = lerCarrinho();
    carrinho.splice(index, 1);
    salvarCarrinho(carrinho);
    atualizarCarrinho();
}

// Esvazia o carrinho (usado ao finalizar a compra)
function finalizarCompra() {
    alert('Compra finalizada com sucesso! Obrigado por comprar na Loja Oficial.');
    salvarCarrinho([]);
    atualizarCarrinho();
}

// Redesenha a barra lateral do carrinho na página atual.
// Funciona em qualquer página que tenha os elementos:
// #lista-carrinho, #valor-total e #btn-finalizar
function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const valorTotal = document.getElementById('valor-total');
    const btnFinalizar = document.getElementById('btn-finalizar');

    // Se a página atual não tiver carrinho lateral, não faz nada
    if (!listaCarrinho || !valorTotal || !btnFinalizar) return;

    const carrinho = lerCarrinho();

    listaCarrinho.innerHTML = '';

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<p id="carrinho-vazio" class="carrinho-vazio">Seu carrinho está vazio</p>';
        valorTotal.innerText = 'R$ 0,00';
        btnFinalizar.style.display = 'none';
        return;
    }

    btnFinalizar.style.display = 'block';

    let somaTotal = 0;

    carrinho.forEach((item, index) => {
        somaTotal += item.preco;

        const li = document.createElement('li');
        li.className = 'item-carrinho';
        li.innerHTML = `
            <div class="item-detalhes">
                <strong>${item.nome}</strong>
                <span>R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
            </div>
            <button class="btn-remover" onclick="removerItem(${index})">X</button>
        `;
        listaCarrinho.appendChild(li);
    });

    valorTotal.innerText = `R$ ${somaTotal.toFixed(2).replace('.', ',')}`;
}

// Sempre que a página carregar, desenha o carrinho com os dados salvos
document.addEventListener('DOMContentLoaded', atualizarCarrinho);
