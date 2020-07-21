const express = require("express");
const bodyParser = require("body-parser");

const app = express( );

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', (req, res) =>{
    res.send("Hello WORD");
})

// escrevendo textos no host
app.get('/pergunta', (req, res) => {
 // console.log(req.query);
  // via query
  msg=req.query.pergunta;
  res.send('Você perguntou :' + msg);
})

app.post('/webhook', (req,res) =>  {
  console.log("Cheguei do webhook");
  
  const msgrecebida = req.body.queryResult.queryText;
  //const intencao = req.body.queryResult.intent;
  console.log(req.query);
  // verificar o nao_vendemos no dialogflow
  
 
  if(req.body.queryResult.parameters && req.body.queryResult.parameters.nao_vendemos ){
    const responder = 'Não vendemos' + req.body.queryResult.parameters.nao_vendemos;
    console.log('mensagem responder: ', responder);
  }

  const resposta = {

    
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              "Text response from webhook"
            ]
          }
        }
      ]
    }
  
    res.send(resposta);


  })


// PROCURANDO A PORTA NO HEROKU
const porta = process.env.PORT || 3000;
const hostname = "127.0.0.1" ;

app.listen( porta, ()  =>{
    console.log(`servidor rodando em http://${hostname}:${porta}`);

})





//implementando a varialvel que eu quero
// duas variais implementadas na edição
// via params
//app.get('/mensagem/:tipo/:id', (req,res)=>{
  // console.log(req);
   //msg = req.params.tipo;
   //cod = req.params.id;
  // res.send("A rota que vc quer acessar é:" + msg);
  // res.send("A ID que vc quer acessar é:" + cod);
//})

//app.post('/pedido', (req,res) =>{
  //console.log(req.body);
  //const produto = req.body.produto;
  //const qtd = req.body.quantidade;
  //const pag = req.body.pag;
  //const bebida = req.body.bebida;

  //const pedido = {
    //produto,
    //qtd,
    //pag,bebida


  //}
  //res.json(pedido);
//})