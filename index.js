const express = require("express");
const bodyParser = require("body-parser");

const app = express( );

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) =>{
    res.send("Hello WORD");
})

// escrevendo textos no host
app.get('/pergunta', (req, res) => {
  //console.log(req.query);
  // via query
  msg=req.query.pergunta;
  res.send('Você perguntou :' +msg);
})
//implementando a varialvel que eu quero
// duas variais implementadas na edição
// via params
app.get('/mensagem/:tipo/:id', (req,res)=>{
   msg=req.params.tipo;
   cod=res.params.id;
   res.send("resposta que você editar o id : " + cod);
})

app.post('/mensagem', (req,res) =>{
  console.log(req.body);
  res.send("msg recebida");
})

app.listen( 3000, "127.0.0.1", () =>{
    console.log("Servidor rodando");

})
