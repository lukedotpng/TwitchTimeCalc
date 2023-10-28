require("dotenv").config();
const tmi = require("tmi.js");
const timeCalc = require("./timeCalc");

const getChannelEnvVariables = () => {
  let atEndOfChannelVariables = false;
  let channelsList = [];
  let channelIndex = 1;

  while (!atEndOfChannelVariables) {
    if (process.env[`CHANNEL_${channelIndex}`]) {
      channelsList.push(process.env[`CHANNEL_${channelIndex}`]);
    } else {
      atEndOfChannelVariables = true;
    }
    channelIndex++;
    console.log("Checked channel ", channelIndex);
  }
  return channelsList;
};

const channelsList = getChannelEnvVariables();

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: "timecalc",
    password: process.env.OAUTH_TOKEN,
  },
  channels: channelsList,
});

client.connect().catch(console.error);

//
// BOT COMMANDS
//

client.on("message", (channel, tags, message, self) => {
  //checks if message is from bot
  if (self) return;
  // Badge check for future use if needed
  const isAdmin = GetChatterLevel(tags);

  //checks for !time command
  if (message.startsWith("!time")) {
    TimeCalcCommand(channel, message);
  } else {
    return;
  }

  console.log(tags.username + " in " + channel + ": " + message);
});

// Parses command and gets any valid times from given score if possible
function TimeCalcCommand(channel, message) {
  //removes !time command and leaves argument
  let score = message.replace("!time", "");

  //if argument is blank, sends example on proper command usage
  if (score == "") {
    client.say(channel, "Time Calc Example: !time (score)");
    return;
  } //if argument is not a number, sends "invalid score" message
  else if (isNaN(score)) {
    client.say(channel, "invalid score :(");
    return;
  }
  // Gets string with all possible times under 5 min from valid score
  let timeMessage = timeCalc.calculatePossibleTimes(score);

  //if there are no valid times, sends invalid score message
  if (timeMessage == "") {
    client.say(channel, "invalid score :(");
  }
  //sends message with all possible times with the given score
  client.say(channel, timeMessage);
}

// Checks chatter level, either admin or not
function GetChatterLevel(tags) {
  let badges = tags.badges || {};
  let isBroadcaster = badges.broadcaster;
  let isMod = badges.moderator;

  return isBroadcaster || isMod;
}

// export default client;
