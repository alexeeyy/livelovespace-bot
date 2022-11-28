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
					keyboard: [[{ text: "📅  Розклад подій" }], [{ text: "🍃  Live Love Tea" }], [{ text: "❗  Інформація" }], [{ text: "🆘  Повідомити про помилку" }]],
					resize_keyboard: true,
				},
			});
		}
		// else {
		// 	if (ctx.from.id !== 558982454) {
		// 		return ctx.replyWithHTML("Вибачте, бот тимчасово не працює, ведуться технічні роботи.");
		// 	} else {
		// 		return ctx.replyWithHTML(base.textWelcome, {
		// 			reply_markup: {
		// 				keyboard: [[{ text: "📅  Розклад подій" }], [{ text: "💌  Контакти" }], [{ text: "🧧  Чайна розсилка" }]],
		// 				resize_keyboard: true,
		// 			},
		// 		});
		// 	}
		// }
	} catch (e) {
		console.error(e);
	}
});

bot.hears("📅  Розклад подій", async (ctx) => {
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
// bot.hears("📅  Дням", async (ctx) => {
// 	try {
// 		return ctx.replyWithHTML("Події цього тижня:", {
// 			reply_markup: {
// 				keyboard: [[{ text: "ВТ" }, { text: "СР" }, { text: "ЧТ" }, { text: "НД" }], [{ text: "🏠  На головну" }]],
// 				resize_keyboard: true,
// 			},
// 		});
// 	} catch (e) {
// 		console.error(e);
// 	}
// });
// bot.hears("✨  Категоріям", async (ctx) => {
// 	try {
// 		return ctx.replyWithHTML("Категорії:", {
// 			reply_markup: {
// 				keyboard: [[{ text: "🧘  Йога" }, { text: "🍃  Чай" }], [{ text: "☯️  Цігун" }, { text: "📽️  Кіночай" }], [{ text: "🏠  На головну" }]],
// 				resize_keyboard: true,
// 			},
// 		});
// 	} catch (e) {
// 		console.error(e);
// 	}
// });
bot.hears("🍃  Live Love Tea", async (ctx) => {
	try {
		return ctx.replyWithHTML("Меню чайної:", {
			reply_markup: {
				keyboard: [[{ text: "🧧  Чайна розсилка" }], [{ text: "📗  Асортимент" }], [{ text: "📦  Доставка" }], [{ text: "🏠  На головну" }]],
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

bot.hears("❗  Інформація", async (ctx) => {
	try {
		return ctx.replyWithHTML(base.info.info_main.text, Markup.inlineKeyboard([[Markup.button.url(base.team.Anna.text_info, base.team.Anna.link)], [Markup.button.url(base.team.Amet.text_info, base.team.Amet.link)], [Markup.button.url(base.team.Maks.text_info, base.team.Maks.link)]]));
	} catch (e) {
		console.error(e);
	}
});
bot.hears("📦  Доставка", async (ctx) => {
	try {
		return ctx.replyWithHTML(base.info.info_delivery.text);
	} catch (e) {
		console.error(e);
	}
});
bot.hears("🏠  На головну", async (ctx) => {
	try {
		return ctx.replyWithHTML("Головне меню:", {
			reply_markup: {
				keyboard: [[{ text: "📅  Розклад подій" }], [{ text: "🍃  Live Love Tea" }], [{ text: "❗  Інформація" }], [{ text: "🆘  Повідомити про помилку" }]],
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
bot.hears("🆘  Повідомити про помилку", async (ctx) => {
	try {
		await ctx.replyWithHTML("Опишіть помилку (наступне повідомлення):");
		if (ctx.message.text == "🆘  Повідомити про помилку") {
			return notifyAboutError(ctx.message.message_id, ctx.message.from.id);
		}
	} catch (e) {
		console.error(e);
	}
});

function notifyAboutError(message_id, from_id, active = true) {
	bot.on("message", async (ctx) => {
		try {
			if (ctx.message.message_id >= message_id + 2 && ctx.message.from.id == from_id && active == true) {
				await ctx.forwardMessage(base.team[0], ctx.message.from.id, ctx.message.message_id + 4);
				active = false;
				return ctx.replyWithHTML("Дякую за Ваше повідомлення 🙏", {
					reply_markup: {
						keyboard: [[{ text: "📅  Розклад подій" }], [{ text: "🍃  Live Love Tea" }], [{ text: "❗  Інформація" }], [{ text: "🆘  Повідомити про помилку" }]],
						resize_keyboard: true,
					},
				});
			}
		} catch (e) {
			console.error(e);
		}
	});
}

bot.launch();
