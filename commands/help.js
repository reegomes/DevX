const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Envia a lista de comandos disponiveis."),
	execute: async ({ client, interaction }) => {
        
        await interaction.reply(`A lista de comandos é: \n
            comando1;
            comando2;
            comando3;
        `)
	},
}
