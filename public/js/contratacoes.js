import {pesquisar} from './util.js';
const cpfPopup = document.getElementById('cpf-popup');
const cpfForm = document.getElementById('cpf-form');
const alertBox = document.getElementById('alert');
const clienteInfo = document.getElementById('cliente-info');
const contratosContainer = document.getElementById('lista-container');
const contratosLista = document.getElementById('contratos-lista');
const clienteNome = document.getElementById('cliente-nome');
const clienteCpf = document.getElementById('cliente-cpf');
const formPopup = document.getElementById('form-popup');
const contratoForm = document.getElementById('contrato-form');

let clienteId = null;

// Mostrar alerta
function showAlert(message, type = 'success') {
  alertBox.textContent = message;
  alertBox.className = `alert ${type}`;
  alertBox.style.display = 'block';
  setTimeout(() => {
    alertBox.style.display = 'none';
  }, 3000);
}

// Fechar popup de CPF
function fecharPopup() {
  cpfPopup.style.display = 'none';
}

// Mostrar formulário de novo contrato
function mostrarFormulario() {
  formPopup.style.display = 'flex';
  contratoForm.reset();
  carregarCartoesDisponiveis();
}

// Fechar formulário
function fecharFormulario() {
  formPopup.style.display = 'none';
}

// Buscar cliente por CPF
cpfForm.addEventListener('submit', e => {
  e.preventDefault();
  const cpf = cpfForm.cpf.value.trim();

  fetch('/api/clientes')
    .then(res => res.json())
    .then(clientes => {
      const cliente = clientes.find(c => c.cpf === cpf);
      if (!cliente) {
        showAlert('Cliente não encontrado', 'error');
        return;
      }

      clienteId = cliente.id;
      clienteNome.textContent = cliente.nome;
      clienteCpf.textContent = cliente.cpf;
      clienteInfo.style.display = 'block';
      contratosContainer.style.display = 'block';
      fecharPopup();
      carregarContratos();
    })
    .catch(() => showAlert('Erro ao buscar cliente', 'error'));
});

// Carregar contratos do cliente
function carregarContratos() {
  fetch(`/api/clientes/${clienteId}/contratacoes`)
    .then(res => res.json())
    .then(contratos => {
      contratosLista.innerHTML = '';
      contratos.forEach(contrato => {
        const card = document.createElement('div');
        card.classList.add('card');

        const info = document.createElement('div');
        info.classList.add('card-info');
        info.innerHTML = `
          <strong>${contrato.Cartao.nome}</strong><br>
          Tipo: ${contrato.Cartao.tipo}<br>
          Anuidade: ${contrato.Cartao.anuidade}<br>
          Bandeira: ${contrato.Cartao.bandeira}<br>
          Status: ${contrato.status}
        `;

        const actions = document.createElement('div');
        actions.classList.add('card-actions');
        const btnStatus = document.createElement('button');
        btnStatus.textContent = contrato.status === 'Ativo' ? 'Cancelar' : 'Ativar';
        btnStatus.onclick = () => atualizarStatus(contrato.id, contrato.status === 'Ativo' ? 'Cancelado' : 'Ativo');

        actions.appendChild(btnStatus);
        card.appendChild(info);
        card.appendChild(actions);
        contratosLista.appendChild(card);
      });
    })
    .catch(() => showAlert('Erro ao carregar contratos', 'error'));
}

// Atualizar status do contrato
function atualizarStatus(id, novoStatus) {
  fetch(`/api/contratacoes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: novoStatus })
  })
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(() => {
      showAlert('Status atualizado com sucesso');
      carregarContratos();
    })
    .catch(() => showAlert('Erro ao atualizar status', 'error'));
}

// Carregar cartões disponíveis para contratação
function carregarCartoesDisponiveis() {
  fetch('/api/cartoes')
    .then(res => res.json())
    .then(cartoes => {
      const select = contratoForm.CartaoId;
      select.innerHTML = '';
      cartoes.forEach(cartao => {
        const option = document.createElement('option');
        option.value = cartao.id;
        option.textContent = `${cartao.nome} - ${cartao.bandeira}`;
        select.appendChild(option);
      });
    })
    .catch(() => showAlert('Erro ao carregar cartões', 'error'));
}

// Cadastrar novo contrato
contratoForm.addEventListener('submit', e => {
  e.preventDefault();
  const dados = Object.fromEntries(new FormData(contratoForm));
  dados.ClienteId = clienteId;

  fetch('/api/contratacoes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(() => {
      showAlert('Contrato cadastrado com sucesso');
      fecharFormulario();
      carregarContratos();
    })
    .catch(() => showAlert('Erro ao cadastrar contrato', 'error'));
});

// Mostrar popup inicial
cpfPopup.style.display = 'flex';

document.getElementById('btn-pesquisar').addEventListener('click', () => {
  pesquisar();
});

document.getElementById('btn-mostrar-form').addEventListener('click', () => {
  mostrarFormulario();
});

document.getElementById('btn-fechar-form').addEventListener('click', () => {
  fecharFormulario();
});

document.getElementById('btn-fechar-popup').addEventListener('click', () => {
  fecharPopup();
});