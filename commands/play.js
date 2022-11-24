const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Toca uma música do YouTube.")
		.addSubcommand(subcommand =>
			subcommand
				.setName("search")
				.setDescription("Procura uma música e toca o primeiro resultado")
				.addStringOption(option =>
					option.setName("searchterms").setDescription("palavras chave").setRequired(true)
				)
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("playlist")
				.setDescription("Toca uma playlist do YouTube")
				.addStringOption(option => option.setName("url").setDescription("url da playlist").setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName("song")
				.setDescription("Toca uma música do YouTube baseado na url")
				.addStringOption(option => option.setName("url").setDescription("url da música").setRequired(true))
		),
	execute: async ({ client, interaction }) => {

		if (!interaction.member.voice.channel) return interaction.reply("Você precisa estar em algum canal de voz para usar esse bot.");

		const queue = await client.player.createQueue(interaction.guild);

        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel)
        } catch (error) {
            queue.destroy();
            return await msg.reply({
                content: "Não consegui entrar no servidor por causa de um erro na fila.",
                ephemeral: true,
            });
        }

		let embed = new EmbedBuilder()

		if (interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url")
            
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })

            if (result.tracks.length === 0)
                return interaction.reply("Sem resultado")

            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** Foi adicionado a fila`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duração: ${song.duration}`})

		}
        else if (interaction.options.getSubcommand() === "playlist") {

            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })
            if(result.tracks.length === 0)
                return interaction.reply(`Nenhuma playlist encontrada com o link ${url}`)
        
            // const playlist = result.playlist

            // console.log(playlist)
            await queue.addTracks(result.tracks)
            embed
                .setDescription(`** músicas da playlist ** foram adicionadas na fila`)
                // .setDescription(`**${playlist.tracks.length} músicas da playlist [${playlist.title}](${playlist.url})** foram adicionadas na fila`)
            //     .setThumbnail(playlist.thumbnail)
		} 
        else if (interaction.options.getSubcommand() === "search") {

            let url = interaction.options.getString("searchterms")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            if (result.tracks.length === 0)
                return interaction.editReply("Sem resultados")
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** foram adicionadas na fila`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duração: ${song.duration}`})
		}

        if (!queue.playing) await queue.play()
        
        await interaction.reply({
            embeds: [embed]
        })
	},
}
