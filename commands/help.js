exports.run = async (client, message, args) => { 
    var groups = { 
        '1': 'الاوامر العامة.',
        '2': 'اوامر ادارة السيرفرات',
        '3': 'اوامر خاصة'
    }
var msg = "";
var i = 1;
var g = 0;
Object.keys(help).forEach( function(key) {
    if(g == 0 ) {
        g++;
        msg += ` **${groups[g]}\n`
    }
    if(g == help[key].group) {
        msg += `${i} - ${config.prefix}${key} | ${help[key].description} \n`
    } else {
        g++;
        msg += ` ${groups[g]}\n`

        msg += `${i} - ${config.prefix}${key} | ${help[key].description} \n`

    }
    i++;
})
msg += "**"
message.channel.send(msg)
}

exports.settings = {
    "name": "help",
    "Subcmds": [],
    "server": true,
    "owneronly": false,
    "description": "لعرض اوامر المساعدة.",
    "group": 1
}  