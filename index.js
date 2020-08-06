const express = require("express");
const bodyParser = require("body-parser");
const model =require("./model");
const app = express( );
const axios = require('axios');

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
    const url= `https://sheet.best/api/sheets/ccb21174-21da-49f4-ab4a-a43a67dec1b4`;
    let menu = '';
    return axios
    	.get(url)
    	.then((res) => {
      		res.data.map(cardapio => {
            console.log(`Produto: ${cardapio.Nome} -Valor: ${cardapio.Preco}`);
      		menu += `*-Codigo*: ${cardapio.Codigo}\n - Produto: ${cardapio.Nome}\n -Valor: ${cardapio.Preco}${cardapio.emote}\n\n`;
            });
    	   agent.add(menu);
    	})
    	.catch(err => console.log(err));
    resposta = model.VerCardapio(mensagem, parameters);
    break;
case 'VerStatus':
    resposta = model.VerStatus(mensagem, parameters)
    break;
 default:
    resposta = {tipo: 'texto', mensagem: 'Sinto muito'}   
}



  
if(resposta.tipo == 'texto' ){
   responder = {
    
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            resposta.mensagem
          ]
        }
      }
    ]
  }

} else if (resposta.tipo == 'imagem'){
 responder =
  {
    "fulfillmentMessages": [
      {
        "card": {
          "title": "card title",
          "subtitle": "card text",
          "imageUri": resposta.url,
          "buttons": [
            {
              "text": "button text",
              "postback": "https://example.com/path/for/end-user/to/follow"
            }
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