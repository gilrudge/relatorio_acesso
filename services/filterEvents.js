const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// eventosMap
// eventosDatabase





const filterEvents = () => {

  async function main(){
    const getEvents = await prisma.relatorio_acesso.findFirst({
      orderBy:{
        id_evt: 'desc'
      }
    })

    return getEvents
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

module.exports = filterEvents