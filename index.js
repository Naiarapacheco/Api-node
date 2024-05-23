const express = require('express');

const server = express();

server.use(express.json());
// Query Params -> ?nome=NODEJS
// Route Params -> /curso/2
// Request Body -> {nome: 'Nodejs', tipo: 'Backend'}

const cursos = ['React', 'React Native', 'Javascript']

//midleware global
server.use((req, res, next) =>{
    console.log('Requisição CHAMADA');

    return next();
});

function checkCurso(req, res, next){
    if(!req.body.name){
        return res.status(400).json({error: 'Nome do curso é obrigatório'})
    }
    return next();
}

//localhost:3000/curso
server.get('/cursos', (req, res) => {
    return res.json(cursos);
});

server.post('/cursos', checkCurso, (req, res) => {
    const {name} = req.body;
    cursos.push(name);

    return res.json(cursos);
});

server.put('/cursos/:index', checkCurso, (req, res) => {
    const {index} = req.params;
    const {name} = req.body;

    cursos[index] = name;
});

server.delete('/cursos/:index', (req, res) => {
    const {index} = req.params;

    cursos.splice(index, 1);
    return res.json({message: 'Curso deletado com sucesso!'});
});

server.listen(3000, () => {
    console.log("O servidor está rodando na porta 3000");
});