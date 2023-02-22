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
    url: 'http://localhost:4000/eventos'
  })
  
}, 10000);

// setInterval(() => {
//   axios({
//     method: 'get',
//     url: 'http://localhost:4000/status'
//   })
// }, 5000);

const routes = require('./routes/routes');
app.use('/', routes);

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`)
});