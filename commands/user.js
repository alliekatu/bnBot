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
            .setRequired(true)),

    //what entering the command in discord does
	async execute(interaction) {
        //user is whatever the user inputs
		const user = interaction.options.getString('username');
        //auth
        await auth.login_lazer(process.env.CLIENT_USER, process.env.CLIENT_SECRET);

        const main = async () => {
            let osuData = await v2.user.details(user, 'osu');
            const userEmbed = new EmbedBuilder()
                    .setColor(0x7f03fc)
                    .setTitle(`${osuData.username}  :flag_${osuData.country.code.toLowerCase()}:`)
                    .setThumbnail(osuData.avatar_url)
                    .setURL(`https://osu.ppy.sh/users/${osuData.id}`)
                    .setAuthor({name: 'bnBot'})
                    .setDescription(osuData.default_group.toUpperCase())
                        .addFields({ name: 'ranked', value: osuData.ranked_and_approved_beatmapset_count.toString(), inline: true })
                        .addFields({ name: 'pending', value: osuData.pending_beatmapset_count.toString(), inline: true })
                        .addFields({ name: 'graved', value: osuData.graveyard_beatmapset_count.toString(), inline: true })
                        .addFields({ name: 'kudosu', value: osuData.kudosu.total.toString() })
                        .addFields({ name: 'mapping subscribers', value: osuData.mapping_follower_count.toString() });

            console.log(osuData.username);
            console.log(osuData.groups);
            interaction.reply({ embeds: [userEmbed] });
        }

        const condition = await v2.user.details(user, 'osu')
        if (condition.default_group = 'bng' || 'nat') {
            main();
        } else {
            interaction.reply({content: `${condition.username} is not a beatmap nominator or NAT`})
        }
    }
}
