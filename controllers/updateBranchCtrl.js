const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();


const getOneBranchCtrl = async (req, res) => {
  const updateBranch = req.body
  const getOneBranch = req.params.id
  async function main(){
    const getBranch = await prisma.agencia.update({
      where:{ numero_ag: getOneBranch },
      data: { 
        nome_banco: updateBranch.nome_banco,           
        nome_ag: updateBranch.nome_ag,
        end_ip: updateBranch.end_ip,
        porta: updateBranch.porta,
        masc_rede: updateBranch.masc_rede,
        end_dns:updateBranch.end_dns,
        gateway:updateBranch.gateway,
        ipfixo_dhcp: updateBranch.ipfixo_dhcp,
        mac_adress: updateBranch.mac_adress      
      }
    })
    res.send({message: "Atualização realizada com sucesso"})
        
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


