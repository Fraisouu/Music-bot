const Discord = require('discord.js');
module.exports = {
    name: 'save',
    aliases: [],
    utilisation: '{prefix}save',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

  if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Il n'y a pas de musique en cours de lecture ! ❌` });

  const embed = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setTitle(client.user.username + " - Enregistrer la musique")
  .setThumbnail(client.user.displayAvatarURL())
  .addField(`Musique`, `\`${queue.current.title}\``)
  .addField(`Durée`, `\`${queue.current.duration}\``)
  .addField(`URL`, `${queue.current.url}`)
  .addField(`Serveur enregistré`, `\`${message.guild.name}\``)
  .addField(`Demandé par`, `${queue.current.requestedBy}`)
  .setTimestamp()
  .setFooter({ text: 'Tart\'os Musique', iconURL: message.author.avatarURL({ dynamic: true }) });
  message.author.send({ embeds: [embed] }).then(() => {
            message.channel.send({ content: `J'ai envoyé le nom de la musique par message privé. ✅` });
        }).catch(error => {
            message.channel.send({ content: `${message.author}, Impossible de vous envoyer un message privé. ❌` });
        });
    },
};
