const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Mostra as 10 primeiras músicas da fila"),

    execute: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue || !queue.playing)
        {
            await interaction.reply("Não há músicas na fila");
            return;
        }

        const queueString = queue.tracks.slice(0, 10).map((song, i) => {
            return `${i}) [${song.duration}]\` ${song.title} - <@${song.requestedBy.id}>`
        }).join("\n")

        const currentSong = queue.current

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`**Atualmente tocando**\n` + 
                        (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} - <@${currentSong.requestedBy.id}>` : "Nada") +
                        `\n\n**Fila**\n${queueString}`
                    )
                    .setThumbnail(currentSong.setThumbnail)
            ]
        })
    }
}
