
const User = require("../models/User");
const Match = require("../models/Match");
const Report = require("../models/Report");
const { endChat } = require("./matching");

function registerSafetyHandlers(bot) {
  bot.hears("🚨 Shikoyat qilish", async (ctx) => {
    try {
      const user = await User.findOne({
        telegramId: ctx.from.id,
      });

      if (!user) {
        return ctx.reply("Avval /start buyrug‘ini yubor, dostm.");
      }

      const match = await Match.findOne({
        $or: [
          { user1: ctx.from.id },
          { user2: ctx.from.id },
        ],
        status: "active",
      });

      if (!match) {
        return ctx.reply(
          "Shikoyat qilish uchun faol suhbat bo‘lishi kerak."
        );
      }

      const reportedId =
        match.user1 === ctx.from.id
          ? match.user2
          : match.user1;

      await Report.create({
        reporterId: ctx.from.id,
        reportedId,
        reason: "Foydalanuvchi shikoyati",
      });

      const result = await endChat(ctx.from.id);

      await ctx.reply(
        "✅ Shikoyating saqlandi. Suhbat tugatildi."
      );

      if (result.partnerId) {
        await ctx.telegram.sendMessage(
          result.partnerId,
          "⏹ Suhbat yakunlandi."
        ).catch(() => {});
      }
    } catch (error) {
      console.error("Shikoyat xatoligi:", error.message);
      await ctx.reply("Shikoyatni saqlashda xatolik yuz berdi.");
    }
  });

  bot.hears("🚫 Bloklash", async (ctx) => {
    try {
      const user = await User.findOne({
        telegramId: ctx.from.id,
      });

      if (!user) {
        return ctx.reply("Avval /start buyrug‘ini yubor, dostm.");
      }

      const match = await Match.findOne({
        $or: [
          { user1: ctx.from.id },
          { user2: ctx.from.id },
        ],
        status: "active",
      });

      if (!match) {
        return ctx.reply(
          "Bloklash uchun avval suhbatdosh topishing kerak."
        );
      }

      const partnerId =
        match.user1 === ctx.from.id
          ? match.user2
          : match.user1;

      await User.updateOne(
        { telegramId: ctx.from.id },
        { $addToSet: { blockedUsers: partnerId } }
      );

      const result = await endChat(ctx.from.id);

      await ctx.reply(
        "🚫 Suhbatdosh bloklandi. Endi u bilan qayta juftlashmaysan."
      );

      if (result.partnerId) {
        await ctx.telegram.sendMessage(
          result.partnerId,
          "⏹ Suhbat yakunlandi."
        ).catch(() => {});
      }
    } catch (error) {
      console.error("Bloklash xatoligi:", error.message);
      await ctx.reply("Bloklashda xatolik yuz berdi.");
    }
  });
}

module.exports = registerSafetyHandlers;
