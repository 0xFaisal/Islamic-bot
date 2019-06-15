module.exports = (client, dir) => {
login = async ( token ) => {
    if(!token) return console.log(chalk.red('Error login : token not founded.'));
    client.login(token).then(r => console.log(chalk.green('Status : Login Successful ' + client.user.username))).catch(err => console.log(chalk.red('Error login : token not correct!.')));
    await loadCommands();
    await loadEvents();
        
        
}

loadCommands = async ( ) => {
    fs.readdir(dir + '/commands', (err, files) => {
        if (err) throw err;
files.forEach(f => {
  var cmd=  require(dir + '/commands/' + f);
    commands[cmd.settings.name] = f;
    cmd.settings["Subcmds"].forEach(subcmd => {
        commands[subcmd] = f;
    })
})
    })
    refreshHelp();
}
 
refreshHelp = async ( ) => {
    fs.readdir(dir + '/commands', (err, files) => {
        if (err) throw err;
files.forEach(f => {
  var cmd=  require(dir + '/commands/' + f);
    help[cmd.settings.name] = {
        'group': cmd.settings.group,
        'description': cmd.settings.description
    };
})
    })
}
loadEvents = async () => {
    fs.readdir(dir + "/events/", (err, files) => {
        files.forEach(file => {
          let eventFunction = require(`${dir}/events/${file}`);
          let eventName = file.split(".")[0];
          client.on(eventName, (...args) => eventFunction.run(client, ...args, dir), );
        })
})
}
}