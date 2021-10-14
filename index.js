require('dotenv').config(); //initialize dotenv

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//make sure this line is the last line
//login bot using token
client.login(process.env.CLIENT_TOKEN);