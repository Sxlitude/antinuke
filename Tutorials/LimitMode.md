![Discord Antinuke With Limits](https://cdn.discordapp.com/attachments/935796428775755776/937006674345078875/unknown.png)
### Antinuke: Limit Mode
Set strict action limits in your server to prevent mass actions like channel creation, channel deletion, role creation & bla bla bla

### Commands:
- `set` sets a limit for an action. (Run this command for full guide with examples)
- `reset` resets a limit for an action to its default. (Run this cmd for full guide)
- `enable` enables the antinuke mode in your server.
- `disable` disables the antinuke mode in your server.
- `check` check what mentioned user did in the last hour.
- `forgive` remove every limit count of mentioned user instantly.

### Setup
- go to [replit's](https://replit.com/repls) website
- click the *import from github* button while creating a new repl 
- paste this URL and click create : `https://github.com/Sxlitude/antinuke`
- go to secrets & name key as **token** and in value put your bot's token
- for prefix, check 43rd line of index.js in Limit_Mode folder
- make sure to setup .replit file like this: `run = "cd Limit_Mode && node index.js"`

### Things to note
- this can only be used on replit
- make sure to enable all the intents except presence intent

### That's it!
you're ready to go! but if you wanna report errors or suggest features, feel free to open an issue!