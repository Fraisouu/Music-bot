module.exports = {
    name: 'back',
    aliases: [],
    utilisation: '{prefix}back',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Aucune musique en cours de lecture ! ❌` });

        if (!queue.previousTracks[1]) return message.channel.send({ content: `${message.author}, Il n'y avait pas de musique avant ❌` });

        await queue.back();

        message.channel.send({ content: `La musique précédente a commencé à jouer... ✅` });
    },
};
