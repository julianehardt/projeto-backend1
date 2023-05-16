const express =  require("express") // iniciando express
const router = express.Router()//primeira parte da rota
const { v4: uuidv4 } = require('uuid'); //baixando biblioteca para criar id
const cors = require('cors')// instalacao pacote cors que permite consumir esta api no frontend

const concectaBancoDeDados = require('./bancoDeDados') //ligando ao arquivo banco de dados
concectaBancoDeDados()  //chamar a funcao do conecta o banco de dados

const Mulher = require('./mulherModel') //importar o modelo para o servidor

const app = express()//iniciando app
app.use(express.json())// tratando as requisiçoes, dados que trafegarem estarao no formato json
app.use(cors())
const porta = 3333// criando a porta

//GET
async function mostraMulheres(request, response) //funcao atrelada a verbo do protocolo HTTP precisa request response
 {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()
        response.json(mulheresVindasDoBancoDeDados)
    } catch(erro){
        console.log(erro)
    }
    
}

//POST
async function criarMulher(request,response) {
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })

    try {
        const mulherCriada = await novaMulher.save() //a partir da requisicao da mulher criada tenta salva-la no banco de dados
        response.status(201).json(mulherCriada)
    } catch (erro){
        console.log(erro)
    }
}

//PATCH  usado quando precisamis corrigir, mudar algumma info
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)
       
        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        } 
        if (request.body.imagem) {
            mulherEncontrada = request.body.imagem
        } 
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }
        if (request.body.citacao) {
            mulherEncontrada = request.body.citacao
        }

        const mulherAtualizadaNoBanco = await mulherEncontrada.save()
        response.json(mulherAtualizadaNoBanco)

    } catch(erro){
        console.log(erro)
    }
    
    }
    

//DELETE
async function deletaMulher (request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({mensagem: 'Mulher deletada com sucesso.'})
    } catch(erro){
        console.log(erro)
    }

    }



app.use(router.get('/mulheres', mostraMulheres))// segunda parte da rota GET /mulheres
app.use(router.post('/mulheres', criarMulher))//rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher))// rota patch/mulheres/id
app.use(router.delete('/mulheres/:id', deletaMulher))//rota para usar o delete

//PORTA
function mostraPorta () {
    console.log ("Sevidor criado e rodando na porta ", porta)
}

app.listen(porta, mostraPorta) //servidor ouvindo a porta