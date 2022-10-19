const fs = require('node:fs');
const path = require('node:path');
const { config } = require('dotenv'); 
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const rest = new REST({version: '10'}).setToken(process.env.BNBOT);

config();

//dont worry about this too much
//this just registers commands
async function main() {

    const commands = [];
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        commands.push(command.data.toJSON());
    }

    try { console.log('started / refresh');

    await 
        rest.put(Routes.applicationGuildCommands(process.env.BNBOT_ID, '1030572394525503488'), { body: commands })
        .then(data => 
            console.log(`registered ${data.length} commands`))
            .catch(console.error);
        } finally {   
    }};

main();