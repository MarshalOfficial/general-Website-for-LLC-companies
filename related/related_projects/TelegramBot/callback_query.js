let colors = require('colors');
let ups = require('../../../UsPs');
let consV = require('../../../constantVars');
global.consV = consV;
let Tbot = require('node-telegram-bot-api');
let sqlSer = require('seriate');
let path = require('path')

bot = new Tbot(ups.telegram.img.Vac.apiToken, {polling: true});

db_connect(function ()
{
	startBot();
});

function startBot()
{
	bot.onText(/\/start/ , (msg) =>
	{
		const chatId = msg.chat.id;		
		bot.sendMessage(chatId, "سلام. به ربات مرخصی خوش آمدی",
		{
			"reply_markup":
			{
				"keyboard":
				[
					["مرخصی روزانه"],
					["مرخصی ساعتی"]
				],
			}
		});
	});
	bot.onText(/مرخصی ساعتی$/ , (msg) =>
	{
		const chatId = msg.chat.id;		
		bot.sendMessage(chatId, "روز رو انتخاب کن",
		{
			"reply_markup":
			{
				"inline_keyboard":
				[
					[
						{
							text: "برای فردا",
							callback_data: "dayOff-tomorrow"
						},
						{
							text: "برای امروز",
							callback_data: "dayOff-today"
						}
					]
				],
			}
		});
	});
	bot.on("callback_query" , (callbackQuery) =>
	{
		// console.log(callbackQuery);
		const msg = callbackQuery.message;
		// console.log(msg);
		
		if(callbackQuery.data == "dayOff-tomorrow")
		{
			bot.answerCallbackQuery(callbackQuery.id)
			.then(function ()
			{
				init(msg.chat.id);
				usersData[msg.chat.id].day = "tomorrow";
				bot.sendMessage(msg.chat.id, "ساعت رو با فرمت [ساعت - ساعت] وارد کنید. مثل: ۳-۴",
				{
					
				});
			});
		}
		else if(callbackQuery.data == "dayOff-today")
		{
			bot.answerCallbackQuery(callbackQuery.id)
			.then(function ()
			{
				init(msg.chat.id);
				usersData[msg.chat.id].day = "today";
				bot.sendMessage(msg.chat.id, "ساعت رو با فرمت [ساعت - ساعت] وارد کنید. مثل: ۳-۴",
				{
					
				});
			});
		}
	});
}

function db_connect(cbf)
{
	try {
		sqlSer.setDefaultConfig(ups.seriate.config);
	} catch (error) {
		console.log(error);
	}
	cbf();
}
