const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const getAllBranchesCtrl = async (req, res) => {
  
  try {
    const getBranches = await prisma.agencia.findMany();
    res.send(getBranches)
  } catch(error) {
    console.log(error)
  };
}

module.exports = getAllBranchesCtrl


