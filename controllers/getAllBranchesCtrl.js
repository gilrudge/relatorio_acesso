const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();


const getAllBranchesCtrl = async (req, res) => {
  async function main(){
    const getBranches = await prisma.agencia.findMany();
    res.send(getBranches)
    
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

module.exports = getAllBranchesCtrl


