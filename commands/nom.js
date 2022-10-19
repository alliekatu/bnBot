const fs = require('node:fs');
const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');
const { config } = require('dotenv'); 
config();
const { v2, auth } = require('osu-api-extended');
require('log-timestamp');

module.exports = {
    // /user command
	data: new SlashCommandBuilder()
		.setName('nom')
		.setDescription('gives nomination history for a beatmap nominator')
        .addStringOption(option => option.setName('username')
            .setDescription('the username of the beatmap nominator')
            .setRequired(true)),

    async execute(interaction) {
        //auth
        await auth.login_lazer(process.env.CLIENT_USER, process.env.CLIENT_SECRET);
        const user = interaction.options.getString('username')

        const main = async () => {
            let osuData = await v2.user.details(user, 'osu');

        fs.readFile('commands/scores.txt', 'utf8', function(err, data) {
            const scores = data
                .replace(/"/g,'')
                .replace('[','')
                .replace(']','')
                .split(',')
            const [aqua, 
                syncro, 
                aakki, 
                dada, 
                didah,
                hinsvar,
                log_off_now,
                nekroman4ik,
                nozhomi,
                okoratu,
                riffy,
                usaha,
                tomatas95,
                flask,
                vinxis,
                fieryrage,
                yogurtt,
                kyle_y,
                rosario_wknd,
                timemon,
                yugu,
                jonathanlfj,
                lasse,
                vararaup,
                sajinn,
                morrighan,
                keywee,
                nevo,
                neonat,
                uberzolik,
                aistre,
                ajt,
                amamya,
                andrea,
                apo11o,
                beomsan,
                cellina,
                eiri,
                enneya,
                iceluin,
                len,
                luscent,
                mafumafu,
                mirash,
                mnyui,
                noffy,
                ryuusei_aika,
                saggin,
                shmiklak,
                smokelind,
                sotarks,
                thekinghenry,
                wafer
            ] = scores

            const rawScore = eval(osuData.username.replace(/ /g, '_').replace(/-/g, '').toLowerCase());
            const stringScore = rawScore.replace(/[^0-9.]/gi, '');
            const score = Number(stringScore).toFixed(2);

            // const osuUser = window[osuData.username.replace(/ /g, '_').replace(/-/g, '').toLowerCase()]
            // console.log(osuUser);
            // var score = osuUser.replace(/[^0-9]/gi, '')

            const userEmbed = new EmbedBuilder()
                .setColor(0xFF9BB0)
                .setTitle(`${osuData.username}  :flag_${osuData.country.code.toLowerCase()}:`)
                .setThumbnail(osuData.avatar_url)
                .setDescription(osuData.default_group.toUpperCase())
                .setAuthor({name: 'bnBot', iconURL: 'https://i.imgur.com/bEGHL4D.png', url: 'https://github.com/alliekatu/bnBot'})
                .setURL(`https://osu.ppy.sh/users/${osuData.id}`)
                    .addFields({ name: 'ranked', value: osuData.ranked_and_approved_beatmapset_count.toString(), inline: true })
                    .addFields({ name: 'pending', value: osuData.pending_beatmapset_count.toString(), inline: true })
                    .addFields({ name: 'graved', value: osuData.graveyard_beatmapset_count.toString(), inline: true })
                    .addFields({ name: 'kudosu', value: osuData.kudosu.total.toString() })
                    .addFields({ name: 'mapping subscribers', value: osuData.mapping_follower_count.toString() });

            const nomEmbed = new EmbedBuilder()
                .setColor(0xFF9BB0)
                .setTitle(`BN score for ${osuData.username}  :flag_${osuData.country.code.toLowerCase()}:`)
                .setThumbnail(osuData.avatar_url)
                .setDescription('based on unique nomination and reset history')
                .setURL(`https://osu.ppy.sh/beatmapsets/events?user=${osuData.avatar_url}&types%5B%5D=nominate&types%5B%5D=qualify&types%5B%5D=nomination_reset_received&min_date=&max_date=`)
                    .addFields({ name: 'score', value: `${score}`, inline: true });

            console.log(osuData.username);
            // console.log(score)
            interaction.reply({ embeds: [userEmbed, nomEmbed] });
        });
    }
        main();
    }
}