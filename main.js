const Discord = require('discord.js');
require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect(`the link for your database`, { useNewUrlParser: true, useUnifiedTopology: true })
const keepAlive = require('./server.js');

const client = new Discord.Client();
client.command = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

keepAlive;
client.login();