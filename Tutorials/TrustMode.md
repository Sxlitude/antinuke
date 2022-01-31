![Discord Antinuke Bot](https://cdn.discordapp.com/attachments/936865318696017962/937368885601128528/unknown.png)
### Antinuke: Trust Mode
The super strict mode of antinuke which only allows trusted users to make actions in your discord servers. it can be run locally & on replit.

### Commands:
- `trust` trust a user so that he/she can do actions on your server without getting banned
- `untrust` untrust a user so that he/she can't do any action to your server.
- `enable` enables the antinuke mode in your server.
- `disable` disables the antinuke mode in your server.
- `trusted` view every person you trusted in a server.

### Setup
- go to [replit's](https://replit.com/repls) website
- click the *import from github* button while creating a new repl 
- paste this URL and click create : `https://github.com/Sxlitude/antinuke`
- go to secrets & name key as **token** and in value put your bot's token
- for prefix, check 43rd line of index.js in Trust_Mode folder
- make sure to setup .replit file like this: `run = "cd Trust_Mode && node index.js"`

### Things to note
- this can be used locally & on replit 
- make sure to enable all the intents except presence intent

### That's it!
you're ready to go! but if you wanna report errors or suggest features, feel free to open an issue!
