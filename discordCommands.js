const DisTube = require('distube');

class DiscordCommands {
	prefix = '!';
	constructor(client){
		this.client = client;
		this.distube = new DisTube.default(client);
		this.setupDistubeEvents();
	}

	setupDistubeEvents(){
		this.distube
		.on("empty", queue => queue.textChannel.send("Channel is empty. Leaving the channel"))
		.on("error", (channel, error) => channel.send(
			"An error encountered: " + error
		))
		.on("finish", queue => queue.textChannel.send("No more song in queue"))
		.on("initQueue", queue => {
			queue.autoplay = false;
			queue.volume = 100;
		})
		.on("noRelated", queue => queue.textChannel.send("Can't find related video to play."))
		.on("playSong", (queue, song) => queue.textChannel.send(
			`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
		))
		.on("searchCancel", (message) => message.channel.send(`Searching canceled`))
		.on("searchInvalidAnswer", (message) => message.channel.send(`You answered an invalid number!`))
		.on("searchNoResult", (message, query) => message.channel.send(`No result found for ${query}!`))
		.on("searchResult", (message, results) => {
			message.channel.send(`**Choose an option from below**\n${
				results.map((song, i) => `**${i + 1}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")
			}\n*Enter anything else or wait 60 seconds to cancel*`);
		});
	}

	run(message) {
		const args = message.content.trim().split(/ +/g);
		const cmd = args[0].slice(this.prefix.length).toLowerCase();

		if (message.content.startsWith(this.prefix) && !message.author.bot) {
			if (cmd + 'Command' in this) {
				this[cmd + 'Command'](message, args);
			}
		}
	}

	// Put your commands below 
	// Naming: {commandName}Command
	pingCommand(message, args) {
		message.channel.send('pong');
		if (args[1] == 'bob') {
			message.react('🤔');
		}
	}

	playCommand(message, args){
		this.distube.play(message, args[1]);
	}

	stopCommand(message, args){
		this.distube.stop(message);
	}
}

module.exports = DiscordCommands