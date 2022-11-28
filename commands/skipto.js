const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("skipto")
        .setDescription("Pula a música atual para uma música especifica")
        .addNumberOption((option) =>
            option.setName("tracknumber")
            .setDescription("Pular para música: ")
            .setMinValue(1)
            .setRequired(true)
        ),

	execute: async ({ client, interaction }) => {

		const queue = client.player.getQueue(interaction.guildId)

		if (!queue)
        {
            await interaction.reply("Não há musicas na fila");
            return;
        }

        const trackNum = interaction.options.getNumber("tracknumber")

        if (trackNum > queue.tracks.length)
            return await interaction.editReply("Música invalida")

		queue.skipTo(trackNum - 1)

        await interaction.reply(`Pulada para a música ${trackNum}`)
	},
}
