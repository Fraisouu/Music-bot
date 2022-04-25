const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'progress',
    aliases: ["time"],
    utilisation: '{prefix}progress',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Il n'y a pas de musique en cours de lecture ! ❌` });

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'Infinity') return message.channel.send({ content: `Cette chanson est diffusée en direct, aucune donnée de durée à afficher. 🎧` });

        const saveButton = new MessageButton();

        saveButton.setLabel('Update');
        saveButton.setCustomId('time');
        saveButton.setStyle('SUCCESS');

        const row = new MessageActionRow().addComponents(saveButton);

        const embed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle(queue.current.title)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setDescription(`${progress} (**${timestamp.progress}**%)`)
        .setFooter({ text: 'Tart\'os Musique', iconURL: message.author.displayAvatarURL({ dynamic: true }) });
        message.channel.send({ embeds: [embed], components: [row] });
    },
};
