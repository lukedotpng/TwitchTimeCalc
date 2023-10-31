## Twitch Time Calc - A Chat Bot For Hitman WoA Speedrunners

### Interaction with the bot:

Type `!time` in a twitch chat, followed by the score shown on your mission rating screen. If a valid time is given, the bot will send all possible times in the format of **mm:ss.ms** (`00:00.000`). If an invalid score is given, then the bot will send `invalid score :(`. If no score is given, then the bot will send `Example: !time [score]`.

Currently this bot is running on a Oracle cloud VM and sending messages through the [timecalc](https://twitch.tv/timecalc) twitch account. Currently it's active in four twitch channels, [lukedotpng](https://twitch.tv/lukedotpng) (me), [Vezlaye](https://twitch.tv/vezlaye) (goat), [Zionicle\_](https://twitch.tv/zionicle_), and [Zebulaus](https://twitch.tv/zebulaus).

### How to use:

You can easily run your own instance on a local machine, cloud machine, or through a service like [Railway](https://railway.app/) or [Heroku](https://www.heroku.com/). Once you have downloaded the code, you need to make a `.env` file (or add environment variables) that contain the following variables:

- **OAUTH_TOKEN**: This is the token that will allow the app to send messages through a twitch account. You can easily get a token for your account using [TwitchTokenGenerator](https://twitchtokengenerator.com)

- **CHANNEL_N**: Here you will list the channels you want your bot active in, starting at `CHANNEL_1`. You can list as many as you'd like and the bot will add them. Be sure to keep the variables sequencial, as the bot will stop checking for more channels if a variable in the sequence is undefined.

### How it works

The calculations are from [Solderq35](https://github.com/solderq35)'s Hitman time calculator website, found [here](https://solderq35.github.io/time-calc-under-5/). Thank you Solder :D
