const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    aliases: [],
    utilisation: '{prefix}search [song name]',
    voiceChannel: true,

    async execute(client, message, args) {
      
if (!args[0]) return message.channel.send({ content: `${message.author}, Veuillez entrer un nom de musique valide. ❌` });

        const res = await client.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send({ content: `${message.author}, Aucun résultat de recherche trouvé. ❌` });

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new MessageEmbed();

        embed.setColor('BLUE');
        embed.setTitle(`Musique recherchée: ${args.join(' ')}`);

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nChoisissez une chanson de **1** à **${maxTracks.length}** écrire envoyer ou écrire **annuler** et annuler la sélection.⬇️`);

        embed.setTimestamp();
        embed.setFooter({ text: 'Tart\'os Musique', iconURL: message.author.avatarURL({ dynamic: true }) });

        message.channel.send({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

       collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return message.channel.send({ content: `Appel annulé. ✅` }) && collector.stop();

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send({ content: `
            Erreur : sélectionnez une chanson **1** à **${maxTracks.length}** et écrivez envoyer ou tapez **annuler** et annuler la sélection. ❌` });

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await client.player.deleteQueue(message.guild.id);
                return message.channel.send({ content: `${message.author}, Je ne peux pas rejoindre le salon. ❌` });
            }

            await message.channel.send({ content: `Chargement de votre appel musical. 🎧` });

            queue.addTrack(res.tracks[Number(query.content)-1]);
            if (!queue.playing) await queue.play();
           
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return message.channel.send({ content: `${message.author}, Le temps de recherche de chanson a expiré ❌` });
        });
    },
};
