const { Player } = require('discord-player');
const { Client, Intents, Collection } = require('discord.js');
const { readdirSync } = require('fs');
require("dotenv").config();

let client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});

client.config = require('./config');
client.player = new Player(client, client.config.opt.discordPlayer);
client.commands = new Collection();
const player = client.player

const events = readdirSync('./events/').filter(file => file.endsWith('.js'));
for (const file of events) {
    const event = require(`./events/${file}`);
    console.log(`-> Loaded event ${file.split('.')[0]}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
};
console.log(`-> Loaded commands...`);
readdirSync('./commands/').forEach(dirs => {
    const commands = readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`${command.name.toLowerCase()} Load Command!`);
        client.commands.set(command.name.toLowerCase(), command);
        delete require.cache[require.resolve(`./commands/${dirs}/${file}`)];
    };
});


player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    queue.metadata.send({ content: `🎵 La musique a commencé à jouer: **${track.title}** -> Salon: **${queue.connection.channel.name}** 🎧` });
});

player.on('trackAdd', (queue, track) => {
    queue.metadata.send({ content: `**${track.title}** ajouté à la liste de lecture. ✅` });
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send({ content: 'Quelqu\'un du salon auquel je suis connecté m\'a viré, toute la liste de lecture a été effacée ! ❌' });
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send({ content: 'J\'ai quitté le salon car il n\'y a personne dans mon salon. ❌' });
});

player.on('queueEnd', (queue) => {
    if(client.config.opt.voiceConfig.leaveOnTimer.status === true) {
        setTimeout(() => {
            if(queue.connection) queue.connection.disconnect();
        }, client.config.opt.voiceConfig.leaveOnTimer.time);
    }
    queue.metadata.send({ content: 'Toute la file d\'attente de lecture est terminée, je pense que vous pouvez écouter un peu plus de musique. ✅' })
});


if(process.env.TOKEN){
client.login(process.env.TOKEN).catch(e => {
console.log("The Bot Token You Entered Into Your Project Is Incorrect Or Your Bot's INTENTS Are OFF!")
})
} else {
console.log("Please Write Your Bot Token Opposite The Token In The config.js File In Your Project!")
}
