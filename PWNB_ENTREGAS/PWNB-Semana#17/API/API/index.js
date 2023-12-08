const express = require('express');

const server = express();

server.use(express.json())

const pratosArray=['arroz', 'feijão', 'salada', 'suco']

server.get('/pedido/:indiceInput', (req, res) => {
        const {indiceInput} = req.params

        return res.json({prato: `o id do prato pedido foi ${pratosArray[indiceInput]}`})
})

server.get('/pedido', (req, res) => {
    return res.json(pratosArray);
})

server.post('/pedido', (req, res) => {
    const {nomePrato} = req.body;
    pratosArray.push(nomePrato);
    return res.json(pratosArray);
})

server.put('/pedido/:indice', (req, res) => {
    const {indice} = req.params;
    const {nomePrato} = req.body;

    pratosArray[indice] = nomePrato;

    return res.json(pratosArray);
})

server.delete('/pedido/:indice', (req, res) => {
    const { indice } = req.params;

    pratosArray.splice(indice, 1);

    return res.json(pratosArray);
})

server.listen(3000);