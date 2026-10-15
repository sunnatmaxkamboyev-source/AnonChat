
const User = require("../models/User");
const Match = require("../models/Match");

async function getPartnerId(telegramId) {
  const activeMatch = await Match.findOne({
    $or: [
      { user1: telegramId },
      { user2: telegramId },
    ],
    status: "active",
  });

  if (!activeMatch) {
    return null;
  }

  const partnerId =
    activeMatch.user1 === telegramId
      ? activeMatch.user2
      : activeMatch.user1;

  const partner = await User.findOne({
    telegramId: partnerId,
    isChatting: true,
  });

  return partner ? partnerId : null;
}

async function sendToPartner(ctx, sendMessage) {
  try {
    const telegramId = ctx.from.id;
    const partnerId = await getPartnerId(telegramId);

    if (!partnerId) {
      await ctx.reply(
        "Hozir faol suhbating yo‘q, dostm. 🔍 Suhbatdosh topish tugmasini bos."
      );
      return;
    }

    await sendMessage(partnerId);
  } catch (error) {
    console.error("Xabar yuborish xatoligi:", error.message);

    await ctx.reply(
      "Xabar yuborilmadi, dostm. Qayta urinib ko‘r."
    );
  }
}

function registerChatHandlers(bot) {
  // Matnli xabarlar
  bot.on("text", async (ctx) => {
    if (ctx.message.text.startsWith("/")) {
      return;
    }

    await sendToPartner(ctx, (partnerId) =>
      ctx.telegram.sendMessage(
        partnerId,
        `💬 Suhbatdoshing:\n\n${ctx.message.text}`
      )
    );
  });

  // Rasmlar
  bot.on("photo", async (ctx) => {
    const photos = ctx.message.photo;
    const photo = photos[photos.length - 1];
    const caption = ctx.message.caption || "";

    await sendToPartner(ctx, (partnerId) =>
      ctx.telegram.sendPhoto(
        partnerId,
        photo.file_id,
        {
          caption: caption
            ? `🖼 Suhbatdoshing:\n${caption}`
            : "🖼 Suhbatdoshing rasm yubordi.",
        }
      )
    );
  });

  // Ovozli xabarlar (voice)
  bot.on("voice", async (ctx) => {
    await sendToPartner(ctx, (partnerId) =>
      ctx.telegram.sendVoice(
        partnerId,
        ctx.message.voice.file_id
      )
    );
  });
}

module.exports = {
  registerChatHandlers,
  getPartnerId,
};
