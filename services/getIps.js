const axios = require('axios')
const fs = require('fs')
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const getIps = async () => {
  const ipsCtrl = await axios.get(`http://${process.env.IP}`)
  const ipArray = ipsCtrl.data.map(item => item.end_ip)
  fs.writeFile('ipsList.json', JSON.stringify(ipArray), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

module.exports = getIps