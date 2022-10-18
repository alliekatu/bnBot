//constants
const fs = require('node:fs');
const path = require('node:path');
const { config } = require('dotenv'); 
config();
const { Client, Collection } = require('discord.js');
const client = new Client({ intents: 3243773 });
const { PythonShell } = require('python-shell');
require('log-timestamp');

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
client.login(process.env.BNBOT);
client.on('ready', () => {
    console.log(`${client.user} up`);
	client.user.setActivity('the BNG', {type: 3})

	//grabs bn score for every bn on startup
	let scores = [];
	let pyshell = new PythonShell('commands/nomHistory.py');

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
			console.log('the exit code was' + code)
			console.log('the exit signal was' + signal)
			console.log('finished')
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
	//catches if theres an error
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'error', ephemeral: true });
	}
});
