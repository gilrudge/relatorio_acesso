const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();


const getOneBranchCtrl = async (req, res) => {

  const getOneBranch = req.params.id;
  const getDate = req.query.date
  
  async function main(){
    const getBranch = await prisma.agencia.findUnique({
      where: { 
        numero_ag: getOneBranch,        
      },
      select:{
        nome_banco: true,
        numero_ag: true,
        nome_ag: true,
        end_ip: true,
        porta: true,        
        masc_rede: true,
        end_dns: true,
        gateway: true,
        ipfixo_dhcp: true,
        mac_adress: true,
          relatorio: {
            where: { 
              data_evt: getDate,
              NOT: {
                cod_evt: 6
              },
               },
            orderBy:{
              hora_evt: 'desc'
            },   
            select: {
              id_evt: true,
              data_evt: true,
              hora_evt: true,
              nr_seq: true,
              crc: true,
              cont_evt: true,
              descricao: {
                select:{
                  desc_evento: true,
                  cod_evento:true,                  
                }
              }
            }
          }               
      }    
    })
    
    
    try {

      res.send(getBranch);

    } catch (error) {
      console.log(`Consulta ao banco de dados não concluída devido ao erro ${error}`)
    }   
        
  }
  
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })

}

module.exports = getOneBranchCtrl


