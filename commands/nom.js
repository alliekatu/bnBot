const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { config } = require('dotenv'); 
config();
const { v2, auth } = require('osu-api-extended');

module.exports = {
    // /user command
	data: new SlashCommandBuilder()
		.setName('nom')
		.setDescription('gives nomination history for a beatmap nominator')
        .addStringOption(option => option.setName('username')
            .setDescription('the username of the beatmap nominator')
            .setRequired(true)),

    async execute(interaction) {
        //user is whatever the user inputs
        const user = interaction.options.getString('username');
        //auth
        await auth.login_lazer(process.env.CLIENT_USER, process.env.CLIENT_SECRET);

        const main = async () => {
            let osuData = await v2.user.details(user, 'osu');
            const nomEmbed = new EmbedBuilder()
                    .setColor(0x7f03fc)
                    .setTitle(`nomination history for ${osuData.username}  :flag_${osuData.country.code.toLowerCase()}:`)
                    .setThumbnail(osuData.avatar_url)
                    .setURL(`https://osu.ppy.sh/users/${osuData.id}/modding`)
                    .setAuthor({name: 'bnBot'})
                    .setDescription(osuData.default_group.toUpperCase())
                        .addFields({ name: 'wip', value: ':)', inline: true })
                console.log(osuData.username);
                interaction.reply({ embeds: [nomEmbed] });
        }

        main(); 

    }
}