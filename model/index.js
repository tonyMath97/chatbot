// meu model
exports.VerStatus = (msg, params) =>{
    let resposta = {
        tipo: 'texto',
        mensagem: 'Já estamos preparando seu pedido'
    }

    return resposta
}
// 
exports.VerCardapio = (msg, params) =>{
    let resposta = {
        tipo: 'imagem',
        url: 'https://i.ibb.co/3dH36Q1/CARD.png'
    }

    return resposta
}