require('dotenv').config(); //initialize dotenv


const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
const DiscordCommands = require('./discordCommands.js');
const discordCommands = new DiscordCommands(client);
const DJ_Pesho = require('./DJ_Pesho.js');
const dj_pesho = new DJ_Pesho(client);

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);	
});

client.on('interactionCreate', async interaction => {
  	if (!interaction.isCommand()) return;
	const { commandName } = interaction;
	var message;
	
	switch (commandName)
	{
		case 'п':
			const url = interaction.options.getString('линк');
			// Test Music HERE
			
			dj_pesho.play(interaction.message, url);

			//
			message = "Специален поздрав за "+interaction.user.username+" с песента "+url;
			break;
		default:
			message = "Пешо не знаа кво искаш да каеш ;(";
	}	
	await interaction.reply(message);
});


client.on('messageCreate', (message) => {
	discordCommands.run(message);
});

client.login(process.env.CLIENT_TOKEN);