module.exports = (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    const prefix = client.config.px;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    const DJ = client.config.opt.DJ;

    if (cmd && DJ.enabled && DJ.commands.includes(cmd.name)) {
        const roleDJ = message.guild.roles.cache.find(x => x.name === DJ.roleName);

        if (!message.member.roles.cache.has(roleDJ.id)) {
            return message.channel.send({ content: `${message.author}, Cette commande est définie uniquement pour ceux qui ont le ${DJ.roleName} role. ❌` });
        }
    }

    if (cmd && cmd.voiceChannel) {
        if (!message.member.voice.channel) return message.channel.send({ content: `${message.author}, Vous n'êtes pas connecté à un  salon. ❌` });
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({ content: `${message.author}, Vous n'êtes pas dans le même salon que moi. ❌` });
    }

    if (cmd) cmd.execute(client, message, args);
};
