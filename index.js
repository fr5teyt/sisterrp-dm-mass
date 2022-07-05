const fs = require('fs')
const colors = require('colors');
var tokens = fs.readFileSync("./login/token.js", "utf-8").replace(/\r/gi, "").split("\n");
const msg = fs.readFileSync('./login/message.env').toString();

tokens.forEach(token => {

    const Discord = require('discord-selfbot-v11');
    let client = new Discord.Client();

    client.on('ready', () => {
        process.title = `HIGH DIV [THE BEST SELFBOT DIV] BY: Vilão | Connected: ${client.user.tag}`;    
        console.log(`
        

                                               youtube.com/c/vilão7`.green + `

                        █████   █████  ███           █████      ██████████   █████ █████   █████
                        ░░███   ░░███  ░░░           ░░███      ░░███░░░░███ ░░███ ░░███   ░░███ 
                         ░███    ░███  ████   ███████ ░███████   ░███   ░░███ ░███  ░███    ░███ 
                         ░███████████ ░░███  ███░░███ ░███░░███  ░███    ░███ ░███  ░███    ░███ 
                         ░███░░░░░███  ░███ ░███ ░███ ░███ ░███  ░███    ░███ ░███  ░░███   ███  
                         ░███    ░███  ░███ ░███ ░███ ░███ ░███  ░███    ███  ░███   ░░░█████░   
                         █████   █████ █████░░███████ ████ █████ ██████████   █████    ░░███     
                        ░░░░░   ░░░░░ ░░░░░  ░░░░░███░░░░ ░░░░░ ░░░░░░░░░░   ░░░░░      ░░░      
                                             ███ ░███                                            
                                            ░░██████    Connected: ${client.user.tag} 
                                             ░░░░░░                                                  



        `.magenta);
        client.user.setStatus('dnd')
    });

    client.on("message", message => {
        if (message.guild) return;
        if (message.author.bot) return message.author.deleteDM().then(console.log(`[+]`.red + ` Private with bot: `.white + ` ${message.author.tag}`.red + ` closed.`.white));
    })

    let i = 500
    let cooldown = 600
    const enviados = [];

    client.on("message", async message => {
		if (message.channel.type === "dm") return;
		if (message.author.id === client.user.id) return;
        if (message.author.bot) return;
		if (enviados.some(id => id === message.author.id)) return;
        if (i > 600 && (!cooldown || cooldown._destroyed)) {
            cooldown = setTimeout(() => i = 0, 2 * 75 * 1000)
        } else if (i > 600) return true

        i++
        let membro = await message.author.createDM()  
		enviados.push(message.author.id);
        membro.send(msg).then(console.log(`[!]`.magenta + ` Message`.white + ` sent`.magenta + ` to`.white + ` ${message.author.tag}`.magenta + ` in channel`.white + ` ${message.channel.name}`.magenta + ` from`.white + ` ${message.guild.name}`.magenta)).then(() => {
                enviados.push(message.author.id);
            }).catch((error) => {
                membro.delete()
                if (error.message == "Cannot send messages to this user") return
                console.error(`[+]`.magenta + ` Message`.white + ` unsent`.red + ` to`.white + ` ${message.author.tag}`.red + ` [`.white + `PV CLOSED`.red + `]`.white)
            })
    })

    client.login(token).catch(error => {
        if (error.message == "Incorrect login details were provided." || error.message == "An invalid token was provided.") {
            console.log(`
            
                              ██████████ ███████████   ███████████      ███████    ███████████  
                              ░░███░░░░░█░░███░░░░░███ ░░███░░░░░███   ███░░░░░███ ░░███░░░░░███ 
                               ░███  █ ░  ░███    ░███  ░███    ░███  ███     ░░███ ░███    ░███ 
                               ░██████    ░██████████   ░██████████  ░███      ░███ ░██████████  
                               ░███░░█    ░███░░░░░███  ░███░░░░░███ ░███      ░███ ░███░░░░░███ 
                               ░███ ░   █ ░███    ░███  ░███    ░███ ░░███     ███  ░███    ░███ 
                               ██████████ █████   █████ █████   █████ ░░░███████░   █████   █████
                              ░░░░░░░░░░ ░░░░░   ░░░░░ ░░░░░   ░░░░░    ░░░░░░░    ░░░░░   ░░░░░ 
                                                                               
            
                                        [HIGH]`.magenta + ` Invalid token,`.white + ` fix in login/token.js!`.magenta)

            console.log(` 
            
            
            
            
            
            
            
            
            
            


            
            
            `.white)
        } else {
            console.log(` [+]`.red + ` ${error}`.red)
        }
        return;
    });
});

