
const User = require("../models/User");
const Match = require("../models/Match");

async function findPartner(telegramId) {
  try {
    const currentUser = await User.findOne({ telegramId });

    if (!currentUser) {
      return {
        success: false,
        message: "Avval /start buyrug‘ini yubor, dostm.",
      };
    }

    if (currentUser.isChatting) {
      return {
        success: false,
        message: "Sen hozir suhbatdasan!",
      };
    }

    if (currentUser.isSearching) {
      return {
        success: false,
        message: "Sen allaqachon suhbatdosh qidiryapsan!",
      };
    }

    const blockedIds = currentUser.blockedUsers || [];

    const partner = await User.findOne({
      telegramId: {
        $ne: telegramId,
        $nin: blockedIds,
      },
      isSearching: true,
      isChatting: false,
      blockedUsers: { $nin: [telegramId] },
    });

    if (!partner) {
      currentUser.isSearching = true;
      await currentUser.save();

      return {
        success: true,
        message: "🔍 Suhbatdosh qidirilyapti... Biroz kut, dostm!",
      };
    }

    currentUser.isSearching = false;
    currentUser.isChatting = true;

    partner.isSearching = false;
    partner.isChatting = true;

    await Promise.all([
      currentUser.save(),
      partner.save(),
    ]);

    await Match.create({
      user1: currentUser.telegramId,
      user2: partner.telegramId,
      status: "active",
    });

    return {
      success: true,
      message: "🎉 Suhbatdosh topildi! Endi suhbatlashishing mumkin.",
      partnerId: partner.telegramId,
    };
  } catch (error) {
    console.error("Juftlashtirish xatoligi:", error.message);

    return {
      success: false,
      message: "Xatolik yuz berdi. Qayta urinib ko‘r.",
    };
  }
}

async function endChat(telegramId) {
  try {
    const user = await User.findOne({ telegramId });

    if (!user) {
      return {
        success: false,
        message: "Foydalanuvchi topilmadi.",
      };
    }

    const activeMatch = await Match.findOne({
      $or: [
        { user1: telegramId },
        { user2: telegramId },
      ],
      status: "active",
    });

    if (!activeMatch) {
      if (user.isSearching) {
        user.isSearching = false;
        await user.save();

        return {
          success: true,
          message: "⏹ Suhbatdosh qidirish to‘xtatildi.",
        };
      }

      return {
        success: false,
        message: "Hozir faol suhbating yoki qidiruving yo‘q.",
      };
    }

    const partnerId =
      activeMatch.user1 === telegramId
        ? activeMatch.user2
        : activeMatch.user1;

    activeMatch.status = "ended";
    activeMatch.endedAt = new Date();

    await Promise.all([
      activeMatch.save(),
      User.updateMany(
        { telegramId: { $in: [telegramId, partnerId] } },
        {
          $set: {
            isChatting: false,
            isSearching: false,
          },
        }
      ),
    ]);

    return {
      success: true,
      message: "⏹ Suhbat tugatildi. Yangi suhbatdosh topishing mumkin.",
      partnerId,
    };
  } catch (error) {
    console.error("Suhbatni tugatish xatoligi:", error.message);

    return {
      success: false,
      message: "Suhbatni tugatishda xatolik yuz berdi.",
    };
  }
}

module.exports = {
  findPartner,
  endChat,
};
