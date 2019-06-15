exports.run = (client, message, dir) => {
    if(message.author.bot) return;
    var prefix = config.prefix;
    let mm = message.mentions.users.first();
   if(mm) {
       if(mm.id == client.user.id) {
           if(config.prefixmention) {
        const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
        prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : config.prefix;
           }
       }
   }
    if(message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(commands[command]) { 
        var cmd = require(`${dir}/commands/${commands[command]}`)
        if(cmd.settings.owneronly && config.owners.includes(message.author.id)) return cmd.run(client, message, args, command);         
        if(message.guild) return cmd.run(client, message, args, command);
        if(cmd.settings.server) return;
        cmd.run(client, message, args, command);

    }

}