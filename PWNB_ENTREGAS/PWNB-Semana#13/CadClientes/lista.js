document.addEventListener('DOMContentLoaded', function () {
  var clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  var customerList = document.getElementById("customer-list");

  function displayCustomerList() {
      customerList.innerHTML = ""; // Limpa a lista antes de adicionar os clientes

      clientes.forEach((cliente, index) => {
          const li = document.createElement('li');
          li.innerHTML = `${cliente.nome} -
                          ${cliente.dataNasc} -
                          ${cliente.cep} -
                          ${cliente.endereco} 
              <button id="btn-excluir" class="edit-button" onclick="deleteCustomer(${index})">Excluir</button>
              <button id="btn-editar" class="edit-button" onclick="editCustomer(${index})">Editar</button>`;

          customerList.appendChild(li);
      });
  }

  displayCustomerList(); // Chama a função para exibir a lista de clientes ao carregar a página

  window.deleteCustomer = function (index) {
      clientes.splice(index, 1);
      localStorage.setItem("clientes", JSON.stringify(clientes));
      displayCustomerList(); // Atualiza a exibição da lista após excluir um cliente
  };

  window.editCustomer = function (index) {
      // Implemente a lógica de edição conforme necessário
      console.log("Editar cliente de índice", index);
  };

  // Evento de submissão do formulário
  document.getElementById("formulario").addEventListener("submit", function (event) {
      event.preventDefault(); // Impede o envio padrão do formulário

      var nome = document.getElementById("nome").value;
      var sobrenome = document.getElementById("sobrenome").value;
      var dataNasc = document.getElementById("dataNasc").value;
      var cidade = document.getElementById("cidade").value;
      var cep = document.getElementById("cep").value;
      var endereco = document.getElementById("endereco").value;
      var tipoCliente = document.getElementById("select_tipo_cliente").value;
      var numero = document.getElementById("numero").value;

      var cliente = {
          nome: nome,
          sobrenome: sobrenome,
          dataNasc: dataNasc,
          cidade: cidade,
          cep: cep,
          endereco: endereco,
          tipoCliente: tipoCliente,
          numero: numero
      };

      clientes.push(cliente);
      localStorage.setItem("clientes", JSON.stringify(clientes));
      displayCustomerList(); // Atualiza a exibição da lista após adicionar um novo cliente

      document.getElementById("formulario").reset(); // Limpa os campos do formulário

      alert('Cliente cadastrado com sucesso!');
    });
});