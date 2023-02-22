const axios = require('axios')
const fs = require('fs')

const getIps = async () => {
  const ipsCtrl = await axios.get('http://localhost:4000')
  const ipArray = ipsCtrl.data.map(item => item.end_ip)
  fs.writeFile('ipsList.json', JSON.stringify(ipArray), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

module.exports = getIps