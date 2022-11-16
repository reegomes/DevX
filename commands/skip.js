const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Pula a música atual"),

	execute: async ({ client, interaction }) => {

		const queue = client.player.getQueue(interaction.guildId)

		if (!queue)
        {
            await interaction.reply("Não há musicas na fila");
            return;
        }

        const currentSong = queue.current

		queue.skip()

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${currentSong.title} Foi pulada!`)
                    .setThumbnail(currentSong.thumbnail)
            ]
        })
	},
}
