const axios = require('axios');


const getDeviceStatus = (req, res) => {

  axios({
    method: 'get',
    url: 'http://192.168.10.150/eventos?@MEV'
  })

  .then(apiResponse => {
    const dados = apiResponse.data
    const clearResponse = JSON.parse(dados.split(',\n]\n}')[1])

    res.send(clearResponse)    
    
  })
    
  .catch((e) => console.log(`Erro ao localizar resposta da porta! ${e.message}`))    
    
}

module.exports = getDeviceStatus


