const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();


const deleteOneBranchCtrl = async (req, res) => {

  const getOneBranch = req.params.id
    async function main(){
      const getBranch = await prisma.agencia.delete({where:{ numero_ag: getOneBranch}})
      res.send({message: 'Agência Excluída!'})
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

module.exports = deleteOneBranchCtrl


