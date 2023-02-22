const axios = require('axios');



const getDeviceStatus = async(req, res) => {
  
  const ip = req.params.id

  await axios({
    method: 'get',
    url: `http://${ip}/eventos?@MEV`
  })
  .then(response => res.send(response.data))
  .catch(e => res.send(false))



}


module.exports = getDeviceStatus