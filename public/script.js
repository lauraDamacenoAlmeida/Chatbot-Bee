let context = {};
const chatMessageTemplate = (message, from) => `
  <div class="from-${from}">
    <div class="message-inner">
      <p>${message}</p>
    </div>
  </div>
  `;

  const InsertTemplateInChat = (template) => {
    const div = document.createElement('div');
    div.innerHTML = template;  
    const chat = document.getElementById('chat');
    chat.appendChild(div);
  };

  const getWatsonMessageAndInsertTemplate = async (text = '') => {
    const uri = 'http://localhost:3000/mensagem/';
    const response = await (await fetch(uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          context,
        }),
      })).json();
      context = response.context;
      console.log(response.output.text[0]);
      const template = chatMessageTemplate(response.output.text[0], 'watson');
      InsertTemplateInChat(template);
    };

    getWatsonMessageAndInsertTemplate();

  const textInput = document.getElementById('textInput');
  textInput.addEventListener('keydown', (event) => {
  // Verifica se o usuário apertou a tecla enter e se o texto dentro do input não está vazio
  if (event.keyCode === 13 && textInput.value) {const template = chatMessageTemplate(textInput.value, 'user');
    InsertTemplateInChat(template);
    getWatsonMessageAndInsertTemplate(textInput.value);    
    // Limpar o input para mensagens futuras
    textInput.value = '';
  }
});