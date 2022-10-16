//constants
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { config } = require('dotenv'); 
config();
const { v2, auth } = require('osu-api-extended');


module.exports = {
    // /user command
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('gives basic information for an osu! user')
        .addStringOption(option => option.setName('username')
            .setDescription('the username of the osu! user')
            .setRequired(true))
        .addStringOption(option => option.setName('gamemode')
            .setDescription('the gamemode you want to see info for')
            .setRequired(true)),

    //what entering the command in discord does
	async execute(interaction) {
        //nominator and mode are whatever the user inputs
		const user = interaction.options.getString('username');
        const mode = interaction.options.getString('gamemode');
        //auth
        await auth.login_lazer(process.env.CLIENT_USER, process.env.CLIENT_SECRET);

        const main = async () => {
            let osuData = await v2.user.details(user, mode);
            const userEmbed = new EmbedBuilder()
                    .setColor(0x7f03fc)
                    .setTitle(`${osuData.username}`)
                    .setThumbnail(osuData.avatar_url)
                    .setURL(`https://osu.ppy.sh/users/${osuData.id}`)
                    .setAuthor({name: 'bnBot'})
                    .addFields({ name: 'country', value: `${osuData.country.name} :flag_${osuData.country.code.toLowerCase()}:` })
                    .addFields({ name: 'groop :)', value: `${osuData.default_group}` })
                console.log(osuData.username);
                interaction.reply({ embeds: [userEmbed] });
        }
            main();
        }
}
