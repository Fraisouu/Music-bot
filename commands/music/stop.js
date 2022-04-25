module.exports = {
    name: 'stop',
    aliases: ['st'],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Il n'y a pas de musique en cours de lecture !. ❌` });

        queue.destroy();

        message.channel.send({ content: `La musique diffusée sur ce serveur a été désactivée, à la prochaine ! ✅` });
    },
};
