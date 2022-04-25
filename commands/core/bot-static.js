const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
    name: 'static',
    aliases: ["statistics","i","istatistik"],
    utilisation: '{prefix}static',

    execute(client, message) {
        let button = new MessageActionRow().addComponents(
            new MessageButton()
            .setStyle("SUCCESS")
            .setLabel("Update")
            .setCustomId("rel"),
            new MessageButton()
            .setStyle("DANGER")
            .setLabel("Delete")
            .setCustomId("del"))
            
                let embed = new MessageEmbed()
                .setColor("BLUE")
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL())
                .setTitle(client.user.username)
                .setFooter({ text: 'Tart\'os Musique', iconURL:message.author.avatarURL({ dynamic: true }) })
                .setDescription(`**
            > Serveurs: \`${client.guilds.cache.size}\`
            > Utilisateurs: \`${Math.ceil(client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString("tr-TR"))}.000\`
            > Salons: \`${client.channels.cache.size}\`**`)
                .addField("Invite Bot", `**[Ajoute Moi](https://discord.com/api/oauth2/authorize?client_id=968235719325802616&permissions=8&scope=bot%20applications.commands)**` ,true)
                message.channel.send({embeds:[embed], components:[button]}).then(async Message => {
                    
                    const filter = i =>  i.user.id === message.author.id
                    let col = await Message.createMessageComponentCollector({filter, time: 1200000 });
            
                    col.on('collect', async(button) => {
                    if(button.user.id !== message.author.id) return
                    
                      switch (button.customId) {
                        case 'rel':
                              const embedd = new MessageEmbed()
                        .setColor("BLUE")
                        .setTimestamp()
                        .setThumbnail(client.user.displayAvatarURL())
                        .setTitle(client.user.username)
                        .setFooter({ text: 'Tart\'os Musique', iconURL:message.author.avatarURL({ dynamic: true }) })
                        .setDescription(`**
            > Guilds: \`${client.guilds.cache.size}\`
            > Users: \`${Math.ceil(client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString("tr-TR"))}.000\`
            > Channels: \`${client.channels.cache.size}\`**`)
                        .addField("Invite Bot", `**[Ajoute Moi](https://discord.com/api/oauth2/authorize?client_id=968235719325802616&permissions=8&scope=bot%20applications.commands)**` ,true)
                              
                        await Message.edit({embeds: [embedd]})
                        button.reply({content: "> **✅ Success:** Bot statistics mis à jour!", ephemeral: true}).catch(e => { });
            
                        break
                        case 'del':
                        col.stop(true)
                        await message.delete().catch(e => { });
                        await Message.delete().catch(e => { });
                        button.reply({content: "> **✅ Success** Bot statistic supprimé !", ephemeral: true}).catch(e => { });
                        break
            
                      }
                    })
                    col.on('end', async(button) => {

                         button = new MessageActionRow().addComponents(
                            new MessageButton()
                            .setStyle("SUCCESS")
                            .setLabel("Update")
                            .setCustomId("rel")
                            .setDisabled(true),
                            new MessageButton()
                            .setStyle("DANGER")
                            .setLabel("Delete")
                            .setCustomId("del")
                            .setDisabled(true))

                        const embedd = new MessageEmbed()
                        .setColor("BLUE")
                        .setTimestamp()
                        .setThumbnail(client.user.displayAvatarURL())
                        .setTitle(client.user.username + " Temps de commande terminé")
                        .setFooter({ text: 'Tart\'os Musique', iconURL:message.author.avatarURL({ dynamic: true }) })
                        .setDescription(`**
            > Guilds: \`${client.guilds.cache.size}\`
            > Users: \`${Math.ceil(client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString("tr-TR"))}.000\`
            > Channels: \`${client.channels.cache.size}\`**`)
                        .addField("Invite Bot", `**[Ajoute Moi](https://discord.com/api/oauth2/authorize?client_id=968235719325802616&permissions=8&scope=bot%20applications.commands)**` ,true)
                              
                        await Message.edit({embeds: [embedd], components:[button]})
                    })
                }).catch(e => { });
    },
};
