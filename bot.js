
const { Telegraf } = require("telegraf");
require("dotenv").config();

const connectDB = require("./config/db");
const registerStartHandlers = require("./handlers/start");
const { registerChatHandlers } = require("./handlers/chat");
const registerSafetyHandlers = require("./handlers/safety");

const bot = new Telegraf(process.env.BOT_TOKEN);

async function startBot() {
  await connectDB();


  registerStartHandlers(bot);


  registerChatHandlers(bot);

  // Shikoyat qilish va bloklash
  registerSafetyHandlers(bot);

  await bot.launch();

  console.log("AnonChat bot ishga tushdi!");
}

startBot().catch((error) => {
  console.error(
    "Botni ishga tushirishda xatolik:",
    error.message
  );
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
