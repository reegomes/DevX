const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("Mistura a fila"),

    execute: async({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if(!queue) return await interaction.editReply("Não há sons na fila")

        queue.shuffle()
        await interaction.reply(`A fila com ${queue.tracks.length} músicas foi misturada!`)
    },
}