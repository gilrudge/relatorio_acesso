const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const getIps = require('../services/getIps')

const deleteOneBranchCtrl = async (req, res) => {
  const getOneBranch = req.params.id
    
  try {
    const getBranch = await prisma.agencia.delete({ where: { numero_ag: getOneBranch } })
    getIps()
    res.json(getBranch)
  } catch(error) {
    console.log(error)
  }
}

module.exports = deleteOneBranchCtrl


