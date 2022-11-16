const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("exit")
        .setDescription("Expulsa o bot do seu canal de voz."),
	execute: async ({ client, interaction }) => {

		const queue = client.player.getQueue(interaction.guildId)

		if (!queue)
		{
			await interaction.reply("Não há músicas na fila")
			return;
		}
		queue.destroy();

        await interaction.reply("Adeus, mundo cruel")
	},
}
