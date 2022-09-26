const commands = `
/start - Перезапустити бот
`;

const textWelcome = `<b>Namaste!</b>
LiveLoveSpace бот вітає Вас!`;

const masters = {
	Anna: "t.me/annaliveloveyoga",
	Amet: "t.me/original_amet",
	Maks: "t.me/Chefuknow",
};

const events = [
	{
		name: "yoga",
		callbackId: "yoga",
		master: masters.Anna,
		text: `Йога з Анною Паніною.

По вівторках на четвергах, на 18:30.
Вартість 200грн.`,
	},
	{
		name: "teas",
		callbackId: "tea",
		master: masters.Amet,
		text: `Дзадзен та чай з Амєтом.

По середам, на 18:30.
Вартість 200грн.`,
	},
	{
		name: "qiqong",
		callbackId: "qiqong",
		master: masters.Maks,
		text: `Цігун із Максом.

По вівторках та четвергах, на 18:30.
Вартість 200грн.`,
	},
	{
		name: "meditation",
		callbackId: "meditation",
		master: masters.Amet,
		text: `Дзадзен та чай з Амєтом.

По середам, на 18:30.
Вартість 200грн.`,
	},
	{
		name: "teaWeekend",
		callbackId: "teaWeekend",
		master: masters.Amet,
		text: `Чаювання по домашньому.

Кожну неділю, з 12:00 по 14:00.
Вартість 250грн.`,
	},
	{
		name: "customEvent",
		callbackId: "customEvent",
		master: masters.Anna,
		text: `Теплий Indoor Live Love Festival`,
	},
];

const days = {
	Tuesday: [events.Yoga, events.Qigong],
	Wednesday: [events.Tea],
	Thursday: [events.Yoga, events.Qigong],
};

module.exports.commands = commands;
module.exports.textWelcome = textWelcome;
module.exports.masters = masters;
module.exports.events = events;
module.exports.days = days;
