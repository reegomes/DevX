const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pausa a música atual"),
	execute: async ({ client, interaction }) => {

		const queue = client.player.getQueue(interaction.guildId)

		if (!queue)
		{
			await interaction.reply("Não há músicas na fila")
			return;
		}

		queue.setPaused(true);

        await interaction.reply("Música pausada.")
	},
}
