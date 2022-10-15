//constants
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { config } = require('dotenv'); 
config();
const osu = require('node-osu');
const osuApi = new osu.Api(process.env.OSUAPIKEY, {
	notFoundAsError: true,
	completeScores: false,
	parseNumeric: false
});

module.exports = {
    // /user command
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('gives basic information for an osu! user')
        .addStringOption(option => option.setName('username')
            .setDescription('the username of the osu! user')
            .setRequired(true)),

    //what entering the command in discord does
	async execute(interaction) {
        //nominator is whatever the user inputs
		const nominator = interaction.options.getString('username');
        
        //checks if nominator is a valid user ; if yea, it creates an embed with the info in 'user'
        osuApi.getUser({u: nominator}).then(user => { const userEmbed = new EmbedBuilder()
                    .setColor(0x7f03fc)
                    .setTitle(`osu! user ${user.name}`)
                    .setURL(`https://osu.ppy.sh/users/${user.id}`)
                    .setAuthor({name: 'bnBot'})
                    .addFields(
                        { name: 'placeholder', value: 'placeholder' },
                        { name: 'placeholder', value: 'placeholder', inline: true },
                        { name: 'placeholder', value: 'placeholder', inline: true })
                //log the osu users name and send the embed  
                console.log(user.name);
                interaction.reply({ embeds: [userEmbed] });
            //if not a valid user, catch and log the error
            }).catch(console.error);
        }
	}
