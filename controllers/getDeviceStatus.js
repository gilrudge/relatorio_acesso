const axios = require('axios');


const getDeviceStatus = (req, res) => {

  axios({
    method: 'get',
    url: 'http://192.168.10.150/eventos?@MEV'
  })

    .then(apiResponse => {
      const dados = apiResponse.data
      const clearResponse = JSON.parse(dados.split(',\n]\n}')[1])

      const clearData = dados.split('{"r":')[0]
      const clearComma = JSON.parse(clearData.replace(',\n]\n}', ']}'));
      const { mac_adress } = clearComma

      res.send(mac_adress)
      // console.log(`MAC_ADRESS: ${mac_adress}`)    

    })

    // .catch((e) => console.log(`Erro ao localizar resposta da porta! ${e.message}`))    
    .catch((e) => res.send(e))

}

module.exports = getDeviceStatus


