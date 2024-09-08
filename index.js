const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});
const fs = require("fs")
const Discord = require('discord.js')
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_BANS,
    Discord.Intents.FLAGS.GUILD_INVITES
  ]
})

var { inviteTracker } = require("discord-inviter"), 
  tracker = new inviteTracker(client);

let packagejson = JSON.parse(fs.readFileSync('./rooms.json' , 'utf8'));

const prefix = "!"; //          
const config = require("./config.json")
client.on("ready", () => {
  console.log(`${client.user.tag} Is Online Now`) ///// made by ZERO 
})



client.on("messageCreate", message => {
  if(message.content == prefix + "help"){ ///// made by ZERO | ZERO ✨
    let embed = new Discord.MessageEmbed()
    .setTitle("Help Menu !") 
    .addField(`> ${prefix}set-channels-room`,"`\`\- لتحديد روم اللوج تبع الرومات `\`\ ")
    .addField(`> ${prefix}set-kick-room`,"`\`\- لتحديد روم اللوج تبع الطرد `\`\ ")
    .addField(`> ${prefix}set-ban-room`,"`\`\- لتحديد روم اللوج تبع البان `\`\ ")
    .addField(`> ${prefix}set-members-room`,"`\`\- لتحديد روم اللوج تبع الاعضاء `\`\ ")
    .addField(`> ${prefix}set-messages-room`,` \`\- لتحديد روم اللوج تبع الرسائل  \`\ `)
    .addField(`> ${prefix}set-bots-room`,` \`\- لتحديد روم اللوج تبع دخول البوتات  \`\ `)
    .addField(`> ${prefix}set-voice-room`,` \`\- لتحديد روم اللوج تبع الفويسات  \`\ `)
    .addField(`> ${prefix}set-roles-room`,` \`\- لتحديد روم اللوج تبع الرولات  \`\ `)
    .addField(`> ${prefix}set-invites-room`,` \`\- لتحديد روم اللوج تبع الانفايت  \`\ `)
    .setThumbnail(`${client.user.displayAvatarURL({format: "png",size: 1024,dynamic: true})}`)
    .setTimestamp()

    let embed2 = new Discord.MessageEmbed()
    .setTitle("Help Menu !")
    .addField(`> ${prefix}current-channels-room`,"`\`\- لرؤيه الروم المحدده للوج تبع الرومات `\`\ ")
    .addField(`> ${prefix}current-kick-room`,"`\`\- لرؤيه الروم المحدده للوج تبع الطرد `\`\ ")
    .addField(`> ${prefix}current-ban-room`,"`\`\- لتحديد روم اللوج تبع البان `\`\ ")
    .addField(`> ${prefix}current-members-room`,"`\`\- لرؤيه الروم المحدده للوج تبع الاعضاء `\`\ ")
    .addField(`> ${prefix}current-messages-room`,` \`\- لرؤيه الروم المحدده للوج تبع الرسائل  \`\ `)
    .addField(`> ${prefix}current-bots-room`,` \`\- لرؤيه الروم المحدده للوج تبع دخول البوتات  \`\ `)
    .addField(`> ${prefix}current-voice-room`,` \`\- لرؤيه الروم المحدده للوج تبع الفويسات  \`\ `)
    .addField(`> ${prefix}current-roles-room`,` \`\- لرؤيه الروم المحدده للوج تبع الرولات  \`\ `)
    .addField(`> ${prefix}current-invites-room`,` \`\- لرؤيه الروم المحدده للوج تبع الانفايت  \`\ `)
    .setThumbnail(`${client.user.displayAvatarURL({format: "png",size: 1024,dynamic: true})}`)
    .setTimestamp()

    let embed3 = new Discord.MessageEmbed()
    .setTitle("Help Menu !")
    .addField(`> ${prefix}list`,"`\`\- لرؤيه الرومات الموجوده حاليا في اللوج `\`\ ")
    .addField(`> ${prefix}help`,"`\`\- لرؤيه قائمه اوامر البوت`\`\ ")
    .setThumbnail(`${client.user.displayAvatarURL({format: "png",size: 1024,dynamic: true})}`)
    .setTimestamp()
    
		const row = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageButton()
					.setCustomId('next')
					.setEmoji('➡')
					.setStyle('PRIMARY')
      );

		const row2 = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageButton()
					.setCustomId('previous')
					.setEmoji("⬅")
					.setStyle('PRIMARY'),
				new Discord.MessageButton()
					.setCustomId('next2')
					.setEmoji('➡')
					.setStyle('PRIMARY')
      );

		const row3 = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageButton()
					.setCustomId('previous2')
					.setEmoji('⬅')
					.setStyle('PRIMARY')
      );
    
    message.reply({embeds: [embed],components: [row]}).then((msg) => {
      let filter = b => b.user.id === message.author.id;
      let collector = msg.createMessageComponentCollector({ filter: filter, componentType: 'BUTTON' }); 
collector.on('collect', async interaction => { ///// made by ZERO 
        if (interaction.customId == 'next') { ///// made by ZERO
        interaction.update({embeds:[embed2],components: [row2]})
        } else if(interaction.customId == 'previous'){
          interaction.update({embeds:[embed],components:[row]})
        } else if (interaction.customId == 'next2'){
          interaction.update({embeds: [embed3],components: [row3]})
        } else if (interaction.customId == 'previous2'){
          interaction.update({embeds:[embed2],components: [row2]})
        }
})
        
    })
  }
})




client.on('guildMemberRemove', async member => { ///// made by ZERO
  if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).members == '') return;
	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1
	});
	const kickLog = fetchedLogs.entries.first();
let channel1 = client.channels.cache.get(`${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).members}`)
  if(!channel1) return;
if(!member.guild.id.includes(`${channel1.guild.id}`)) return;

	if (!kickLog.action.includes('MEMBER_KICK') && !member.user.id.includes(`${kickLog.target.id}`)){
    channel1.send(`**${member.user.tag} Left The Server 😥**`);
  }

	const { executor, target } = kickLog;


if(kickLog.action == 'MEMBER_KICK' && kickLog.target.id == `${member.user.id}`) {
let channel = client.channels.cache.get(`${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).kick}`)
  if(!channel) return;
if(!member.guild.id.includes(`${channel.guild.id}`)) return;
    let Embed = new Discord.MessageEmbed()
    .setTitle("New Member Kicked !")
    .setDescription(`**${member.user.tag} Was kicked by ${executor}**`)
    .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
		channel.send({embeds:[Embed]});
}
	
});

tracker.on("guildMemberAdd", async (member, inviter) => { ///// made by ZERO
if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).members == '') return;
let channel1 = client.channels.cache.get(`${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).members}`)
  if(!channel1) return;
if(!member.guild.id.includes(`${channel1.guild.id}`)) return;

  
if(member.user.bot) return;
  
channel1.send(`**${member} Joined The Server \nBy : ${inviter} 🥳**`)
})

client.on("guildMemberAdd", async (member) => {
  	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'BOT_ADD',
	});
  const BotLog = fetchedLogs.entries.first();

	const { executor, target } = BotLog;

if(member.user.bot) {
  let channel2 = client.channels.cache.get(`${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).bots}`)
  if(!channel2) return;
if(!member.guild.id.includes(`${channel2.guild.id}`)) return;
  return channel2.send(`**${member} Joined The Server \nBy : ${executor}**`);
}
  
})

client.on('guildBanAdd', async member => { ///// made by ZERO | ZERO ✨
  if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).ban == '') return;
	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
	});

  const BanLog = fetchedLogs.entries.first();


	const { executor, target } = BanLog;

let channel = client.channels.cache.get(`${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).ban}`)
  if(!channel) return;
  if(!member.guild.id.includes(`${channel.guild.id}`)) return;

    let Embed = new Discord.MessageEmbed()
    .setTitle("New Member Banned ! ✈")
    .setDescription(`**${member.user.tag} Was Banned By ${executor}**`)
    .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
		channel.send({embeds:[Embed]});
	
});

client.on('guildBanRemove', async member => { ///// made bY ZERO
  if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).ban == '') return;
	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_REMOVE',
	});

  const BanLog = fetchedLogs.entries.first();


	const { executor, target } = BanLog;

let channel = client.channels.cache.get(`${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).ban}`)
  if(!channel) return;
  if(!member.guild.id.includes(`${channel.guild.id}`)) return;

    let Embed = new Discord.MessageEmbed()
    .setTitle("New Member Unbanned ! 🤗")
    .setDescription(`**${member.user.tag} Was Unbanned By ${executor}**`)
    .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
		channel.send({embeds:[Embed]});
	
});

client.on('messageDelete', async message => { ///// made by ZERO
  if(message.author.bot) return;
if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).messages == '') return;
	if (!message.guild) return;
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});
	const deletionLog = fetchedLogs.entries.first();


let channel = client.channels.cache.get(`${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).messages}`)
    if(!channel) return;
if(!message.guild.id.includes(`${channel.guild.id}`)) return;

	const { executor, target } = deletionLog;

  if(executor.id == message.author.id){
    let embed = new Discord.MessageEmbed()
    .setTitle("Message Deleted ! ❌")
    .setDescription(`**Message Author : ${message.author.tag}\n\nMessage Content : ${message.content}**`)
    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
    	channel.send({embeds: [embed]});
  }
if(!executor.id.includes(`${message.author.id}`)){
 let embed1 = new Discord.MessageEmbed()
    .setTitle("Message Deleted !")
    .setDescription(`**Message Author : ${message.author.tag}\n\nMessage Content : ${message.content}\n\nDeleted By : ${executor}**`)
    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
    	 channel.send({embeds: [embed1]});
}
     

	
})

client.on("messageUpdate", message => { ///// made by ZERO
  if(message.author.bot) return;
  if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).messages == '') return;
  
let channel = client.channels.cache.get(`${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).messages}`)
  if(!channel) return;
if(!message.guild.id.includes(`${channel.guild.id}`)) return;
  
let embed = new Discord.MessageEmbed()
  .setTitle("Message Edited ! ⚠")
  .setDescription(`**Old Message : ${message.content}\n\nNew Message : ${message.reactions.message.content}\n\nMessage Link : [here](${message.url})\n\nSent By : ${message.author}**`)
  .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)



  
channel.send({embeds: [embed]})

  
})

client.on("channelCreate", async channel => { ///// made by ZERO
if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).channels == '') return;

  
let channel1 = client.channels.cache.get(`${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).channels}`)
  if(!channel1) return;

  
if(!channel.guild.id.includes(`${channel1.guild.id}`)) return;
	const fetchedLogs = await channel.guild.fetchAuditLogs({
		limit: 1,
		type: 'CHANNEL_CREATE',
	});
  	const CreateLog = fetchedLogs.entries.first();
	const { executor } = CreateLog;
  if(executor.bot) return;
let embed = new Discord.MessageEmbed()
  .setTitle("Channel Created ! ✅")
  .setDescription(`**Channel Name : ${channel.name}\n\nChannel ID : ${channel.id}\n\nCreated By : ${executor}**`)
  .setThumbnail(`${executor.displayAvatarURL({dynamic: true})}`)
    
  channel1.send({embeds: [embed]})
})

client.on("channelDelete", async channel => { ///// made by ZERO
if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).channels == '') return;
let channel1 = client.channels.cache.get(`${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).channels}`)
  if(!channel1) return;
if(!channel.guild.id.includes(`${channel1.guild.id}`)) return;
	const fetchedLogs = await channel.guild.fetchAuditLogs({
		limit: 1,
		type: 'CHANNEL_DELETE',
	});
  	const CreateLog = fetchedLogs.entries.first();
	const { executor } = CreateLog;
  if(executor.bot) return;

  let embed = new Discord.MessageEmbed()
  .setTitle("Channel Deleted ! ❌")
  .setDescription(`**Channel Name : ${channel.name}\n\nChannel ID : ${channel.id}\n\nDeleted By : ${executor}**`)
  .setThumbnail(`${executor.displayAvatarURL({dynamic: true})}`)

  channel1.send({embeds: [embed]})
})

client.on("channelUpdate", async (Old, New) =>{ ///// made by ZERO
if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).channels == '') return;
let channel1 = client.channels.cache.get(`${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).channels}`)
  if(!channel1) return;
if(!Old.guild.id.includes(`${channel1.guild.id}`)) return;
if(!New.guild.id.includes(`${channel1.guild.id}`)) return;
	const fetchedLogs = await New.guild.fetchAuditLogs({
		limit: 1,
		type: 'CHANNEL_UPDATE',
	});
	const fetchedLogs2 = await New.guild.fetchAuditLogs({
		limit: 1,
		type: 'CHANNEL_OVERWRITE_UPDATE	',
	});
  
  	const UpdateLog = fetchedLogs.entries.first();
	const { executor } = UpdateLog;
  	const UpdateLog2 = fetchedLogs2.entries.first();
  if(UpdateLog2.executor.bot) return;
  
if(Old.name != New.name){
  let embed = new Discord.MessageEmbed()
  .setTitle("Channel Updated ! ⚠")
  .setDescription(`**Old Name Channel : ${Old.name}\n\nNew Name Channel : ${New.name}\n\nChannel ID : ${New.id}\n\nUpdated By : ${executor}**`)
  .setThumbnail(`${executor.displayAvatarURL({dynamic: true})}`)
  channel1.send({embeds: [embed]})
}
})
client.on("roleCreate", async role => { ///// made by 𝐅𝐃 | 𝐁𝐥𝐮𝐞 𝐅𝐥𝐚𝐦𝐞 ✨#3089
if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).roles == '') return;
let channel1 = client.channels.cache.get(`${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).roles}`)
  if(!channel1) return;
if(!role.guild.id.includes(`${channel1.guild.id}`)) return;
	const fetchedLogs = await role.guild.fetchAuditLogs({
		limit: 1,
		type: 'ROLE_CREATE',
	});
    	const RoleLog = fetchedLogs.entries.first();
	const { executor } = RoleLog;
  let embed = new Discord.MessageEmbed()
  .setTitle("Role Created ! ✅")
  .setDescription(`**Role Name : ${role.name}\n\nRole ID : ${role.id}\n\nCreated By : ${executor}**`)
  .setThumbnail(`${executor.displayAvatarURL({dynamic: true})}`)
channel1.send({embeds: [embed]})
})

    client.on("roleDelete", async role => {
if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).roles == '') return;
let channel1 = client.channels.cache.get(`${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).roles}`)
  if(!channel1) return;
if(!role.guild.id.includes(`${channel1.guild.id}`)) return;
	const fetchedLogs = await role.guild.fetchAuditLogs({
		limit: 1,
		type: 'ROLE_DELETE',
	});
    	const RoleLog = fetchedLogs.entries.first();
	const { executor } = RoleLog;
  let embed = new Discord.MessageEmbed()
  .setTitle("Role Deleted ! ❌")
  .setDescription(`**Role Name : ${role.name}\n\nRole ID : ${role.id}\n\nDeleted By : ${executor}**`)
  .setThumbnail(`${executor.displayAvatarURL({dynamic: true})}`)
channel1.send({embeds: [embed]})
})

    client.on("roleUpdate", async (Old,New) => { ///// made by ZERO
if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).roles == '') return;
let channel1 = client.channels.cache.get(`${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).roles}`)
  if(!channel1) return;
if(!Old.guild.id.includes(`${channel1.guild.id}`)) return;
if(!New.guild.id.includes(`${channel1.guild.id}`)) return;
	const fetchedLogs = await New.guild.fetchAuditLogs({
		limit: 1,
		type: 'ROLE_UPDATE',
	});
    	const RoleLog = fetchedLogs.entries.first();
	const { executor } = RoleLog;
      if(Old.name != New.name){
  let embed = new Discord.MessageEmbed()
  .setTitle("Role Updated ! ⚠")
  .setDescription(`**Old Role Name : ${Old.name}\n\nNew Role Name : ${New.name}\n\nRole ID : ${New.id}\n\nUpdated By : ${executor}**`)
  .setThumbnail(`${executor.displayAvatarURL({dynamic: true})}`)
channel1.send({embeds: [embed]})
      }
})



client.on('voiceStateUpdate', async (oldState, newState) => { ///// made by ZERO
if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).voice == '') return;
let channel1 = client.channels.cache.get(`${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).voice}`)
  if(!channel1) return;
  if(oldState.member.bot) return;
  if(newState.member.bot) return;
if(!newState.guild.id.includes(`${channel1.guild.id}`)) return;
if(!oldState.guild.id.includes(`${channel1.guild.id}`)) return;

  
  if (!oldState.channelId && newState.channelId) {
    let embed = new Discord.MessageEmbed()
    .setTitle("Member Voice Connected ! ✅")
    .setDescription(`**${newState.member.user.tag} has joined voice channel " ${newState.channel.name} "**`)
  .setThumbnail(`${newState.member.displayAvatarURL({dynamic: true})}`)
   return channel1.send({embeds: [embed]})
  }



  
  if (oldState.channelId && !newState.channelId && oldState.member.user.bot === false) {
    let embed = new Discord.MessageEmbed()
    .setTitle("Member Voice Disconnected ! ❌")
    .setDescription(`**${oldState.member.user.tag} has disconnected from voice channel " ${oldState.channel.name} "**`)
  .setThumbnail(`${oldState.member.displayAvatarURL({dynamic: true})}`)

   return channel1.send({embeds: [embed]})
  } 
  
  if (oldState.channelId !== newState.channelId) {
    let embed = new Discord.MessageEmbed()
    .setTitle("Member Voice Moved ! 🔁")
    .setDescription(`**${newState.member.user.tag} has moved from  ${`"` + oldState.channel?.name + `"` ?? 'a voice channel'} to ${`"` + newState.channel?.name + `"` ?? 'a voice channel'}**`)
  .setThumbnail(`${oldState.member.displayAvatarURL({dynamic: true})}`)
   return channel1.send({embeds: [embed]})
  }



  
});


      
client.on("inviteCreate", async (invite) => { ///// made by 𝐅𝐃 | 𝐁𝐥𝐮𝐞 𝐅𝐥𝐚𝐦𝐞 ✨#3089
if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).invites == '') return;
  let channel1 = client.channels.cache.get(`${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).invites}`)
  if(!channel1) return;
if(!invite.guild.id.includes(`${channel1.guild.id}`)) return;
	const fetchedLogs = await invite.guild.fetchAuditLogs({
		limit: 1,
		type: 'INVITE_CREATE',
	});
    	const InviteLog = fetchedLogs.entries.first();
	const { executor } = InviteLog;
  
    let embed = new Discord.MessageEmbed()
    .setTitle("Invite Created ! ✅")
    .setDescription(`**Invite Url : ${invite.url}\n\nCreated By : ${executor.tag}**`)
    .setThumbnail(`${executor.displayAvatarURL({dynamic: true})}`)
channel1.send({embeds: [embed]})
})

client.on("inviteDelete", async (invite) => { ///// made by ZERO
if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).invites == '') return;
  let channel1 = client.channels.cache.get(`${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).invites}`)
  if(!channel1) return;
if(!invite.guild.id.includes(`${channel1.guild.id}`)) return;
	const fetchedLogs = await invite.guild.fetchAuditLogs({
		limit: 1,
		type: 'INVITE_DELETE',
	});
    	const InviteLog = fetchedLogs.entries.first();
	const { executor,target } = InviteLog;
  
    let embed = new Discord.MessageEmbed()
    .setTitle("Invite Deleted ! ❌")
    .setDescription(`**Invite Url : ${invite.url}\n\nCreated By : ${target.inviter.tag}\n\nDeleted By : ${executor.tag}**`)
    .setThumbnail(`${executor.displayAvatarURL({dynamic: true})}`)
channel1.send({embeds: [embed]})
})

client.on('guildMemberUpdate', async (oldMember, newMember) => { ///// made by ZERO
if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).members == '') return;
  let channel1 = client.channels.cache.get(`${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).members}`)
  if(!channel1) return;
if(!oldMember.guild.id.includes(`${channel1.guild.id}`)) return;
if(!newMember.guild.id.includes(`${channel1.guild.id}`)) return;
	const fetchedLogs = await oldMember.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_ROLE_UPDATE',
	});
    	const RoleLog = fetchedLogs.entries.first();
	const { executor } = RoleLog;
  
  const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
	if (removedRoles.size > 0) {
    let embed = new Discord.MessageEmbed()
    .setTitle("Member Role Removed ! ❌")
    .setDescription(`**Role : \`${removedRoles.map(r => r.name)}\`\n\nRemoved From : ${newMember.user.tag}\n\nRemoved By : ${executor}**`)
    .setThumbnail(`${newMember.user.displayAvatarURL({dynamic: true})}`)
channel1.send({embeds: [embed]})
    

	}


	const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
	if (addedRoles.size > 0) {
    let embed = new Discord.MessageEmbed()
    .setTitle("Member Role Added ! ✅")
    .setDescription(`**Role : \`${addedRoles.map(r => r.name)}\`\n\nAdded To : ${newMember.user.tag}\n\nAdded By : ${executor}**`)
    .setThumbnail(`${newMember.user.displayAvatarURL({dynamic: true})}`)
channel1.send({embeds: [embed]})
    
	}
});

//////// set ban room
client.on("messageCreate", message => { ///// made by ZERO
  if(message.content.startsWith(prefix + "set-ban-room")){ ///// made by ZERO
const args = message.content.split(" ").slice(1).join(" ");
    if(!args) return message.reply(`**Usage : ${prefix}set-ban-room <channel id>**`)
   const guild = message.guild.channels.cache.get(`${args}`)
if(!guild) return message.reply('> **تأكد من الروم لأنه لا يوجد**')
  let embed1 = new Discord.MessageEmbed()
   .setDescription("> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**")
    if(args == JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).ban) return message.reply("**بالفعل موجوده**")
if(guild.type != 'GUILD_TEXT') return message.reply("**يجب على اختيار روم تكون للكتابه ليست اي نوع اخر**")
       if(!config.owners.includes(message.author.id)) return message.reply({embeds: [embed1]})

packagejson.ban = args

 fs.writeFileSync("./rooms.json", JSON.stringify(packagejson), (err) => {
      if (err) console.error(err)
        .catch(err => {
          console.error(err);
        });
    })


 let embed = new Discord.MessageEmbed()
   .setTitle(`تم تغييرها الى`)
   .setDescription(`> <#${args}>`)
   
 message.reply({embeds: [embed]})
    
  }
})
    
//////// current ban room
client.on("messageCreate", (message) => { ///// made by ZERO
 if(message.content == prefix + "current-ban-room") {
  let embed1 = new Discord.MessageEmbed()
   .setDescription("> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**")
    
       if(!config.owners.includes(message.author.id)) return message.reply({embeds: [embed1]})

if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).ban == '') return message.reply("**لم يتم تحديد الروم الى الان**")
   
   let embed = new Discord.MessageEmbed()
   .setTitle(`الروم الحاليه هي`)
   .setDescription(`> <#${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).ban}>`)

  message.reply({embeds: [embed]})
 }
})



//////// set kick room
client.on("messageCreate", message => {
  if(message.content.startsWith(prefix + "set-kick-room")){ ///// made by ZERO
const args = message.content.split(" ").slice(1).join(" ");
    if(!args) return message.reply(`**Usage : ${prefix}set-kick-room <channel id>**`)
   const guild = message.guild.channels.cache.get(`${args}`)
if(!guild) return message.reply('> ** تأكد من الروم لأنه لايوجد**')
  let embed1 = new Discord.MessageEmbed()
   .setDescription("> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**")
        if(args == JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).kick) return message.reply("**بالفعل موجود**")
if(guild.type != 'GUILD_TEXT') return message.reply("**يجب على اختيار روم تكون للكتابه ليست اي نوع اخر**")
       if(!config.owners.includes(message.author.id)) return message.reply({embeds: [embed1]})

packagejson.kick = args

 fs.writeFileSync("./rooms.json", JSON.stringify(packagejson), (err) => {
      if (err) console.error(err)
        .catch(err => {
          console.error(err);
        });
    })


 let embed = new Discord.MessageEmbed()
   .setTitle(`تم تغييرها الى`)
   .setDescription(`> <#${args}>`)
   
 message.reply({embeds: [embed]})
    
  }
})

//////// current kick room
client.on("messageCreate", (message) => {
 if(message.content == prefix + "current-kick-room") { ///// made by ZERO
  let embed1 = new Discord.MessageEmbed()
   .setDescription("> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**")
    
       if(!config.owners.includes(message.author.id)) return message.reply({embeds: [embed1]})

if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).kick == '') return message.reply("**لم يتم تحديد الروم الى الان**")
   
   let embed = new Discord.MessageEmbed()
   .setTitle(`الروم الحاليه هي`)
   .setDescription(`> <#${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).kick}>`)

  message.reply({embeds: [embed]})
 }
})

//////// set messages room
client.on("messageCreate", message => {
  if(message.content.startsWith(prefix + "set-messages-room")){ ///// made by ZERO
const args = message.content.split(" ").slice(1).join(" ");
    if(!args) return message.reply(`**Usage : ${prefix}set-messages-room <channel id>**`)
   const guild = message.guild.channels.cache.get(`${args}`)
if(!guild) return message.reply('> ** تأكد من الروم مجدداً**')
  let embed1 = new Discord.MessageEmbed()
   .setDescription("> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**")
        if(args == JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).messages) return message.reply("**بالفعل موجوده**")
if(guild.type != 'GUILD_TEXT') return message.reply("**يجب على اختيار روم تكون للكتابه ليست اي نوع اخر**")
           if(!config.owners.includes(message.author.id)) return message.reply({embeds: [embed1]})

packagejson.messages = args

 fs.writeFileSync("./rooms.json", JSON.stringify(packagejson), (err) => {
      if (err) console.error(err)
        .catch(err => {
          console.error(err);
        });
    })


 let embed = new Discord.MessageEmbed()
   .setTitle(`تم تغييرها الى`)
   .setDescription(`> <#${args}>`)
   
 message.reply({embeds: [embed]})
    
  }
})

//////// current messages room
client.on("messageCreate", (message) => {
 if(message.content == prefix + "current-messages-room") { ///// made by ZERO
  let embed1 = new Discord.MessageEmbed()
   .setDescription("> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**")
    
       if(!config.owners.includes(message.author.id)) return message.reply({embeds: [embed1]})

if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).messages == '') return message.reply("**لم يتم تحديد الروم الى الان**")
   
   let embed = new Discord.MessageEmbed()
   .setTitle(`الروم الحاليه هي`)
   .setDescription(`> <#${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).messages}>`)

  message.reply({embeds: [embed]})
 }
})
  

//////// set roles room
client.on("messageCreate", message => {
  if(message.content.startsWith(prefix + "set-roles-room")){ ///// made by ZERO
    
const args = message.content.split(" ").slice(1).join(" ");
    if(!args) return message.reply(`**Usage : ${prefix}set-roles-room <channel id>**`)

   const guild = message.guild.channels.cache.get(`${args}`)
if(!guild) return message.reply('> ** تأكد من الروم مجدداً**')
  let embed1 = new Discord.MessageEmbed()
   .setDescription("> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**")
    if(args == JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).roles) return message.reply("**بالفعل موجوده**")
if(guild.type != 'GUILD_TEXT') return message.reply("**يجب على اختيار روم تكون للكتابه ليست اي نوع اخر**")
       if(!config.owners.includes(message.author.id)) return message.reply({embeds: [embed1]})

packagejson.roles = args

 fs.writeFileSync("./rooms.json", JSON.stringify(packagejson), (err) => {
      if (err) console.error(err)
        .catch(err => {
          console.error(err);
        });
    })


 let embed = new Discord.MessageEmbed()
   .setTitle(`تم تغييرها الى`)
   .setDescription(`> <#${args}>`)
   
 message.reply({embeds: [embed]})
    
  }
})

//////// current roles room
client.on("messageCreate", (message) => {
 if(message.content == prefix + "current-roles-room") { ///// made by ZERO
  let embed1 = new Discord.MessageEmbed()
   .setDescription("> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**")
    
       if(!config.owners.includes(message.author.id)) return message.reply({embeds: [embed1]})

if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).roles == '') return message.reply("**لم يتم تحديد الروم الى الان**")
   
   let embed = new Discord.MessageEmbed()
   .setTitle(`الروم الحاليه هي`)
   .setDescription(`> <#${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).kick}>`)

  message.reply({embeds: [embed]})
 }
})

//////// set channels room
client.on("messageCreate", message => {
  if(message.content.startsWith(prefix + "set-channels-room")){ ///// made by ZERO
    
const args = message.content.split(" ").slice(1).join(" ");
    if(!args) return message.reply(`**Usage : ${prefix}set-channels-room <channel id>**`)
  
   const guild = message.guild.channels.cache.get(`${args}`)
if(!guild) return message.reply('> **تأكد من الروم مجدداً**')
  let embed1 = new Discord.MessageEmbed()
   .setDescription("> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**")
    if(args == JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).channels) return message.reply("**بالفعل موجوده**")
if(guild.type != 'GUILD_TEXT') return message.reply("**يجب على اختيار روم تكون للكتابه ليست اي نوع اخر**")
       if(!config.owners.includes(message.author.id)) return message.reply({embeds: [embed1]})

packagejson.channels = args

 fs.writeFileSync("./rooms.json", JSON.stringify(packagejson), (err) => {
      if (err) console.error(err)
        .catch(err => {
          console.error(err);
        });
    })


 let embed = new Discord.MessageEmbed()
   .setTitle(`تم تغييرها الى`)
   .setDescription(`> <#${args}>`)
   
 message.reply({embeds: [embed]})
    
  }
})

//////// current channels room
client.on("messageCreate", (message) => {
 if(message.content == prefix + "current-channels-room") { ///// made by ZERO
  let embed1 = new Discord.MessageEmbed()
   .setDescription("> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**")
    
       if(!config.owners.includes(message.author.id)) return message.reply({embeds: [embed1]})

if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).channels == '') return message.reply("**لم يتم تحديد الروم الى الان**")
   
   let embed = new Discord.MessageEmbed()
   .setTitle(`الروم الحاليه هي`)
   .setDescription(`> <#${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).channels}>`)

  message.reply({embeds: [embed]})
 }
})

//////// set bots room
client.on("messageCreate", message => {
  if(message.content.startsWith(prefix + "set-bots-room")){ ///// made by ZERO
    
const args = message.content.split(" ").slice(1).join(" ");
    if(!args) return message.reply(`**Usage : ${prefix}set-bots-room <channel id>**`)
   const guild = message.guild.channels.cache.get(`${args}`)
if(!guild) return message.reply('> **تأكد من الروم مجدداً**')
  let embed1 = new Discord.MessageEmbed()
   .setDescription("> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**")
    if(args == JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).bots) return message.reply("**بالفعل موجوده**")
if(guild.type != 'GUILD_TEXT') return message.reply("**يجب على اختيار روم تكون للكتابه ليست اي نوع اخر**")
       if(!config.owners.includes(message.author.id)) return message.reply({embeds: [embed1]})

packagejson.bots = args

 fs.writeFileSync("./rooms.json", JSON.stringify(packagejson), (err) => {
      if (err) console.error(err)
        .catch(err => {
          console.error(err);
        });
    })


 let embed = new Discord.MessageEmbed()
   .setTitle(`تم تغييرها الى`)
   .setDescription(`> <#${args}>`)
   
 message.reply({embeds: [embed]})
    
  }
})

//////// current bots room
client.on("messageCreate", (message) => {
 if(message.content == prefix + "current-bots-room") { ///// made by ZERO
  let embed1 = new Discord.MessageEmbed()
   .setDescription("> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**")
    
       if(!config.owners.includes(message.author.id)) return message.reply({embeds: [embed1]})

if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).bots == '') return message.reply("**لم يتم تحديد الروم الى الان**")
   
   let embed = new Discord.MessageEmbed()
   .setTitle(`الروم الحاليه هي`)
   .setDescription(`> <#${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).bots}>`)

  message.reply({embeds: [embed]})
 }
})

//////// set voice room
client.on("messageCreate", message => {
  if(message.content.startsWith(prefix + "set-voice-room")){ ///// made by ZERO
    
const args = message.content.split(" ").slice(1).join(" ");
    if(!args) return message.reply(`**Usage : ${prefix}set-voice-room <channel id>**`)
   const guild = message.guild.channels.cache.get(`${args}`)
if(!guild) return message.reply('> ** تأكد من الروم مجدداً**')
  let embed1 = new Discord.MessageEmbed()
   .setDescription("> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**")
    if(args == JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).voice) return message.reply("**بالفعل موجوده**")
if(guild.type != 'GUILD_TEXT') return message.reply("**يجب على اختيار روم تكون للكتابه ليست اي نوع اخر**")
       if(!config.owners.includes(message.author.id)) return message.reply({embeds: [embed1]})

packagejson.voice = args

 fs.writeFileSync("./rooms.json", JSON.stringify(packagejson), (err) => {
      if (err) console.error(err)
        .catch(err => {
          console.error(err);
        });
    })


 let embed = new Discord.MessageEmbed()
   .setTitle(`تم تغييرها الى`)
   .setDescription(`> <#${args}>`)
   
 message.reply({embeds: [embed]})
    
  }
})

//////// current voice room
client.on("messageCreate", (message) => {
 if(message.content == prefix + "current-voice-room") { ///// made by ZERO
  let embed1 = new Discord.MessageEmbed()
   .setDescription("> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**")
    
       if(!config.owners.includes(message.author.id)) return message.reply({embeds: [embed1]})

if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).voice == '') return message.reply("**لم يتم تحديد الروم الى الان**")
   
   let embed = new Discord.MessageEmbed()
   .setTitle(`الروم الحاليه هي`)
   .setDescription(`> <#${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).voice}>`)

  message.reply({embeds: [embed]})
 }
})

//////// set members room
client.on("messageCreate", message => {
  if(message.content.startsWith(prefix + "set-members-room")){ ///// made by ZERO
    
const args = message.content.split(" ").slice(1).join(" ");
      if(!args) return message.reply(`**Usage : ${prefix}set-members-room <channel id>**`)

   const guild = message.guild.channels.cache.get(`${args}`)
if(!guild) return message.reply('> ** تأكد من الروم مجدداً**')
  let embed1 = new Discord.MessageEmbed()
   .setDescription("> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**")
    if(args == JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).members) return message.reply("**بالفعل موجوده**")
if(guild.type != 'GUILD_TEXT') return message.reply("**يجب على اختيار روم تكون للكتابه ليست اي نوع اخر**")
       if(!config.owners.includes(message.author.id)) return message.reply({embeds: [embed1]})

packagejson.members = args

 fs.writeFileSync("./rooms.json", JSON.stringify(packagejson), (err) => {
      if (err) console.error(err)
        .catch(err => {
          console.error(err);
        });
    })

  
 let embed = new Discord.MessageEmbed()
   .setTitle(`تم تغييرها الى`)
   .setDescription(`> <#${args}>`)
   
 message.reply({embeds: [embed]})
    
  }
})

//////// current members room
client.on("messageCreate", (message) => {
 if(message.content == prefix + "current-members-room") { ///// made by ZERO
  let embed1 = new Discord.MessageEmbed()
   .setDescription("> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**")
    
       if(!config.owners.includes(message.author.id)) return message.reply({embeds: [embed1]})

if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).members == '') return message.reply("**لم يتم تحديد الروم الى الان**")
   
   let embed = new Discord.MessageEmbed()
   .setTitle(`الروم الحاليه هي`)
   .setDescription(`> <#${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).members}>`)

  message.reply({embeds: [embed]})
 }
})

//////// set invites room
client.on("messageCreate", message => {
  if(message.content.startsWith(prefix + "set-invites-room")){ ///// made by ZERO
    
const args = message.content.split(" ").slice(1).join(" ");
    if(!args) return message.reply(`**Usage : ${prefix}set-invites-room <channel id>**`)
   const guild = message.guild.channels.cache.get(`${args}`)
if(!guild) return message.reply('> ** تأكد من الروم مجدداً**')
  let embed1 = new Discord.MessageEmbed()
   .setDescription("> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**")
    if(args == JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).invites) return message.reply("**بالفعل موجوده**")
if(guild.type != 'GUILD_TEXT') return message.reply("**يجب على اختيار روم تكون للكتابه ليست اي نوع اخر**")
       if(!config.owners.includes(message.author.id)) return message.reply({embeds: [embed1]})

packagejson.invites = args

 fs.writeFileSync("./rooms.json", JSON.stringify(packagejson), (err) => {
      if (err) console.error(err)
        .catch(err => {
          console.error(err);
        });
    })


 let embed = new Discord.MessageEmbed()
   .setTitle(`تم تغييرها الى`)
   .setDescription(`> <#${args}>`)
   
 message.reply({embeds: [embed]})
    
  }
})

//////// current invites room
client.on("messageCreate", (message) => {
 if(message.content == prefix + "current-invites-room") { ///// made by ZERO
  let embed1 = new Discord.MessageEmbed()
   .setDescription("> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**")
    
       if(!config.owners.includes(message.author.id)) return message.reply({embeds: [embed1]})

if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).invites == '') return message.reply("**لم يتم تحديد الروم الى الان**")
   
   let embed = new Discord.MessageEmbed()
   .setTitle(`الروم الحاليه هي`)
   .setDescription(`> <#${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).invites}>`)

  message.reply({embeds: [embed]})
 }
})

               
client.on("messageCreate", message => {
  if(message.content.startsWith(prefix + "list")){ ///// made by ZERO
  let embed1 = new Discord.MessageEmbed()
   .setDescription("> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**")
    
       if(!config.owners.includes(message.author.id)) return message.reply({embeds: [embed1]})
    
    let ban = `${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).ban}`;
    let kick = `${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).kick}`;
    let messages = `${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).messages}`;
    let channels = `${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).channels}`;
    let roles = `${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).roles}`;
    let members = `${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).members}`;
    let bots = `${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).bots}`;
    let voice = `${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).voice}`;
    let invites = `${JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).invites}`;

    
    if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).ban == ''){
      ban = ban.replace(/^$/, '**Not Exist**')
    }
    if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).ban != ''){
      ban = "<#" + ban + ">"
    }
    if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).kick == ''){
      kick = kick.replace(/^$/, '**Not Exist**')
    }
    if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).kick != ''){
      kick = "<#" + kick + ">"
    }
    if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).messages == ''){
      messages = messages.replace(/^$/, '**Not Exist**')
    }
    if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).messages != ''){
      messages = "<#" + messages + ">"
    }
    if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).channels == ''){
      channels = channels.replace(/^$/, '**Not Exist**')
    }
    if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).channels != ''){
      channels = "<#" + channels + ">"
    }
        if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).roles == ''){
      roles = roles.replace(/^$/, '**Not Exist**')
    }
    if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).roles != ''){
      roles = "<#" + roles + ">"
    }
    if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).members == ''){
      members = members.replace(/^$/, '**Not Exist**')
    }
    if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).members != ''){
      members = "<#" + members + ">"
    }
    if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).bots == ''){
      bots = bots.replace(/^$/, '**Not Exist**')
    }
    if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).bots != ''){
      bots = "<#" + bots + ">"
    }
    if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).voice == ''){
      voice = voice.replace(/^$/, '**Not Exist**')
    }
    if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).voice != ''){
      voice = "<#" + voice + ">"
    }
       if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).invites == ''){
      invites = invites.replace(/^$/, '**Not Exist**')
    }
    if(JSON.parse(fs.readFileSync('./rooms.json' , 'utf8')).invites != ''){
      invites = "<#" + invites + ">"
    }

                                              
let embed = new Discord.MessageEmbed()
    .setTitle("Log Channels List")
    .setDescription(`**Ban Log Channel :**\n> ${ban}\n\n**Kick Log Channel :**\n> ${kick}\n\n**Messages Log Channel : **\n> ${messages}\n\n**Channels Log Channel : **\n> ${channels}\n\n**Roles Log Channel : **\n> ${roles}\n\n**Members Log Channel :**\n> ${members}\n\n**Bots Log Channel :**\n> ${bots}\n\n**Voice Log Channel**\n> ${voice}\n\n**Invites Log Channel**\n> ${invites}`)
    .setThumbnail(`${client.user.displayAvatarURL({dynamic: true})}`)
    message.reply({embeds: [embed] })
  }})

client.on("messageCreate", (message) => {
 if(message.content == prefix + "credits") { ///// made by ZERO
    let embed = new Discord.MessageEmbed()
    .setTitle("الحقوق الى")
    .setDescription("**ZERO | ARM**")
    .setThumbnail(`${client.user.avatarURL({format: "png",size: 1024,dynamic: true})}`)
    .setFooter("All Rights Reserved © 2023")
    .setTimestamp()
    message.reply({embeds: [embed]})
  }
})
        
client.login(process.env.token).catch(() => console.log("Invalid Token Was Provided.\nPlease put the TOKEN in secret"));
const { AutoKill } = require('autokill')
AutoKill({ Client: client, Time: 5000 })

process.on("unhandledRejection", error => {
  console.log(error);
});