const express =  require("express")
const router = express.Router()

const app = express()
const porta = 3333

const mulheres = [
    {
        nome: 'Simara Conceição',
        imagem: 'imagem',
        minibio: 'desenvolvedora e instrutora'
    },
    {
        nome: 'Iana Chan',
        imagem: 'imagem',
        minibio: 'Fundadora da Programaria' 
    },
    {
        nome: 'Nina da Hora',
        imagem: 'imagem',
        minibio: 'hacker antirracista'
    }
]

function mostraMulheres(request, response) {
    response.json(mulheres)
}

function mostraPorta () {
    console.log ("Sevidor criado e rodando na porta ", porta)
}

app.use(router.get('/mulheres', mostraMulheres))
app.listen(porta, mostraPorta) 