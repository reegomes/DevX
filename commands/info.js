const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
module.exports = {
	data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Mostra informações sobre a musica atual"),
	execute: async ({ client, interaction }) => {

		const queue = client.player.getQueue(interaction.guildId)

		if (!queue || !queue.playing)
		{
			await interaction.reply("Não há músicas na fila")
			return;
		}

        let bar = queue.createProgressBar({
            queue: false,
            length: 19
        })

        const currentSong = queue.current

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`Tocando agora [${currentSong.title}]\n\n` + bar)
                    .setThumbnail(song.thumbnail)
        ]
        })
	},
}