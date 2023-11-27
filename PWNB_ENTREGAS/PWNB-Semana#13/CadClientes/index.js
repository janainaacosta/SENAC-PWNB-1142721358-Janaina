var regNome = new RegExp("[A-Za-z ]{2,50}$");
var regSobrenome = new RegExp("[A-Za-z ]{2,50}$");
var regDataNasc = new RegExp("(\\d{2})/(\\d{2})/(\\d{4})$");
var regCidade = new RegExp("[A-Za-z ]{6,50}$");
var regCEP = new RegExp("\\d{5}-\\d{3}$");
var regEndereco = new RegExp("[A-Za-z ]{5,50}$");
var regNumero = new RegExp("^\\d+$");
var regTipoCliente = new RegExp("^(Bronze|Prata|Ouro|Platina|Diamante)$");

function validar() {
  if (!regNome.test(nome.value)) {
    alert("Informe um nome válido!");
    return false;
  }

  if (!regSobrenome.test(sobrenome.value)) {
    alert("Informe um sobrenome válido!");
    return false;
  }

  if (!regDataNasc.test(dataNasc.value)) {
    alert("Informe uma data válida (dd/mm/aaaa)");
    return false;
  }

  if (!regCidade.test(cidade.value)) {
    alert("Informe uma cidade válida!");
    return false;
  }

  if (!regCEP.test(cep.value)) {
    alert("Informe um CEP válido! (nnnnn-ccc)");
    return false;
  }

  if (!regEndereco.test(endereco.value)) {
    alert("Informe um endereço válido!");
    return false;
  }

  if (!regNumero.test(numero.value)) {
    alert("Informe um número válido!");
    return false;
  }
}

const customers = [];

function addCliente(
  nome,
  sobrenome,
  dataNasc,
  cidade,
  cep,
  endereco,
  numero,
  tipoCliente
) {
  // Carrega a lista de clientes existentes
  const existingCustomers =
    JSON.parse(localStorage.getItem("clientes")) || [];

  const customer = {
    nome,
    sobrenome,
    dataNasc,
    cidade,
    cep,
    endereco,
    numero,
    tipoCliente,
  };

  // Adiciona o novo cliente à lista existente
  existingCustomers.push(customer);

  // Atualiza a lista no localStorage
  localStorage.setItem("clientes", JSON.stringify(existingCustomers));

  // Atualiza a exibição da lista de clientes
  atualizaListaClientes();
}

function atualizaListaClientes() {
  // Carrega a lista de clientes existentes
  const existingCustomers = JSON.parse(localStorage.getItem("clientes")) || [];

  const customerList = document.getElementById("customer-list");
  customerList.innerHTML = "";

  existingCustomers.forEach((customer, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${customer.nome} 
                    ${customer.sobrenome} - 
                    ${customer.dataNasc} - 
                    ${customer.cidade} - 
                    ${customer.cep} - 
                    ${customer.endereco} - 
                    ${customer.numero} -
                    ${customer.tipoCliente}
        <button id="btn-excluir" class="edit-button" onclick="deleteCustomer(${index})">Excluir</button>
        <button id="btn-editar" class="edit-button" onclick="editCustomer(${index})">Editar</button>`;

    customerList.appendChild(li);
  });
}


function deleteCustomer(index) {
  customers.splice(index, 1);
  atualizaListaClientes();
}

function editCustomer(index) {
  const customer = customers[index];
  nome.value = customer.nome;
  sobrenome.value = customer.sobrenome;
  dataNasc.value = customer.dataNasc;
  cidade.value = customer.cidade;
  cep.value = customer.cep;
  endereco.value = customer.endereco;
  numero.value = customer.numero;
  deleteCustomer(index);
}

const customerForm = document.getElementById("formulario");
customerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const sobrenome = document.getElementById("sobrenome").value;
  const dataNasc = document.getElementById("dataNasc").value;
  const cidade = document.getElementById("cidade").value;
  const cep = document.getElementById("cep").value;
  const endereco = document.getElementById("endereco").value;
  const numero = document.getElementById("numero").value;
  const tipoCliente = document.getElementById(
    "select_tipo_cliente"
  ).value;

  if (
    regNome.test(nome) &&
    regSobrenome.test(sobrenome) &&
    regDataNasc.test(dataNasc) &&
    regCidade.test(cidade) &&
    regCEP.test(cep) &&
    regEndereco.test(endereco) &&
    regNumero.test(numero) &&
    regTipoCliente.test(tipoCliente)
  ) {
    addCliente(
      nome,
      sobrenome,
      dataNasc,
      cidade,
      cep,
      endereco,
      numero,
      tipoCliente
    );
    customerForm.reset();
  } else {
    alert("Preencha todos os campos corretamente");
  }
});

function excluirTodosClientes() {
  customers.length = 0;
  atualizaListaClientes();
}

const clearButton = document.getElementById("btn-limpar");
clearButton.addEventListener("click", () => {
  customerForm.reset();
});
