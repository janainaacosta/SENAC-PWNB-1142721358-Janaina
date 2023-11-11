var clientes=[]
clientes = JSON.parse( localStorage.getItem("clientes"))
customerList.innerHTML = '';
            clientes.forEach((clientes, index) => {
                const li = document.createElement('li');
                li.innerHTML = `${customer.nome} 
                                ${customer.sobrenome} 
                               }
                    <button id="btn-excluir" class="edit-button" onclick="deleteCustomer(${index})">Excluir</button>
                    <button id="btn-editar" class="edit-button" onclick="editCustomer(${index})">Editar</button>`;

                customerList.appendChild(li);
            });