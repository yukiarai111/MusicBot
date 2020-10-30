const Discord = require('discord.js');
const ytdl = require('ytdl-core');

const client = new Discord.Client();

client.on('message', message => {
	const messagetolist = message.content.split(" ")
	if (messagetolist[0] === '!play' || messagetolist[0] === '!pause' || messagetolist[0] === "!resume"){
		if (message.channel.type !== 'text') return;
		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
		}
		// if (messagetolist[0] === "!play"){

		// }


		

		voiceChannel.join().then(connection => {
			let stream;
			if(messagetolist.length===2){
				stream = ytdl(messagetolist[1], { filter: 'audioonly' });	
			}
			const dispatcher = connection.play(stream);
			console.log(messagetolist)

			if(messagetolist[0]==="!pause"){
				dispatcher.pause()
			}
			if(messagetolist[0]==="!resume"){
				dispatcher.resume()
			}

			dispatcher.on('finish', () => voiceChannel.leave());
		});
	}
});

client.login('NzI2MjQ0NTY0OTc2Nzk1NzQ5.XwkW0Q.b_5_BdfS62yrxzC5oCBVd5-dPWs');