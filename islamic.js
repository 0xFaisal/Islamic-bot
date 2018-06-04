"use strict";
const Discord = require( 'discord.js' );
const ytdl = require('ytdl-core');
const client = new Discord.Client( );
const settings = require("./settings.json");
client.login(settings.token);

var connections = { }
var _she5 = {
"ماهر المعيقلي": "https://www.youtube.com/watch?v=Ktync4j_nmA",
"مشاري العفاسي": "https://www.youtube.com/watch?v=2etOS_nwTr0",
"عبد الباسط عبد الصمد": "https://www.youtube.com/watch?v=vqXLGtZcUm8",
"ياسر الدوسري": "https://www.youtube.com/watch?v=WYT0pQne-7w"
}

var _sheo5 = [
"ماهر المعيقلي",
"مشاري العفاسي",
"عبد الباسط عبد الصمد",
"ياسر الدوسري"
]


var voice = "quran"


function repeatQuran(quranLink,connection){
    const dispatcher = connection.playStream(ytdl(quranLink, {filter: 'audioonly'}), {volume:1,seek:0, passes : 1});
    dispatcher.on('end', ( ) => {
		if( connection == undefined ) return;
		repeatQuran(quranLink,connection)
    })
}

client.on('message', ( message ) => {
	let command = message.content.split(' ')[0];
	let args = message.content.split(' ').slice(1);
	if( command == "قران" || command == "قرآن" ){
		var sheo5 = "";
		for( var i = 0; i < _sheo5.length; i++ ){
			sheo5 += "\n**" + (i+1) + "- " + _sheo5[i] + " **";
		}
		message.reply( '**يرجى كتابة اسم الشيخ المراد سماع تلاوته**\n **:الشيوخ المتوفرون هم**'+sheo5)
		message.channel.awaitMessages(msg => msg.author == message.author,{ max: 1 })
		.then( messages => {
			var message = messages.first();
			if( _she5[message.content] ){
				if( connections[ message.guild ] ){
					message.reply("**:white_check_mark: تم بدء التلاوة مع الشيخ "+ message.content +" **");
					repeatQuran(_she5[message.content],connections[ message.guild ]);
				} else{ 
				
					message.reply("**:timer: جاري دخول القناة ...**").then( m => {
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => { 
							m.edit("**:white_check_mark: تم بدء التلاوة مع الشيخ "+ message.content +" **");
							connections[ message.guild ] = connection;
							repeatQuran(_she5[message.content],connections[ message.guild ]);
		})
						};
					});
				}
			} else {
				message.reply("**:x: لم يتم ايجاد الشيخ**")
			}
			
		})
		.catch( err => { err; } );
	
	}
});

