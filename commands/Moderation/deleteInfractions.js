const mongo = require('../../mongo')
const schema = require('../../schema')

module.exports = {
    name: 'deleteInfraction',
    description: 'Send warning details by infraction IDs.',
    aliases: ['delinfr', 'di'],
    syntax: '!di <infrID>',

    async execute(client, message, args, Discord) {
        var athr = '';
        const embdmsg = new Discord.MessageEmbed()
        if (message.member.hasPermission('KICK_MEMBERS')) {
            await mongo().then(async mongoose => {
                try {
                    const guildId = message.guild.id;
                    const results = await schema.findOne({
                        guildId,
                    });
                    if (!results) return message.channel.send('No Infractions were found in this guild.')
                    else {
                        for (var i = 0; i < results.warnings.length; i++) {
                            console.log(results.warnings[i].infrID);
                            var res = results.warnings;
                            var { author, userID, timestamp, reason, infrType, infrID } = results.warnings[i];
                            if (infrID.toString() === `${args[0]}`) {
                                athr += `${author}`;
                                embdmsg
                                    .setTitle('Deleted Infraction')
                                    .setColor('#ff0000')
                                    .setFooter(`Infraction ID: ${infrID}`)
                                    .addFields(
                                        { name: "Author", value: `${author}` },
                                        { name: 'User', value: `${userID}` },
                                        { name: 'Infraction Type:', value: `${infrType}` },
                                        { name: 'Reason', value: `${reason}` },
                                    );

                                await mongo().then(async mongoose => {
                                    try {
                                        await schema.findOneAndUpdate({
                                            guildId,
                                        }, {
                                            guildId,
                                            $pull: {
                                                warnings: results.warnings[i]
                                            }
                                        }, {
                                            upsert: true
                                        })
                                    } finally {
                                        mongoose.connection.close();
                                    }
                                })
                            } else {
                                continue;
                            }
                        }
                    }
                } finally {
                    mongoose.connection.close();
                }
            })
            if (athr == '') return message.channel.send("No warning was found for the given infraction ID.");
            else return message.channel.send(embdmsg);
        } else {
            message.channel.send('No permission.');
        }
    }
}