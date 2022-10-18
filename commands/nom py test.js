const fs = require('node:fs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { config } = require('dotenv'); 
config();
//const { v2, auth } = require('osu-api-extended');
require('log-timestamp');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nomtest')
		.setDescription('gives nomination history for a beatmap nominator (python)'),
        //.addStringOption(option => option.setName('username')
        //    .setDescription('the username of the beatmap nominator')
        //    .setRequired(true)),

    async execute(interaction) {
        //await auth.login_lazer(process.env.CLIENT_USER, process.env.CLIENT_SECRET);
        //const user = interaction.options.getString('username');

        const main = async () => {
            //let osuData = await v2.user.details(user, 'osu');
            fs.readFile('commands/scores.txt', 'utf8', function(err, data) {
                let scores = data
                    .replace(/"/g,'')
                    .replace('[','')
                    .replace(']','')
                    .split(',')
                    .join('\n');
                // const nomEmbed = new EmbedBuilder()
                        // .setColor(0x7f03fc)
                        // .setTitle(`bn score for all nominators  :flag_aq:`)
                        // .setURL(`https://osu.ppy.sh/groups/28?filter=all&mode=osu`)
                        // .setAuthor({name: 'bnBot'})
                            // .addFields({ name: 'scores', value: 'wip', inline: true });

                interaction.reply({ 
                    //embeds: [nomEmbed], 
                    content: scores
                });
            });
        }
            main();
    }
}