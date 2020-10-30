// discordのライブラリを使う
const Discord = require("discord.js");
// youtubeの音声を取ってくるライブラリを使う
const ytdl = require("ytdl-core");
// const ytdl = require('ytdl-core-discord');

const {token} = require("./config.json")

// discordに接続するための、初期設定
const client = new Discord.Client();

// 再生されているか？再生されていたら、true。再生されていなかったら、false
let isplaying = false;
// グローバルに変数を定義。
// stream: youtubeの音声を入れる変数
// dispatcher: 音楽の再生状況を入れる変数（音楽が開始された、終わった、エラーでた）
let stream, dispatcher;

const playlist = [];

// discordからメッセージが届いたら実行する
client.on("message", (message) => {
    // 送られてきたメッセージを分離する
    // !play youtube.com/pokwrpg -> ["!play", "youtube.com/pokwrpg"]
    // !pause -> ["!pause"]
    const messagetolist = message.content.split(" ");
    // console.log(messagetolist)
    if (messagetolist[0] === "!playlistadd") {
        hello(playlist, messagetolist[1], messagetolist[2]);
        return;
    }

    if (messagetolist[0] === "!playlist") {
        getNotPlayedList(playlist);
        return;
    }

    // !play, !pause, !resumeが送られてきたら、下記を実行
    if (
        messagetolist[0] === "!play" ||
        messagetolist[0] === "!pause" ||
        messagetolist[0] === "!resume"
    ) {
        // エラー回避
        if (message.channel.type !== "text") return;
        let i = 0;
        // voicechannelを取得
        const voiceChannel = message.member.voice.channel;

        // var song = {
        //     name: "aiueo",
        // 	url: "https://youtu.be/bt8wNQJaKAk",
        // };
        // playlist.push(song);

        // song = {
        //     name: "hello",
        //     url: "https://youtu.be/TQ8WlA2GXbk",
        // };
        // playlist.push(song);

        // voicechannelがなかったらエラー
        if (!voiceChannel) {
            return message.reply("please join a voice channel first!");
        }

        // let connection = voiceChannel.join();

        voiceChannel.join().then((connection) => {
            try{
                play(connection, playlist[0], voiceChannel); 
            }
            catch(err){
                console.error(err)
                return
            }
        });

        //     // voicechannelに取得できたら、下記を実行
        //     voiceChannel.join().then((connection) => {
        //         //for (var i = 0; i < playlist.length; i++) {
        //         // 音楽が再生されていなかったら下記を実行
        //         if (!isplaying) {
        //             // youtubeから音声を取得
        //             stream = ytdl(playlist[i].url, { filter: "audioonly" });
        //             // 音楽を再生
        //             dispatcher = connection.play(stream);
        //             // 音楽が再生されているというフラグを立てる
        //             isplaying = true;
        //             dispatcher.setVolume(0.8);
        //         }

        //         // !pauseが送られてきたら、一時停止する
        //         if (messagetolist[0] === "!pause") {
        //             dispatcher.pause();
        //         }
        //         // !resumeが送られてきたら、再再生する
        //         if (messagetolist[0] === "!resume") {
        //             dispatcher.resume();
        //         }

        //         // 音楽の再生が終わったら、再生フラグを下ろし、voicechannelを離れる。
        //         dispatcher.on("finish", () => {
        //             isplaying = false;
        //             // i++;
        //             voiceChannel.leave();
        //         });
        //         // }
        //     });
    }
});

// discordにログインする
client.login(token);

("use strict");
// key: タスクの文字例 value; 完了しているかどうかの真偽値
const tasks = new Map();

/**
 * TODOを追加する
 * @param {string} task
 */
function todo(task) {
    tasks.set(task, false);
}

/**
 * TODOの一覧の配列を取得する
 * @return {array}
 */
function list() {
    var notDoneTasks = Array.from(tasks);
    notDoneTasks = notDoneTasks.filter((t) => t[1] == false);
    notDoneTasks = notDoneTasks.map((t) => t[0]);
    return notDoneTasks;
}

module.exports = { todo, list };

function hello(playlist, title, url) {
    // playlistaddが送られたら下記を実行
    //  console.log(title);
    // messagetolistの1番目をコンソールに表示する
    //  console.log(url);
    // messagetolistの２番目をコンソールに表示する
    var song = {
        name: title,
        url: url,
        isplaying: false,
    };
    //  console.log(song);
    playlist.push(song);
    // playlistにsongを追加
    //  console.log(playlist[0].url);
}

function getNotPlayedList(playlist) {
    var notPlayedList = [];
    playlist = [
        { name: "title", url: "url", isplaying: false },
        { name: "title", url: "url", isplaying: false },
        { name: "title", url: "url", isplaying: false },
        { name: "title", url: "url", isplaying: true },
        { name: "title", url: "url", isplaying: false },
    ];
    for (var i = 0; i < playlist.length; i++) {
        if (playlist[i].isplaying === false) {
            notPlayedList.push(playlist[i]);
        }
    }
    console.log(notPlayedList);
    //         // tasksを配列に直し、DoneTasksに代入
    //         var DoneTasks = Array.from(tasks);
    //         // DoneTasksを表示
    //         // console.log(DoneTasks);
    //         // DoneTasksの各要素がfalseとセットになっていたら、lstに追加
    //         // [ [ 'gegiugeivg', false ], [ 'world', true ], [ 'earth', false ] ]
    //         // -> lst = [[ 'gegiugeivg', false ], [ 'earth', false ]]
    //         lst = DoneTasks.filter((t) => t[1] == false);
    //         // lstを表示
    //         // console.log(lst);

    //         doneTasks = DoneTasks.filter((t) => t[1] == true);
    //         // console.log(doneTasks);
    //         // [ [ 'gegiugeivg', false ], [ 'world', true ], [ 'earth', true ] ]
    //         // [[ 'world', true ]]
    //         doneTasks = doneTasks.map((t) => t[0]);
    //         // console.log(doneTasks);
    //         // doneTasks = ["word"]

    //         tasks.delete("gegiugeivg");
    //         // console.log(tasks);
}
function play(connection, song, voiceChannel) {
    if (!song) {
        voiceChannel.leave();
        return;
    }
    console.log(song)
    const dispatcher = connection.play(ytdl(song.url), { range: { start: '0' }});
    dispatcher.on("finish", () => {
        playlist.shift();
        play(connection, playlist[0], voiceChannel);
    });
    dispatcher.on("error", (error) => console.error(error));
}
