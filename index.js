const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();
const base = require("./const");

const bot = new Telegraf(process.env.BOT_TOKEN);

//======= START =======//
bot.start(async (ctx) => {
	setTimeout(() => {
		try {
			return ctx.replyWithHTML("Головне меню:", Markup.inlineKeyboard([[Markup.button.callback("Розклад подій", "events")], [Markup.button.callback("Контакти", "contacts")]]));
		} catch (e) {
			console.error(e);
		}
	}, 1000);
});

bot.action("events", async (ctx) => {
	try {
		await ctx.answerCbQuery();
		return ctx.editMessageText("Виберіть фільтр:", Markup.inlineKeyboard([[Markup.button.callback("По дням", "events-by-day"), Markup.button.callback("По категоріям", "events-by-category")], [Markup.button.callback("На головну", "to-start")]]));
	} catch (e) {
		console.error(e);
	}
});
bot.action("events-by-day", async (ctx) => {
	try {
		await ctx.answerCbQuery();
		return ctx.editMessageText("Події цього тижня:", Markup.inlineKeyboard([[Markup.button.callback("Вівторок", "Tuesday"), Markup.button.callback("Середа", "Wednesday"), Markup.button.callback("Четвер", "Thursday")], [Markup.button.callback("Субота", "Saturday"), Markup.button.callback("Неділя", "Sunday")], [Markup.button.callback("На головну", "to-start")]]));
	} catch (e) {
		console.error(e);
	}
});
bot.action("events-by-category", async (ctx) => {
	try {
		await ctx.answerCbQuery();
		return ctx.editMessageText("Категорії:", Markup.inlineKeyboard([[Markup.button.callback("Йога", "yoga"), Markup.button.callback("Чай", "tea")], [Markup.button.callback("Цігун", "qiqong"), Markup.button.callback("Медитація", "meditation")], [Markup.button.callback("На головну", "to-start")]]));
	} catch (e) {
		console.error(e);
	}
});

base.events.forEach((event) => {
	bot.action(event.callbackId, async (ctx) => {
		try {
			ctx.answerCbQuery();
			return ctx.editMessageText(event.text, Markup.inlineKeyboard([[Markup.button.url("Записатися", event.master)], [Markup.button.callback("На головну", "to-start")]]));
		} catch (e) {
			console.error(e);
		}
	});
});

base.days.forEach((day) => {
	bot.action(day.day, async (ctx) => {
		try {
			await ctx.answerCbQuery();

			if (day.day === "Tuesday") {
				return ctx.editMessageText("Події вівторка:", Markup.inlineKeyboard([[Markup.button.callback("Йога", "yoga"), Markup.button.callback("Цігун", "qiqong")], [Markup.button.callback("На головну", "to-start")]]));
			}

			if (day.day === "Wednesday") {
				return ctx.editMessageText("Події середи:", Markup.inlineKeyboard([[Markup.button.callback("Чай та медитація", "meditation")], [Markup.button.callback("На головну", "to-start")]]));
			}

			if (day.day === "Tuesday" || day.day === "Thursday") {
				return ctx.editMessageText("Події четверга:", Markup.inlineKeyboard([[Markup.button.callback("Йога", "yoga"), Markup.button.callback("Цігун", "qiqong")], [Markup.button.callback("На головну", "to-start")]]));
			}

			if (day.day === "Saturday") {
				return ctx.editMessageText("Події суботи:", Markup.inlineKeyboard([[Markup.button.callback("Теплий Indoor Live Love Festival", "customEvent")], [Markup.button.callback("На головну", "to-start")]]));
			}

			if (day.day === "Sunday") {
				return ctx.editMessageText("Події неділі:", Markup.inlineKeyboard([[Markup.button.callback("Теплий Indoor Live Love Festival", "customEvent")], [Markup.button.callback("На головну", "to-start")]]));
			}
		} catch (e) {
			console.error(e);
		}
	});
});

//======= FUNCTIONS =======//
// function eventButtonAction(id, day, text) {
// 	bot.action(id, async (ctx) => {
// 		try {
// 			await ctx.answerCbQuery();
// 			// if (src !== false) {
// 			// 	await ctx.replyWithPhoto({
// 			// 		source: src,
// 			// 	});
// 			// }
// 			return ctx.replyWithHTML(
// 				day.forEach((el) => {
// 					el.text;
// 				})
// 			);
// 		} catch (e) {
// 			console.error(e);
// 		}
// 	});
// }

bot.action("contacts", async (ctx) => {
	try {
		await ctx.answerCbQuery();
		return ctx.editMessageText("Анна Паніна - засновниця простору та наш викладач з йоги.", Markup.inlineKeyboard([[Markup.button.url("Зв'язатися", "t.me/annaliveloveyoga")], [Markup.button.callback("На головну", "to-start")]]));
	} catch (e) {
		console.error(e);
	}
});
bot.action("to-start", async (ctx) => {
	try {
		await ctx.editMessageText("Головне меню:", Markup.inlineKeyboard([[Markup.button.callback("Розклад подій", "events")], [Markup.button.callback("Контакти", "contacts")]]));
	} catch (e) {
		console.error(e);
	}
});

bot.launch();
