require('log-timestamp');
const fs = require('node:fs');
const path = require('node:path');
const cron = require('node-cron');
const { config } = require('dotenv');
const { PythonShell } = require('python-shell'); 
const { Client, Collection } = require('discord.js');
const client = new Client({ intents: 3243773 });

config();

//gets command files and adds them to these constants
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	client.commands.set(command.data.name, command);
}

client.login(process.env.BNBOT);
client.on('ready', () => {
    console.log(`${client.user} up`);
	client.user.setActivity('the BNG', {type: 3})

	//updates bn scores in background on startup
		let scores = [];
		let pyshell = new PythonShell('commands/nom.py');

		pyshell.send('x')

		pyshell.on(`message`, function (message) {
				scores.push(message);
				console.log(message);
			}
		)

		pyshell.end(function (err,code,signal) {
			if (err) throw err;
				fs.writeFile("commands/scores.txt", JSON.stringify(scores), function(err) {
					if(err) {
						return console.log(err);
					}
				})
				console.log('scores updated')
			}
		)
		module.exports = scores;
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
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'error', ephemeral: true });
	}
});

//dev test
