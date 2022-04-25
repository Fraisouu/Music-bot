const Discord = require('discord.js');
module.exports = (client, int) => {
    if (!int.isButton()) return;

    const queue = client.player.getQueue(int.guildId);
    switch (int.customId) {
        case 'saveTrack': {
          if (!queue || !queue.playing) return int.reply({ content: `Aucune musique en cours de lecture. ❌`, ephemeral: true, components: [] });

          const embed = new Discord.MessageEmbed()
          .setColor('BLUE')
          .setTitle(client.user.username + " - Enregistrer la musique")
          .setThumbnail(client.user.displayAvatarURL())
          .addField(`Musique`, `\`${queue.current.title}\``)
          .addField(`Durée`, `\`${queue.current.duration}\``)
          .addField(`URL`, `${queue.current.url}`)
          .addField(`Serveur enregisté`, `\`${int.guild.name}\``)
          .addField(`Demandé par`, `${queue.current.requestedBy}`)
          .setTimestamp()
          .setFooter({ text: 'Tart\'os Musique', iconURL: int.user.displayAvatarURL({ dynamic: true }) });
          int.member.send({ embeds: [embed] }).then(() => {
                return int.reply({ content: `Je t'ai envoyé le nom de la musique en message privé ✅`, ephemeral: true, components: [] });
            }).catch(error => {
                return int.reply({ content: `Je ne peux pas t'envoyer de message privé. ❌`, ephemeral: true, components: [] });
            });
        }
        break
        case 'time': {
            if (!queue || !queue.playing) return int.reply({ content: `Aucune musique en cours de lecture. ❌`, ephemeral: true, components: [] });

            const progress = queue.createProgressBar();
            const timestamp = queue.getPlayerTimestamp();
    
            if (timestamp.progress == 'Infinity') return int.message.edit({ content: `Cette chanson est diffusée en direct, aucune donnée de durée à afficher. 🎧` });
    
            const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle(queue.current.title)
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()
            .setDescription(`${progress} (**${timestamp.progress}**%)`)
            .setFooter({ text: 'Tart\'os Musique', iconURL: int.user.displayAvatarURL({ dynamic: true }) });
            int.message.edit({ embeds: [embed] });
            int.reply({ content: `**✅ Success:** Données temporelles mises à jour. `, ephemeral: true});
        }
    }
};
