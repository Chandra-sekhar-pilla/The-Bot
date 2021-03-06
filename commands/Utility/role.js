module.exports = {
	name: 'role',
	aliases: ['giverole', 'role'],
	description: 'Add the mentioned role to the member who used this command.',
	syntax: '!role <role>',
	execute(client, message, args, Discord) {
		serverRoles = "";
		message.guild.roles.cache.forEach(roles => {
			if (roles.name === 'member' || roles.name === '@everyone' || roles.name === 'admin' || roles.name === 'Muted' || roles.name.includes('Bot') || roles.name === 'mod' || roles.name === 'Staff' || roles.name === 'ModMail' || roles.name.includes('Booster') || roles.name === 'event manager' || roles.name.includes('voted') || roles.name.includes('Dyno') || roles.name === 'Groovy' || roles.name.includes('manager') || roles.name.includes('bot') || roles.name.includes('Admin') || roles.name.includes('Denz') || roles.name.includes('shrimp') || roles.name.includes('first member')) {
				return;
			}
			else {
				serverRoles += `${roles.name}\n`;
			}
		})
		if (serverRoles === "") {
			serverRoles += "the Server has no Roles available.";
		}

		mess = args.slice(0).join(' ');
		if (mess) {
			if (mess.includes('Bot') || mess.includes('Dyno') || mess.includes('Muted') || mess.includes('manager') || mess.includes('Groovy') || mess.includes('Server Booster')) return message.reply("These Roles are prohibited.");
			else {
				let myRole = message.guild.roles.cache.find(role => role.name === args.slice(0).join(' ').toLowerCase());
				if (!myRole) return message.channel.send("Role not found.");
				else if (myRole) {
					let permissions = message.guild.roles.cache.find(role => role.name === `${args.slice(0).join(" ").toLowerCase()}`).permissions.serialize();
					console.log(permissions);
					if (permissions.VIEW_AUDIT_LOG && message.member.hasPermission("VIEW_AUDIT_LOG")) {
						console.log("Working!");
						message.member.roles.add(myRole).catch(console.error);
						const embmsg = new Discord.MessageEmbed()
							.setColor('#f0fc03')
							.setDescription(`Role ${myRole} is added to.\n Also welcome, new staff.`);
						message.channel.send(embmsg);
					} else if (!permissions.VIEW_AUDIT_LOG) {
						console.log("working");
						message.member.roles.add(myRole).catch(console.error);
						const embmsg = new Discord.MessageEmbed()
							.setColor('#f0fc03')
							.setDescription(`Role ${myRole} is added to you hope you like it.`);
						message.channel.send(embmsg);
					} else {
						message.reply("These Roles are prohibited.");
					}
				}
			}
		} else {
			const embdMsg = new Discord.MessageEmbed()
				.setTitle("Roles:")
				.setColor("#19fff0")
				.addFields
				({ name: "Roles in this server are:", value: `${serverRoles}` });
			message.channel.send(embdMsg);
		}
	}
}
