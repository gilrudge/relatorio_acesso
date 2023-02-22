BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Agencia] (
    [id_ag] INT NOT NULL IDENTITY(1,1),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Agencia_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [Agencia_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [nome_banco] VARCHAR(20) NOT NULL,
    [numero_ag] VARCHAR(15) NOT NULL,
    [nome_ag] VARCHAR(100) NOT NULL,
    [end_ip] VARCHAR(15) NOT NULL,
    [porta] VARCHAR(10) NOT NULL,
    [masc_rede] VARCHAR(15) NOT NULL,
    [end_dns] VARCHAR(15) NOT NULL,
    [gateway] VARCHAR(15) NOT NULL,
    [ipfixo_dhcp] VARCHAR(10) NOT NULL,
    [mac_adress] VARCHAR(20) NOT NULL,
    CONSTRAINT [Agencia_pkey] PRIMARY KEY CLUSTERED ([id_ag]),
    CONSTRAINT [Agencia_numero_ag_key] UNIQUE NONCLUSTERED ([numero_ag]),
    CONSTRAINT [Agencia_end_ip_key] UNIQUE NONCLUSTERED ([end_ip])
);

-- CreateTable
CREATE TABLE [dbo].[Relatorio_acesso] (
    [id_evt] INT NOT NULL IDENTITY(1,1),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Relatorio_acesso_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [Relatorio_acesso_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [nr_agencia] VARCHAR(15) NOT NULL,
    [data_evt] VARCHAR(10) NOT NULL,
    [hora_evt] VARCHAR(8) NOT NULL,
    [cont_evt] VARCHAR(15) NOT NULL,
    [nr_seq] VARCHAR(20) NOT NULL,
    [crc] VARCHAR(50) NOT NULL,
    [cod_evt] SMALLINT NOT NULL,
    [banco] VARCHAR(50) NOT NULL,
    [agencia] VARCHAR(100) NOT NULL,
    [ip_logado] VARCHAR(15) NOT NULL,
    [porta] VARCHAR(10) NOT NULL,
    [mac_adress] VARCHAR(20) NOT NULL,
    CONSTRAINT [Relatorio_acesso_pkey] PRIMARY KEY CLUSTERED ([id_evt])
);

-- CreateTable
CREATE TABLE [dbo].[Descricao_evento] (
    [id_evento] INT NOT NULL IDENTITY(1,1),
    [cod_evento] SMALLINT NOT NULL,
    [desc_evento] VARCHAR(50) NOT NULL,
    CONSTRAINT [Descricao_evento_pkey] PRIMARY KEY CLUSTERED ([id_evento]),
    CONSTRAINT [Descricao_evento_cod_evento_key] UNIQUE NONCLUSTERED ([cod_evento])
);

-- AddForeignKey
ALTER TABLE [dbo].[Relatorio_acesso] ADD CONSTRAINT [Relatorio_acesso_nr_agencia_fkey] FOREIGN KEY ([nr_agencia]) REFERENCES [dbo].[Agencia]([numero_ag]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Relatorio_acesso] ADD CONSTRAINT [Relatorio_acesso_cod_evt_fkey] FOREIGN KEY ([cod_evt]) REFERENCES [dbo].[Descricao_evento]([cod_evento]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
