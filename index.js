const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();
const base = require("./const");

const bot = new Telegraf(process.env.BOT_TOKEN);

//======= START =======//
bot.start(async (ctx) => {
	try {
		await ctx.replyWithHTML(base.textWelcome, Markup.inlineKeyboard([[Markup.button.callback("Розклад івентів", "start-btn_01")], [Markup.button.callback("Інформація", "start-btn_02")], [Markup.button.callback("Контакти", "start-btn_03")]]));
	} catch (e) {
		console.error(e);
	}
});

bot.action("start-btn_01", async (ctx) => {
	try {
		await ctx.answerCbQuery();
		return ctx.replyWithHTML("<b>Розклад івентів з 03.10 по 09.10</b>", Markup.inlineKeyboard([[Markup.button.callback("Понеділок", "events-btn_1"), Markup.button.callback("Вівторок", "events-btn_2")], [Markup.button.callback("Середа", "events-btn_3"), Markup.button.callback("Четвер", "events-btn_4")], [Markup.button.callback("П'ятниця", "events-btn_5")], [Markup.button.callback("Субота", "events-btn_6"), Markup.button.callback("Неділя", "events-btn_7")]]));
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

addButtonAction("events-btn_2", "./images/Anna.jpg", base.textYoga);
addButtonAction("events-btn_3", "./images/Amet.jpg", base.textZen);
addButtonAction("events-btn_4", "./images/Maks.jpg", base.textQigong);

bot.launch();
