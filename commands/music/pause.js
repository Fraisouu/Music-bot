module.exports = {
    name: 'pause',
    aliases: [],
    utilisation: '{prefix}pause',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

       if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, 
       Il n'y a pas de musique en cours de lecture ! ❌` });

        const success = queue.setPaused(true);

        return message.channel.send({ content: success ? `La musique en cours de lecture **${queue.current.title}** s'est arrêtée ✅` : `${message.author}, Quelque chose s'est mal passé. ❌` });
    },
};
