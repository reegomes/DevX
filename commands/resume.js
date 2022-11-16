const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("desPAUsa a música atual"),
	execute: async ({ client, interaction }) => {

		const queue = client.player.getQueue(interaction.guildId)

		if (!queue)
        {
            await interaction.reply("Não há músicas na fila");
            return;
        }

		queue.setPaused(false);

        await interaction.reply("Música desPAUsada.")
	},
}
