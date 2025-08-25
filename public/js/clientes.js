import {pesquisar} from './util.js';
const container = document.getElementById('lista-container');
const form = document.getElementById('cliente-form');
const alertBox = document.getElementById('alert');
const submitBtn = document.getElementById('form-submit');
const idField = document.getElementById('cliente-id');

function showAlert(message, type = 'success') {
  alertBox.textContent = message;
  alertBox.className = `alert ${type}`;
  alertBox.style.display = 'block';
  setTimeout(() => {
    alertBox.style.display = 'none';
  }, 3000);
}

function carregarClientes() {
  fetch('/api/clientes')
    .then(res => res.json())
    .then(clientes => {
      container.innerHTML = '';
      clientes.forEach(cliente => {
        const card = document.createElement('div');
        card.classList.add('card');

        const info = document.createElement('div');
        info.classList.add('card-info');
        info.innerHTML = `
          <strong>${cliente.nome}</strong><br>
          CPF: ${cliente.cpf}<br>
          Email: ${cliente.email}<br>
          Nascimento: ${new Date(cliente.dataNascimento).toLocaleDateString()}
        `;

        const actions = document.createElement('div');
        actions.classList.add('card-actions');

        const btnAtualizar = document.createElement('button');
        btnAtualizar.textContent = 'Atualizar';
        btnAtualizar.onclick = () => preencherFormulario(cliente);

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.onclick = () => excluirCliente(cliente.id);

        actions.appendChild(btnAtualizar);
        actions.appendChild(btnExcluir);
        card.appendChild(info);
        card.appendChild(actions);
        container.appendChild(card);
      });
    })
    .catch(() => showAlert('Erro ao carregar clientes', 'error'));
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

function preencherFormulario(cliente) {
  document.getElementById('popup-wrapper').style.display = 'flex';
  
  form.querySelector('[name="nome"]').value = cliente.nome;
  form.querySelector('[name="cpf"]').value = cliente.cpf;
  form.querySelector('[name="email"]').value = cliente.email;
  form.querySelector('[name="dataNascimento"]').value = cliente.dataNascimento.split('T')[0];

  idField.value = cliente.id;
  submitBtn.textContent = 'Atualizar';
}


function excluirCliente(id) {
  const confirmar = confirm('Tem certeza que deseja excluir este cliente?');

  if (!confirmar) return;

  fetch(`/api/clientes/${id}`, { method: 'DELETE' })
    .then(() => {
      showAlert('Cliente excluído com sucesso');
      carregarClientes();
    })
    .catch(() => showAlert('Erro ao excluir cliente', 'error'));
}


form.addEventListener('submit', e => {
  e.preventDefault();
  const dados = Object.fromEntries(new FormData(form));
  const id = dados.id;
  if (!dados.id) {
  delete dados.id;
}

  const metodo = id ? 'PUT' : 'POST';
  const url = id ? `/api/clientes/${id}` : '/api/clientes';

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
      showAlert(id ? 'Cliente atualizado com sucesso' : 'Cliente cadastrado com sucesso');
      form.reset();
      idField.value = '';
      submitBtn.textContent = 'Cadastrar';
      carregarClientes();
    })
    .catch(() => showAlert('Erro ao salvar cliente', 'error'));
});

carregarClientes();
document.getElementById('btn-pesquisar').addEventListener('click', () => {
  pesquisar();
});

document.getElementById('btn-mostrar-form').addEventListener('click', () => {
  mostrarFormulario();
});

document.getElementById('btn-fechar-form').addEventListener('click', () => {
  fecharFormulario();
});