const express = require('express');
const server = express();
server.use(express.json())

const clientesArray=[]

server.get('/cliente/:indiceInput', (req, res) => {
        const {indiceInput} = req.params

        // const cliente = clientesArray[indiceInput];
        return res.json({ cliente: clientesArray[indiceInput]})
})


server.get('/cliente', (req, res) => {
    return res.json(clientesArray);
})


server.post('/cliente', (req, res) => {
    const { nomeCliente, dataNasc, CEP, endereco, cidade, UF } = req.body;

    const id = clientesArray.length;

    const cliente = {
        id,
        nomeCliente,
        dataNasc,
        CEP,
        endereco,
        cidade,
        UF
    };

    clientesArray.push(cliente);
    return res.json(clientesArray);
})


server.put('/cliente/:indice', (req, res) => {
    const {indice} = req.params;
    const { nomeCliente, dataNasc, CEP, endereco, cidade, UF } = req.body;

    const cliente = {
        id: parseInt(indice),
        nomeCliente,
        dataNasc,
        CEP,
        endereco,
        cidade,
        UF
    };

    clientesArray[indice] = cliente;

    return res.json(clientesArray);
})

server.delete('/cliente/:indice', (req, res) => {
    const { indice } = req.params;

    clientesArray.splice(indice, 1);

    return res.json(clientesArray);
})

server.listen(3000);