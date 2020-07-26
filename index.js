const express = require("express");
const bodyParser = require("body-parser");
const model =require("./model");
const app = express( );



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', (req, res) =>{
    res.send("Hello WORD");
})

app.post('/webhook', (req,res) =>  {

  const mensagem = req.body.queryResult.queryText;
  const intencao = req.body.queryResult.intent.displayName;
  const parameters = req.body.queryResult.parameters;
  let responder = ''
  console.log(req.query);
  // verificar o nao_vendemos no dialogflow
  
 
  if(req.body.queryResult.parameters && req.body.queryResult.parameters.nao_vendemos ){
     responder = 'Não vendemos ' + req.body.queryResult.parameters.nao_vendemos;
    console.log('mensagem responder: ', responder);
  }



switch(intencao){
case 'VerCardapio':
    resposta = model.VerCardapio(mensagem, parameters);
    break;
 default:
    resposta = {tipo: 'texto', mensagem: 'Sinto muito'}   
}
  
if(resp.tipo == 'texto' ){
   responder = {
    
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            resp.mensagem
          ]
        }
      }
    ]
  }

}
 
  
    res.send(responder);


  })


// PROCURANDO A PORTA NO HEROKU
const porta = process.env.PORT || 3000;
const hostname = "127.0.0.1" ;

app.listen( porta, ()  =>{
    console.log(`servidor rodando em http://${hostname}:${porta}`);

})