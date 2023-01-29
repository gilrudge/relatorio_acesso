const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

let previousEventsMap = []
let newEventsMap

const getDeviceEvents = (req, res) => {

  axios({
    method: 'get',
    url: 'http://192.168.10.150/eventos?@MEV'
  })

    .then(apiResponse => {
      const dados = apiResponse.data

      const clearData = dados.split('{"r":')[0]
      const clearComma = JSON.parse(clearData.replace(',\n]\n}', ']}'));
      const { banco, agencia, nr_agencia, ip_logado, porta, mac_adress, eventos } = clearComma

      console.log(clearData)
      const addEvent = async () => {

        newEventsMap = await eventos.map(evento => (
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

        async function main() {

          const lastDbEvent = await prisma.relatorio_acesso.findFirst({
            orderBy: {
              createdAt: 'desc'
            }
          });

          newEventsMap = newEventsMap.filter(evento => evento.cod_evt != 6)

          console.log(newEventsMap);

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
            if (newEventsMap[newEventsMap.length-1].cod_evt == 5 || newEventsMap[newEventsMap.length-1].cod_evt == 3) {
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

        const clearEvents = async () => {
          if (previousEventsMap === newEventsMap) {
            return
          }
          else {
            await axios({
              method: 'get',
              url: 'http://192.168.10.150/eventos?@LEV'
            })
          }
        };

        clearEvents()
        previousEventsMap = newEventsMap

      }

      addEvent()
      res.send('Eventos incluídos no banco de dados')

    })

    .catch((e) => {console.log(`Erro ao incluir eventos! ${e.message}`)})
    
};


module.exports = getDeviceEvents


