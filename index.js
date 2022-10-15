//constants
const fs = require('node:fs');
const path = require('node:path');
const { config } = require('dotenv'); 
config();
const { Client, Collection } = require('discord.js');
const TOKEN = process.env.BNBOT;
const client = new Client({ intents: 3243773 });

//gets command files and adds them to these constants
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	client.commands.set(command.data.name, command);
}

//puts the bot online and sets status
client.login(TOKEN);
client.on('ready', () => {
    console.log(`${client.user} up`);
	client.user.setActivity('the BNG', {type: 3})
});

client.on('interactionCreate', async interaction => {
	//not a command? fuck off
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);
	//not a valid command? fuck off
	if (!command) return;

	//does the command
	try {
		await command.execute(interaction);
	//catches if theres an error
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'error', ephemeral: true });
	}
});
