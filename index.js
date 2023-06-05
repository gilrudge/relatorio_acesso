const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');

dotenv.config({ path: './.env' });

const app = express();
app.use(express.json());
app.use(cors())

const getDeviceEvents = require('./services/getDeviceEvents')
const getDeviceStatus = require('./services/getDeviceStatus')

app.get('/eventos', getDeviceEvents)
app.get('/status/:id', getDeviceStatus);

setInterval(() => {
  axios({
    method: 'get',
    url: `http://${process.env.IP}/eventos`
  })

}, 15000);

setInterval(() => {
  axios({
    method: 'get',
    url: `http://${process.env.IP}/status`
  })
}, 15000);

const routes = require('./routes/routes');
app.use('/', routes);

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`)
});