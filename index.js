const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();
const base = require("./const");

const bot = new Telegraf(process.env.BOT_TOKEN);

//======= START =======//
bot.start(async (ctx) => {
	try {
		await ctx.deleteMessage();
		if (base.status === false) {
			return ctx.replyWithHTML(base.textWelcome, {
				reply_markup: {
					keyboard: [[{ text: "🎉  Розклад подій" }], [{ text: "💌  Контакти" }], [{ text: "🧧  Чайна розсилка" }]],
					resize_keyboard: true,
				},
			});
		} else {
			if (ctx.from.id !== 558982454) {
				return ctx.replyWithHTML("Вибачте, бот тимчасово не працює, ведуться технічні роботи.");
			} else {
				return ctx.replyWithHTML(base.textWelcome, {
					reply_markup: {
						keyboard: [[{ text: "🎉  Розклад подій" }], [{ text: "💌  Контакти" }], [{ text: "🧧  Чайна розсилка" }]],
						resize_keyboard: true,
					},
				});
			}
		}
	} catch (e) {
		console.error(e);
	}
});

bot.hears("🎉  Розклад подій", async (ctx) => {
	try {
		return ctx.replyWithHTML("Фільтр подій по:", {
			reply_markup: {
				keyboard: [[{ text: "📅  Дням" }, { text: "✨  Категоріям" }], [{ text: "🏠  На головну" }]],
				resize_keyboard: true,
			},
		});
	} catch (e) {
		console.error(e);
	}
});
bot.hears("📅  Дням", async (ctx) => {
	try {
		return ctx.replyWithHTML("Події цього тижня:", {
			reply_markup: {
				keyboard: [[{ text: "ВТ" }, { text: "СР" }, { text: "ЧТ" }, { text: "НД" }], [{ text: "🏠  На головну" }]],
				resize_keyboard: true,
			},
		});
	} catch (e) {
		console.error(e);
	}
});
bot.hears("✨  Категоріям", async (ctx) => {
	try {
		return ctx.replyWithHTML("Категорії:", {
			reply_markup: {
				keyboard: [[{ text: "🧘  Йога" }, { text: "🍃  Чай" }], [{ text: "☯️  Цігун" }, { text: "📽️  Кіночай" }], [{ text: "🏠  На головну" }]],
				resize_keyboard: true,
			},
		});
	} catch (e) {
		console.error(e);
	}
});
// bot.hears("🍃  Чай", async (ctx) => {
// 	try {
// 		return ctx.replyWithHTML("Чайні івенти:", {
// 			reply_markup: {
// 				keyboard: [[{ text: "🍵  Чаювання по домашньому" }], [{ text: "🏠  На головну" }]],
// 				resize_keyboard: true,
// 			},
// 		});
// 	} catch (e) {
// 		console.error(e);
// 	}
// });

base.events.forEach((event) => {
	eventButtonAction(event.name, event.photo, event.text, event.master);
});

base.days.forEach((day) => {
	bot.hears(day, async (ctx) => {
		try {
			if (day === "ВТ") {
				return ctx.replyWithHTML("Події вівторка:", {
					reply_markup: {
						keyboard: [[{ text: "🧘  Йога" }, { text: "☯️  Цігун" }], [{ text: "🏠  На головну" }]],
						resize_keyboard: true,
					},
				});
			}

			if (day === "СР") {
				return ctx.replyWithHTML("Події середи:", {
					reply_markup: {
						keyboard: [[{ text: "📽️  Кіночай" }], [{ text: "🏠  На головну" }]],
						resize_keyboard: true,
					},
				});
			}

			if (day === "ЧТ") {
				return ctx.replyWithHTML("Події Четверга:", {
					reply_markup: {
						keyboard: [[{ text: "🧘  Йога" }, { text: "☯️  Цігун" }], [{ text: "🏠  На головну" }]],
						resize_keyboard: true,
					},
				});
			}

			// if (day === "СБ") {
			// 	return ctx.replyWithHTML("Події суботи:", {
			// 		reply_markup: {
			// 			keyboard: [[{ text: "Теплий Indoor Live Love Festival" }], [{ text: "🏠  На головну" }]],
			// 			resize_keyboard: true,
			// 		},
			// 	});
			// }

			if (day === "НД") {
				return ctx.replyWithHTML("Події неділі:", {
					reply_markup: {
						keyboard: [[{ text: "🍵  Чаювання по домашньому" }], [{ text: "🏠  На головну" }]],
						resize_keyboard: true,
					},
				});
			}
		} catch (e) {
			console.error(e);
		}
	});
});

//======= FUNCTIONS =======//
function eventButtonAction(name, src, text, master) {
	bot.hears(name, async (ctx) => {
		try {
			if (src !== false) {
				return ctx.replyWithPhoto(
					{
						source: src,
					},
					{
						parse_mode: "HTML",
						caption: text,
						reply_markup: {
							inline_keyboard: [[Markup.button.url("Записатися", master)]],
						},
					}
				);
			} else {
				return ctx.replyWithHTML(text);
			}
		} catch (e) {
			console.error(e);
		}
	});
}

bot.hears("💌  Контакти", async (ctx) => {
	try {
		return ctx.replyWithHTML("<b>Анна Паніна</b> - мама спейсу, та наш викладач з йоги.", Markup.inlineKeyboard([[Markup.button.url("Зв'язатися", "t.me/annaliveloveyoga")]]));
	} catch (e) {
		console.error(e);
	}
});
bot.hears("🏠  На головну", async (ctx) => {
	try {
		return ctx.replyWithHTML("Головне меню:", {
			reply_markup: {
				keyboard: [[{ text: "🎉  Розклад подій" }], [{ text: "💌  Контакти" }], [{ text: "🧧  Чайна розсилка" }]],
				resize_keyboard: true,
			},
		});
	} catch (e) {
		console.error(e);
	}
});
bot.hears(["🧧  Чайна розсилка"], async (ctx) => {
	try {
		return ctx.replyWithPhoto(
			{
				source: base.teaSend.src,
			},
			{
				caption: base.teaSend.text,
				parse_mode: "HTML",
				reply_markup: {
					inline_keyboard: [[Markup.button.url("Оформити предзамовлення", "t.me/original_amet")]],
					resize_keyboard: true,
				},
			}
		);
	} catch (e) {
		console.error(e);
	}
});

bot.launch();
