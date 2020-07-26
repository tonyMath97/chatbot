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
  let parameters = null;
  let responder = ''
  console.log(req.query);
  // verificar o nao_vendemos no dialogflow
  
 
  if(req.body.queryResult.parameters && req.body.queryResult.parameters.nao_vendemos ){
     responder = 'Não vendemos ' + req.body.queryResult.parameters.nao_vendemos;
    console.log('mensagem responder: ', responder);
  }



switch(intencao){
case 'VerCardapio':
    resp = model.VerCardapio(mensagem, parametros);
    break;
 default:
    resp = {tipo: 'texto', mensagem: 'Sinto muito'}   
}
  
if(resp.tipo == 'texto' ){
  const resposta = {
    
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
 
  
    res.send(resposta);


  })


// PROCURANDO A PORTA NO HEROKU
const porta = process.env.PORT || 3000;
const hostname = "127.0.0.1" ;

app.listen( porta, ()  =>{
    console.log(`servidor rodando em http://${hostname}:${porta}`);

})