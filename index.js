const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const fs = require('fs');
const db = require('quick.db');

client.on('ready', () => {
console.log(`Logged in as ${client.user.tag}!`);  
client.user.setActivity("k!help", {
  

type: "STREAMING", 
url: "https://www.twitch.tv/olandezutw"
});
});
client.on('message', async message => {
  if (!message.content.startsWith(config.prefix))
    return;

  let args = message.content.slice(config.prefix.length).split(" ");
  let cmd = args.shift().toLowerCase();

  try {
    let command = require(`./commands/${cmd}`)
    command.run(client, message, args)
  } catch (e) {
    console.log(e.message)
  };
});

client.on('guildMemberAdd', (member) => {

  let ch1 = db.get(`channel-${member.guild.id}`);
  let ch = client.channels.cache.get(ch1);

  let embed = new Discord.MessageEmbed()
    .setAuthor(`Welcome to ${member.guild.name}`, member.guild.iconURL({ dynamic: true }))
    .setDescription(`**Salut** ${member.user} **si bine ai venit pe server-ul Nostru Te invitam sa-ti pui tag-ul nostru la nume ﾉɠʑ sau gz.Pentru a iti alege culori ori diferite grade generale <#814090190091059233> ** **Citeste** <#814229988248387585> **pentru a evita orice problema o sedere cat mai placuta va dorim** `)
    .setColor('#ba47fc')
    .setImage('https://media.giphy.com/media/LUTo5zTxJ5wSMSk5l7/giphy.gif');
  ch.send(embed)

});


client.login(config.token)