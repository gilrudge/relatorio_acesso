const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const getIps = require('../services/getIps')

const getOneBranchCtrl = async (req, res) => {
  const updateBranch = req.body
  const getOneBranch = req.params.id

  try {
    const getBranch = await prisma.agencia.update ({
      where:{ numero_ag: getOneBranch },
      data: { 
        nome_banco: updateBranch.nome_banco,
        numero_ag: updateBranch.numero_ag,          
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
    res.json(getBranch)
    getIps()

  } catch(error) {
    console.log(error)
  }
}
  
module.exports = getOneBranchCtrl


