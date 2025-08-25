import {pesquisar} from './util.js';
const container = document.getElementById('lista-container');
const form = document.getElementById('cartao-form');
const alertBox = document.getElementById('alert');
const submitBtn = document.getElementById('form-submit');
const idField = document.getElementById('cartao-id');

function showAlert(message, type = 'success') {
  alertBox.textContent = message;
  alertBox.className = `alert ${type}`;
  alertBox.style.display = 'block';
  setTimeout(() => {
    alertBox.style.display = 'none';
  }, 3000);
}

function carregarCartoes() {
  fetch('/api/cartoes')
    .then(res => res.json())
    .then(cartoes => {
      container.innerHTML = '';
      cartoes.forEach(cartao => {
        const card = document.createElement('div');
        card.classList.add('card');

        const info = document.createElement('div');
        info.classList.add('card-info');
        info.innerHTML = `
          <strong>${cartao.nome}</strong><br>
          Tipo: ${cartao.tipo}<br>
          Anuidade: ${cartao.anuidade}<br>
          Bandeira: ${cartao.bandeira}<br>
        `;

        const actions = document.createElement('div');
        actions.classList.add('card-actions');

        const btnAtualizar = document.createElement('button');
        btnAtualizar.textContent = 'Atualizar';
        btnAtualizar.onclick = () => preencherFormulario(cartao);

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.onclick = () => excluirCartao(cartao.id);

        actions.appendChild(btnAtualizar);
        actions.appendChild(btnExcluir);
        card.appendChild(info);
        card.appendChild(actions);
        container.appendChild(card);
      });
    })
    .catch(() => showAlert('Erro ao carregar cartões', 'error'));
}

function mostrarFormulario() {
  document.getElementById('popup-wrapper').style.display = 'flex';
  form.reset();
  idField.value = '';
  submitBtn.textContent = 'Cadastrar';
}

function fecharFormulario() {
  document.getElementById('popup-wrapper').style.display = 'none';
}

function preencherFormulario(cartao) {
  document.getElementById('popup-wrapper').style.display = 'flex';
  
  form.querySelector('[name="nome"]').value = cartao.nome;
  form.querySelector('[name="tipo"]').value = cartao.tipo;
  form.querySelector('[name="anuidade"]').value = cartao.anuidade;
  form.querySelector('[name="bandeira"]').value = cartao.bandeira;
  idField.value = cartao.id;
  submitBtn.textContent = 'Atualizar';
}


function excluirCartao(id) {
  const confirmar = confirm('Tem certeza que deseja excluir este cartão?');

  if (!confirmar) return;

  fetch(`/api/cartoes/${id}`, { method: 'DELETE' })
    .then(() => {
      showAlert('Cartão excluído com sucesso');
      carregarCartoes();
    })
    .catch(() => showAlert('Erro ao excluir cartão', 'error'));
}


form.addEventListener('submit', e => {
  e.preventDefault();
  const dados = Object.fromEntries(new FormData(form));
  const id = dados.id;
  if (!dados.id) {
  delete dados.id;
}

  const metodo = id ? 'PUT' : 'POST';
  const url = id ? `/api/cartoes/${id}` : '/api/cartoes';

  fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(() => {
      showAlert(id ? 'Cartão atualizado com sucesso' : 'Cartão cadastrado com sucesso');
      form.reset();
      idField.value = '';
      submitBtn.textContent = 'Cadastrar';
      carregarCartoes();
    })
    .catch(() => showAlert('Erro ao salvar cartão', 'error'));
});

carregarCartoes();

document.getElementById('btn-pesquisar').addEventListener('click', () => {
  pesquisar();
});

document.getElementById('btn-mostrar-form').addEventListener('click', () => {
  mostrarFormulario();
});

document.getElementById('btn-fechar-form').addEventListener('click', () => {
  fecharFormulario();
});