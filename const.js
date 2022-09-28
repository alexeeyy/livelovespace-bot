const commands = `
/start - Перезапустити бот
`;

const textWelcome = `<b>Namaste!</b>
LiveLoveSpace бот вітає Вас!`;

const masters = {
	Anna: {
		link: "t.me/annaliveloveyoga",
		photo: "./images/Anna.jpg",
	},
	Amet: {
		link: "t.me/original_amet",
		photo: "./images/Amet.jpg",
	},
	Maks: {
		link: "t.me/Chefuknow",
		photo: "./images/Maks.jpg",
	},
};

const events = [
	{
		name: "🧘  Йога",
		master: masters.Anna.link,
		photo: masters.Anna.photo,
		text: `Йога з Анною Паніною.

По вівторках на четвергах, на 18:30.
Вартість 200грн.`,
	},
	{
		name: "🍃 Чай та дзадзен",
		master: masters.Amet.link,
		photo: masters.Amet.photo,
		text: `Дзадзен та чай з Амєтом.

По середам, на 18:30.
Вартість 200грн.`,
	},
	{
		name: "☯️  Цігун",
		master: masters.Maks.link,
		photo: masters.Maks.photo,
		text: `Цігун із Максом.

По вівторках та четвергах, на 18:30.
Вартість 200грн.`,
	},
	{
		name: "🕉️  Медитація",
		master: masters.Amet.link,
		photo: masters.Amet.photo,
		text: `Дзадзен та чай з Амєтом.

По середам, на 18:30.
Вартість 200грн.`,
	},
	{
		name: "🍵  Чаювання по домашньому",
		master: masters.Amet.link,
		photo: masters.Amet.photo,
		text: `Чаювання по домашньому.

Кожну неділю, з 12:00 по 14:00.
Вартість 250грн.`,
	},
	{
		name: "🍁  Теплий Indoor Live Love Festival",
		master: masters.Anna.link,
		photo: "./images/fest.jpg",
		text: `
Що значить indoor? Це значить, що цей осінній фестиваль буде проходити у нас в спейсі, в самому центрі Києва 🍂 Ті хто був у нас знають, що наш спейс особливий, бо має одразу декілька поверхів і секретних місцин, та ще й внутрішній дворик. Хто ще не знає – приходьте вже нарешті знайомитись та відчути атмосферу!

Вартість від 500грн`,
	},
];

const days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "НД"];

module.exports.commands = commands;
module.exports.textWelcome = textWelcome;
module.exports.masters = masters;
module.exports.events = events;
module.exports.days = days;
