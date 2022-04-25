const maxVol = require("../../config.js").opt.maxVol;

module.exports = {
    name: 'volume',
    aliases: ['vol'],
    utilisation: `{prefix}volume [1-${maxVol}]`,
    voiceChannel: true,

    execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

       if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Il n'y a pas de musique en cours de lecture ! ❌` });

        const vol = parseInt(args[0]);

        if (!vol) return message.channel.send({ content: `Volume actuel: **${queue.volume}** 🔊\n**Pour changer le volume, avec \`1\` pour \`${maxVol}\` Tapez un nombre entre.**` });

        if (queue.volume === vol) return message.channel.send({ content: `${message.author}, Le volume que vous souhaitez modifier est déjà le volume actuel ❌` });

        if (vol < 0 || vol > maxVol) return message.channel.send({ content: `${message.author}, **Tapez un numéro de \`1\` pour \`${maxVol}\` changer le volume .** ❌` });

        const success = queue.setVolume(vol);

        return message.channel.send({ content: success ? `Volume changé: **%${vol}**/**${maxVol}** 🔊` : `${message.author}, 
        Quelque chose s'est mal passé. ❌` }) ;
    },
};
