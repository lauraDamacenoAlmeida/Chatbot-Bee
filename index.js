var express = require('express');
const bodyParser = require('body-parser');
var app = express();


app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var  assistant  = require("./src/watson/assistant");

app.get('/', (req, res) => {
    res.sendFile(__dirname + "./public/index.html");
  });

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

app.listen(3000,function(){
    console.log('Ouvindo na porta 3000')
});
