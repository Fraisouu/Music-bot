module.exports = {
    name: 'clear',
    aliases: [],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Aucune musique en cours de lecture. ❌` });

        if (!queue.tracks[0]) return message.channel.send({ content: `${message.author}, Il n'y a déjà aucune musique dans la file d'attente après celle en cours ❌` });

        await queue.clear();

        message.channel.send({ content: `La file d'attente vient d'être vidée. 🗑️` });
    },
};
