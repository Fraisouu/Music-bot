module.exports = {
    name: 'resume',
    aliases: [],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue) return message.channel.send({ content:`${message.author}, Il n'y a pas de musique en cours de lecture ! ❌` });

        const success = queue.setPaused(false);

        return message.channel.send({ content: success ? `**${queue.current.title}**, La musique continue de jouer. ✅` : `${message.author}, Quelque chose s'est mal passé. ❌` });
    },
};
