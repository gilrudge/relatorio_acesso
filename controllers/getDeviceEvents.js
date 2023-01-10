const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getDeviceEvents = (req, res) => {

  axios({
    method: 'get',
    url: 'http://192.168.10.150/eventos?@MEV'
  })
  
    .then(apiResponse => {
    const dados = apiResponse.data
       
    const clearData = dados.split('{"r": 1')[0]
    const clearComma = JSON.parse(clearData.replace(',\n]\n}', ']}')) 
    const { nr_agencia, eventos } = clearComma

    console.log(clearComma)
    
    const addEvent = async () => {
      const eventosMap = await eventos.map(evento => (
        {
          nr_agencia: nr_agencia,
          data_evt: evento.data_ev,
          hora_evt: evento.hora_ev,
          cont_evt: evento.id_cont,
          nr_seq: evento.nr_seq,
          crc: evento.crc,
          cod_evt: parseInt(evento.id_desc)
        }
      ))
      
      async function main() {
        await prisma.relatorio_acesso.createMany({
          data: eventosMap
        });
      };
      
      main()
      .then(async () => {
        await prisma.$disconnect()
      })
      .catch(async (e) => {
        console.log(e)
        prisma.$disconnect
        process.exit(1)
      })
      
    }
    addEvent()
    res.send('Eventos incluídos no banco de dados')
    })
    
    .catch((e) => console.log(`Erro ao incluir eventos! ${e.message}`))  
      
      
      //limpar eventos
      
      const clearEvents = async() => {
       await axios ({
          method: 'get',
          url: 'http://192.168.10.150/eventos?@LEV'
        })

      };      
      clearEvents()
      
    };
    
    
    
    
    module.exports = getDeviceEvents