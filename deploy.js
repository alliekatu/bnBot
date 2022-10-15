//CONSTANTS
const fs = require('node:fs');
const path = require('node:path');
const { config } = require('dotenv'); 
config()
const { Routes } = require('discord.js');
const  { REST } = require('@discordjs/rest');
const CLIENT_ID = process.env.BNBOT_ID;
const TOKEN = process.env.BNBOT;

//REST
const rest = new REST({version: '10'}).setToken(TOKEN);

//DON'T WORRY ABOUT THIS TOO MUCH
//THIS JUST REGISTERS SLASH COMMANDS
async function main() {

    const commands = [];
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        commands.push(command.data.toJSON());
    }

    try {
        console.log('started / refresh');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, '1030572394525503488'), { body: commands })
        .then(data => console.log(`registered ${data.length} commands`))
        .catch(console.error);
        } finally {   
}};

main();