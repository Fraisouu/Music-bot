module.exports = {
    name: 'skip',
    aliases: [],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);
 
        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Il n'y a pas de musique en cours de lecture ! ❌` });

        const success = queue.skip();

        return message.channel.send({ content: success ? `**${queue.current.title}**, Chanson ignorée ✅` : `${message.author}, 
        Quelque chose s'est mal passé ❌` });
    },
};
