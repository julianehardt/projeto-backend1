const express =  require("express")
const router = express.Router()


const app = express()
const porta = 3333

function mostraMulher(request, response) {
    response.json({
        nome: 'Simara Conceicao',
        imagem: 'imagem',
        minibio: 'desenvolvedora'
    })
}

function mostraPorta () {
    console.log ("Sevidor criado e rodando na porta ", porta)
}

app.use(router.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta) 