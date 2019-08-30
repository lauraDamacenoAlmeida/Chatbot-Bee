var AssistantV1 = require('ibm-watson/assistant/v1'); // watson sdk

const assistant = new AssistantV1({
  version: '2019-02-28',
  iam_apikey: 'V5Ospu1xxxx',
  url: 'https://gateway.watsonplatform.net/assistant/api',

});

module.exports = assistant;