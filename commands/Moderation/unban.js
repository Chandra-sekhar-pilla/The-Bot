module.exports = {
    name: 'unban',
    description: 'unbans the mentioned member from a guild',
    syntax: '!unban <user>',
    async execute(client, message, args, Discord) {
        const sLogsChannel = message.guild.channels.cache.find(chn => chn.name === 'server-logs');
        const server = message.guild;

        if (message.member.hasPermission('BAN_MEMBERS')) {
            message.guild.fetchBan(args[0]).then(bannedUser => {
                message.guild.members.unban(bannedUser.user.id).catch(console.error)
                const embedMsg = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setDescription(`${bannedUser.user.tag} was unbanned.`);
                message.channel.send(embedMsg);
                sLogsChannel.send(embedMsg);
            })
        }
        else {
            message.reply('You didn\'t have the permission to use this Command.');
        }
    }
}
