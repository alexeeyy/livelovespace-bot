const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();
const base = require("./const");

const bot = new Telegraf(process.env.BOT_TOKEN);

//======= START =======//
bot.start(async (ctx) => {
	try {
		await ctx.replyWithHTML(base.textWelcome);
		setTimeout(() => {
			return ctx.replyWithHTML("Головне меню:", Markup.inlineKeyboard([[Markup.button.callback("Розклад подій", "events")], [Markup.button.callback("Контакти", "contacts")]]));
		}, 1000);
	} catch (e) {
		console.error(e);
	}
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
bot.action("Tuesday", async (ctx) => {
	try {
		await ctx.answerCbQuery();
		return ctx.editMessageText("Події вівторка:", Markup.inlineKeyboard([[Markup.button.callback("Йога", "yoga-single"), Markup.button.callback("Цігун", "qiqong-single")], [Markup.button.callback("На головну", "to-start")]]));
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
bot.action("yoga", async (ctx) => {
	try {
		await ctx.answerCbQuery();
		return ctx.editMessageText(base.textYoga, Markup.inlineKeyboard([[Markup.button.url("Записатися", "t.me/annaliveloveyoga")], [Markup.button.callback("На головну", "to-start")]]));
	} catch (e) {
		console.error(e);
	}
});
bot.action("tea", async (ctx) => {
	try {
		await ctx.answerCbQuery();
		return ctx.editMessageText(base.textTea, Markup.inlineKeyboard([[Markup.button.url("Записатися", "t.me/original_amet")], [Markup.button.callback("На головну", "to-start")]]));
	} catch (e) {
		console.error(e);
	}
});
bot.action("qiqong", async (ctx) => {
	try {
		await ctx.answerCbQuery();
		return ctx.editMessageText(base.textQigong, Markup.inlineKeyboard([[Markup.button.url("Записатися", "t.me/Chefuknow")], [Markup.button.callback("На головну", "to-start")]]));
	} catch (e) {
		console.error(e);
	}
});
bot.action("meditation", async (ctx) => {
	try {
		await ctx.answerCbQuery();
		return ctx.editMessageText(base.textZen, Markup.inlineKeyboard([[Markup.button.url("Записатися", "t.me/original_amet")], [Markup.button.callback("На головну", "to-start")]]));
	} catch (e) {
		console.error(e);
	}
});

//======= FUNCTIONS =======//
function addButtonAction(id, src, text) {
	bot.action(id, async (ctx) => {
		try {
			await ctx.answerCbQuery();
			if (src !== false) {
				await ctx.replyWithPhoto({
					source: src,
				});
			}
			return ctx.replyWithHTML(text, {
				disable_web_page_preview: true,
			});
		} catch (e) {
			console.error(e);
		}
	});
}

addButtonAction("yoga-single", "./images/Anna.jpg", base.textYoga);
addButtonAction("qiqong-single", "./images/Maks.jpg", base.textQigong);
// addButtonAction("events-btn_3", "./images/Amet.jpg", base.textZen);

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
