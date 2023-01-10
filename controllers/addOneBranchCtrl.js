const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();


const addOneBranchCtrl = async (req, res) => {
  const addItem = req.body
  async function main(){
    const addBranch = await prisma.agencia.create({
      data:{
            nome_banco: addItem.nome_banco,
            numero_ag: addItem.numero_ag,
            nome_ag: addItem.nome_ag,
            end_ip: addItem.end_ip,
            porta: addItem.porta,
            masc_rede: addItem.masc_rede,
            end_dns:addItem.end_dns,
            gateway:addItem.gateway,
            ipfixo_dhcp: addItem.ipfixo_dhcp,
            mac_adress: addItem.mac_adress
          
    }});
    res.send({
      message: 'Branch criada com sucesso!'
    })
    
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

module.exports = addOneBranchCtrl


