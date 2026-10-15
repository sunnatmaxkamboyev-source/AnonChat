
const { Markup } = require("telegraf");
const User = require("../models/User");
const { findPartner, endChat } = require("./matching");
const getDailyQuestion = require("../services/dailyQuestion");

function registerStartHandlers(bot) {
  bot.start(async (ctx) => {
    try {
      const telegramUser = ctx.from;

      await User.findOneAndUpdate(
        { telegramId: telegramUser.id },
        {
          $set: {
            firstName: telegramUser.first_name || "",
            username: telegramUser.username || "",
          },
          $setOnInsert: {
            telegramId: telegramUser.id,
          },
        },
        {
          upsert: true,
          returnDocument: "after",
          runValidators: true,
        }
      );

      await ctx.reply(
        "👋 Salom, dostm!\n\n" +
          "AnonChat'ga xush kelibsan!\n\n" +
          "Quyidagi menyudan birini tanla:",
        Markup.keyboard([
          ["🔍 Suhbatdosh topish"],
          ["⏹ Suhbatni tugatish"],
          ["🚨 Shikoyat qilish", "🚫 Bloklash"],
          ["❓ Kunlik savol"],
        ]).resize()
      );

      console.log(`Foydalanuvchi saqlandi: ${telegramUser.id}`);
    } catch (error) {
      console.error("Start xatoligi:", error.message);
      await ctx.reply("Xatolik yuz berdi. Qayta urinib ko‘r.");
    }
  });

  bot.hears("🔍 Suhbatdosh topish", async (ctx) => {
    try {
      const result = await findPartner(ctx.from.id);
      await ctx.reply(result.message);

      if (result.success && result.partnerId) {
        await ctx.telegram.sendMessage(
          result.partnerId,
          "🎉 Suhbatdosh topildi! Endi yozishishingiz mumkin."
        ).catch((error) => {
          console.error("Xabarnoma xatoligi:", error.message);
        });
      }
    } catch (error) {
      console.error("Qidirish xatoligi:", error.message);
      await ctx.reply("Qidirishda xatolik yuz berdi.");
    }
  });

  bot.hears("⏹ Suhbatni tugatish", async (ctx) => {
    try {
      const result = await endChat(ctx.from.id);
      await ctx.reply(result.message);

      if (result.success && result.partnerId) {
        await ctx.telegram.sendMessage(
          result.partnerId,
          "⏹ Suhbatdoshing suhbatni tugatdi. Yangi suhbatdosh qidirishing mumkin."
        ).catch((error) => {
          console.error("Xabarnoma xatoligi:", error.message);
        });
      }
    } catch (error) {
      console.error("Suhbatni tugatish xatoligi:", error.message);
      await ctx.reply("Suhbatni tugatishda xatolik yuz berdi.");
    }
  });

  bot.hears("❓ Kunlik savol", async (ctx) => {
    try {
      const question = getDailyQuestion();

      await ctx.reply(`❓ Kunlik savol:\n\n${question}`);
    } catch (error) {
      console.error("Kunlik savol xatoligi:", error.message);
      await ctx.reply("Savolni olishda xatolik yuz berdi.");
    }
  });
}

module.exports = registerStartHandlers;
