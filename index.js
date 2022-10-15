//CONSTANTS
const fs = require('node:fs');
const path = require('node:path');
const { config } = require('dotenv'); 
config();
const { Client, Collection } = require('discord.js');
const TOKEN = process.env.BNBOT;
const client = new Client({intents: 
    3243773
});

//GETS COMMAND FILES
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

//LOGIN AND STATUS
client.login(TOKEN);
client.on('ready', () => {
    console.log(`${client.user.tag} up`);
	client.user.setActivity('the BNG', {type: 3})
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) 
        return;

	const command = client.commands.get(interaction.commandName);

	if (!command) 
        return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'error', ephemeral: true });
	}
});
