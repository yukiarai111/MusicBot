// discordのライブラリを使う
const Discord = require('discord.js');
// youtubeの音声を取ってくるライブラリを使う
const ytdl = require('ytdl-core');

// discordに接続するための、初期設定
const client = new Discord.Client();

// 再生されているか？再生されていたら、true。再生されていなかったら、false
let isplaying = false
// グローバルに変数を定義。
// stream: youtubeの音声を入れる変数
// dispatcher: 音楽の再生状況を入れる変数（音楽が開始された、終わった、エラーでた）
let stream,dispatcher

// discordからメッセージが届いたら実行する
client.on('message', message => {
	// 送られてきたメッセージを分離する
	// !play youtube.com/pokwrpg -> ["!play", "youtube.com/pokwrpg"]
	// !pause -> ["!pause"]
	const messagetolist = message.content.split(" ")

	// !play, !pause, !resumeが送られてきたら、下記を実行
	if (messagetolist[0] === '!play' || messagetolist[0] === '!pause' || messagetolist[0] === "!resume"){
		// エラー回避
		if (message.channel.type !== 'text') return;
		// voicechannelを取得
		const voiceChannel = message.member.voice.channel;

		// voicechannelがなかったらエラー
		if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
		}

		// voicechannelに取得できたら、下記を実行
		voiceChannel.join().then(connection => {
			// 音楽が再生されていなかったら下記を実行
			if(!isplaying){
				// youtubeから音声を取得
				stream = ytdl(messagetolist[1], { filter: 'audioonly' });
				// 音楽を再生
				dispatcher = connection.play(stream);
				// 音楽が再生されているというフラグを立てる
				isplaying = true
			}
			// !pauseが送られてきたら、一時停止する
			if(messagetolist[0]==="!pause"){
				dispatcher.pause()
			}
			// !resumeが送られてきたら、再再生する
			if(messagetolist[0]==="!resume"){
				dispatcher.resume()
			}

			// 音楽の再生が終わったら、再生フラグを下ろし、voicechannelを離れる。
			dispatcher.on('finish', () => {
				isplaying=false
				voiceChannel.leave()
			})
		});
	}
});

// discordにログインする
client.login('NzI2MjQ0NTY0OTc2Nzk1NzQ5.XwkW0Q.b_5_BdfS62yrxzC5oCBVd5-dPWs');