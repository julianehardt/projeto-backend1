const express =  require("express")
const router = express.Router()

const app = express()
const porta = 3333

const data = new Date()
const hora = data.toLocaleTimeString('pt-BR')

function mostraHora(request,response) {
    response.json(hora)
}

function mostraPorta () {
    console.log ("Sevidor criado e rodando na porta ", porta)
}

app.use(router.get('/hora', mostraHora))
app.listen(porta, mostraPorta) 