const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();


const fillDescription = async () => {

  // await prisma.Descricao_evento.deleteMany({})

  const descCommands =
    [
      {cod_evento:1, desc_evento:'Saída'},
      {cod_evento:2, desc_evento:'Entrada'},
      {cod_evento:3, desc_evento:'Bloqueio Metal'},
      {cod_evento:4, desc_evento:'Desbloqueio Controle'},
      {cod_evento:5, desc_evento:'Bloqueio Controle'},
      {cod_evento:6, desc_evento:'Eventos Apagados'},
      {cod_evento:7, desc_evento:'Módulo Instalado'},
      {cod_evento:8, desc_evento:'Padrões de Fábrica'},
      {cod_evento:9, desc_evento:'Retorno de AC'},
      {cod_evento:10, desc_evento:'Falha de AC'},
    ];


  const databaseCommands = descCommands.map(item => ({
    cod_evento:item.cod_evento,
    desc_evento: item.desc_evento
  }));

  await prisma.Descricao_evento.createMany({
    data: databaseCommands
  })

  console.log('Descrições preenchidas')
}

fillDescription()

// module.exports = fillDescription