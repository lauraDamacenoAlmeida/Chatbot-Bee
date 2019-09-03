# Chatbot-Bee
Este projeto veio de um desafio proposto aqui na IBM para tirar as duvidas das pessoas que estão entrando na empresa. 

Bee veio com o objetivo de ajudar os novos funcionários, especialmente estagiários a tirarem suas duvidas sobre a empresa IBM, e com isso ajudar o pessoal do RH.
Foi realizado sessões de desing thinking para aprimorar a solução do bot e trazer uma inserção maior do bot na vida dos usuários e nas pessoas do RH.

## Requisitos
1. [Watson Assistant](https://www.ibm.com/cloud/watson-assistant/)
2. [Node JS](https://nodejs.org/en/)

## Estrutura do projeto
Atualmente a Bee está dividida assim:
- Pasta public: está os arquivos do front da aplicação (index.html, script.js, style.css)
- Pasta Watson: está o arquivo assistant.js onde é cadastrado as autenticações que a API precisará para chamar o Assistant.
- Index.js : está todas as rotas e configurações da API feita em Node JS. Atualmente a aplicação roda na porta 3000.


## Próximos passos:
1. Fazer o front-end em Angular JS
2. Colocar a API na Cloud da IBM
3. Fazer integração com o Watson Discovery

## Entendendo as rotas do index.js:
Se você abrir o arquivo index.js verá que ele apresenta 2 http request que o usuário poderá fazer na nossa página web, que está configurada na pasta Public.

### Requisições do tipo Get
```
app.get('/', (req, res) => {
    res.sendFile(__dirname + "./public/index.html");
  });
```
Assim que o usuário fizer a chamada do site, a API irá carregar a página web.

### Requisições do tipo Post
```
app.post('/mensagem/', (req, res) => {
    const { text, context = {} } = req.body;  
    const params = {
      input: { text },
      workspace_id: 'xxxxxx',
      context,
    };
    assistant.message(params, (err, response) => {
      if (err) res.status(500).json(err);
      res.json(response);
    });
  });
```
Assim que o usuário enviar uma pergunta para o bot, a API logo fará uma chamada para a IBM Cloud, passando como parâmetro a ID do Workspace do bot e suas autenticações que é instânciada neste trecho:
```
var  assistant  = require("./watson/assistant");
```
Após fazer a requisição a API se o retorno for um erro ou status 500, ele irá imprimir na console do navegador esse erro em formato JSON, caso seja sucesso, ele irá trazer em formato JSON a resposta do Bot, que será lida pelo JavaScript configurado no diretório Public e assim exibido para o usuário.
