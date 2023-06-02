const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { readFile } = require('fs/promises')

let previousEventsMap = []
let newEventsMap

const clearEvents = async (ip) => {
  if (previousEventsMap === newEventsMap) {
    return
  }
  else {
    await axios({
      method: 'get',             
      url: `http://${ip}/eventos?@LEV`
    })
  }
};

const addEvent = async (banco, agencia, nr_agencia, ip_logado, porta, mac_adress, eventos, ip) => {

  try {
    
  
  newEventsMap = eventos.map(evento => (
    {
      banco,
      agencia,
      nr_agencia,
      ip_logado,
      porta,
      mac_adress,
      data_evt: evento.data_ev,
      hora_evt: evento.hora_ev,
      cont_evt: evento.id_cont,
      nr_seq: evento.nr_seq,
      crc: evento.crc,
      cod_evt: parseInt(evento.id_desc)
    }
  ))

  const lastDbEvent = await prisma.relatorio_acesso.findFirst({
    where: {
      nr_agencia: nr_agencia
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  

  newEventsMap = newEventsMap.filter(evento => evento.cod_evt != 6)

  if (!lastDbEvent) {
    await prisma.relatorio_acesso.createMany({
      data: newEventsMap
    })
  }
  else {
    if (lastDbEvent.cod_evt == 3 && newEventsMap[newEventsMap.length - 1].cod_evt == 3) {
      newEventsMap.pop()
      await prisma.relatorio_acesso.createMany({
        data: newEventsMap
      })
    }
    else if (lastDbEvent.cod_evt == 5 && newEventsMap[newEventsMap.length - 1].cod_evt == 5) {
      newEventsMap.pop()
      await prisma.relatorio_acesso.createMany({
        data: newEventsMap
      })
    }
    else if (lastDbEvent.cod_evt == 2 && newEventsMap.length > 0) {
      if (newEventsMap[newEventsMap.length - 1].cod_evt == 5 || newEventsMap[newEventsMap.length - 1].cod_evt == 3) {
        await prisma.relatorio_acesso.delete({
          where: {
            id_evt: lastDbEvent.id_evt
          }
        })
        await prisma.relatorio_acesso.createMany({
          data: newEventsMap
        })
      }
      else {
        await prisma.relatorio_acesso.createMany({
          data: newEventsMap
        })
      }
    }
    else {
      await prisma.relatorio_acesso.createMany({
        data: newEventsMap
      })
    }
  }

  clearEvents(ip)
  previousEventsMap = newEventsMap

} catch (error) {
    console.log(`Favor cadastrar uma agência ${error}`)
}


};

const getDeviceEvents = async (req, res) => {

  var ipList = JSON.parse(await readFile('ipsList.json', 'utf8'))

  ipList.forEach( ip => {
  
    axios({
      method: 'get',
      url: `http://${ip}/eventos?@MEV`
    })
    
  .then(apiResponse => {
    const dados = apiResponse.data
    const clearData = dados.split('{"r":')[0]
    const clearComma = JSON.parse(clearData.replace(',\n]\n}', ']}'));
    const { banco, agencia, nr_agencia, ip_logado, porta, mac_adress, eventos } = clearComma    
    
    addEvent(banco, agencia, nr_agencia, ip_logado, porta, mac_adress, eventos, ip)
    
    res.send(`Eventos do IP ${ip} incluídos no banco de dados`)
    console.log(clearComma)
    console.log(`Eventos do IP ${ip} incluídos no banco de dados`)

  })
  
  .catch((e) => { console.log(`Erro ao incluir eventos! ${e.message}`) })
  
  })

  console.log(`\n============ Fim do getDeviceEvents ============\n`)

};

module.exports = getDeviceEvents
