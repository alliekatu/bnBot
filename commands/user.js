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
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('gives basic information for an osu! user')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('the username of the osu! user')
                .setRequired(true)),

	async execute(interaction) {
		const nominator = interaction.options.getString('username');
        
        osuApi.getUser({u: nominator}).then(user => {
                const userEmbed = new EmbedBuilder()
                    .setColor(0x7f03fc)
                    .setTitle(`osu! user ${user.name}`)
                    .setURL(`https://osu.ppy.sh/users/${user.id}`)
                    .setAuthor({name: 'bnBot'})
                    .addFields(
                        { name: 'placeholder', value: 'placeholder' },
                        { name: 'placeholder', value: 'placeholder', inline: true },
                        { name: 'placeholder', value: 'placeholder', inline: true },
                    )
                console.log(user.name);
                interaction.reply({ embeds: [userEmbed] });
            }).catch(console.error);
        }
	}
