module.exports = {
    name: 'filter',
    aliases: [],
    utilisation: '{prefix}filter [filter name]',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

   if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Il n'y a pas de musique en cours de lecture ! ❌` });

        const actualFilter = queue.getFiltersEnabled()[0];

        if (!args[0]) return message.channel.send({ content: `${message.author}, Veuillez entrer un nom de filtre valide. ❌\n\`bassboost, 8D, nightcore\`` });

        const filters = [];
        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filter) return message.channel.send({ content: `${message.author}, Je n'ai pas trouvé de filtre portant votre nom. ❌\n\`bassboost, 8D, nightcore\`` });

        const filtersUpdated = {};

        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);

        message.channel.send({ content: `Appliqué: **${filter}**, État du filtre: **${queue.getFiltersEnabled().includes(filter) ? 'Activé' : 'Désactivé'}** ✅\n **N'oubliez pas que si la musique est longue, le temps d'application du filtre peut être plus long en conséquence.**` });
    },
};
