const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('п').setDescription('Пуска мазна чалка.')
	.addStringOption(option => option.setName('линк').setDescription('линк към парчето.'))
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken('ODk4MTk0NDYyNTY2NjQ1NzYw.YWgqxw.RMS9sPKeTYZEWAVYFwbtLenrUsg');

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);