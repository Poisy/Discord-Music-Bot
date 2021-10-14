require('dotenv').config(); //initialize dotenv

const Discord = require('discord.js'); //import discord.js

const client = new Discord.Client(); //create new client

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//make sure this line is the last line
//login bot using token
client.login("ODk4MTk0NDYyNTY2NjQ1NzYw.YWgqxw.wCndAFyMZiSJ6gO3RKYoJbNl6uE");