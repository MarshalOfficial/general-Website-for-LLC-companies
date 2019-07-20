let colors = require('colors');
let ups = require('../../../UsPs');
let Tbot = require('node-telegram-bot-api');
let sqlSer = require('seriate');
let consV = require('../../../constantVars');
global.consV = consV;

bot = new Tbot(ups.telegram.img.Vac.apiToken, {polling: true});

groupid = "-1001347218842";//uVlg
// groupid = "-1001173047014";//uVlg

db_connect(function ()
{
	startBot();
});

let usersData = {};

function startBot()
{
	bot.onText(/\/start/ , (msg) =>
	{
		const chatId = msg.chat.id;
		if(chatId.toString() != groupid)
		{
			init(chatId);
			usersData[chatId].FullName = msg.chat.first_name + ' ' + msg.chat.last_name;
			usersData[chatId].UserName = msg.chat.username;
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
		}
	});

	bot.onText(/مرخصی ساعتی$/ , (msg) =>
	{
		const chatId = msg.chat.id;
		if(chatId.toString() != groupid)
		{
			init(chatId);
			usersData[chatId].type = 1;

			bot.sendMessage(chatId, "روز رو انتخاب کن",
			{
				"reply_markup":
				{
					"keyboard":
					[
						["برای فردا"],
						["برای امروز"]
					],
				}
			});
		}
	});

	bot.onText(/مرخصی روزانه$/ , (msg) =>
	{
		const chatId = msg.chat.id;
		if(chatId.toString() != groupid)
		{
			init(chatId);
			usersData[chatId].type = 2;

			bot.sendMessage(chatId, "تاریخ رو با فرمت [تاریخ تا تاریخ] راست به چپ. مثل:\n 11/oct/2018-20/oct/2018");
		}
	});


	bot.onText(/برای فردا$/ , (msg) =>
	{
		const chatId = msg.chat.id;
		if(chatId.toString() != groupid)
		{
			init(chatId);
			usersData[chatId].day = "tomorrow";
			let str = "زمان رو انگلیسی با فرمت [ساعت - ساعت] وارد کنید. مثل:";
			str += '\n';
			str += "4:30-5:35";
			bot.sendMessage(chatId, str);
		}
	});

	bot.onText(/برای امروز$/ , (msg) =>
	{
		const chatId = msg.chat.id;
		if(chatId.toString() != groupid)
		{
			init(msg.chat.id);
			usersData[msg.chat.id].day = "today";
			let str = "زمان رو انگلیسی با فرمت [ساعت - ساعت] وارد کنید. مثل:";
			str += '\n';
			str += "4:30-5:35";
			bot.sendMessage(chatId, str);
		}
	});

	bot.onText(/مرسی/ , (msg) =>
	{
		const chatId = msg.chat.id;
		if(chatId.toString() != groupid)
		{
			bot.sendMessage(chatId, "خواهش میکنم 😎");
		}
	});

	bot.onText(/^(\d+)(\:?)(\d*)\-(\d+)(\:?)(\d*)$/ , (msg) =>
	{
		const chatId = msg.chat.id;
		if(chatId.toString() != groupid)
		{
			init(msg.chat.id);
			usersData[msg.chat.id].timePeriod = msg.text;
			InsertEmployeeVacation(msg.chat.id, function (result)
			{
				// console.log(result);

				bot.sendMessage(chatId, "درخواست شما برای مدیر ارسال شد. منتظر پاسخ باشید",
				{
					"reply_markup":
					{
						"keyboard":
						[
							["مرسی 😘"],["/start"]
						],
					}
				});
				bot.sendMessage(groupid, replaceEmoj(result.Txt),
				{
					"reply_markup":
					{
						"inline_keyboard":
						[
							[
								{
									text: "رد",
									callback_data: "reject"
								},
								{
									text: "قبول",
									callback_data: "accept"
								}
							]
						],
					}
				});
			});
		}
	});
	bot.onText(/^(\d+)\/(\w{3,})\/(\d+)\-(\d+)\/(\w{3,})\/(\d+)$/ , (msg) =>
	{
		const chatId = msg.chat.id;
		if(chatId.toString() != groupid)
		{
			init(msg.chat.id);
			usersData[msg.chat.id].timePeriod = msg.text;
			InsertEmployeeVacation(msg.chat.id, function (result)
			{
				bot.sendMessage(chatId, "درخواست شما برای مدیر ارسال شد. منتظر پاسخ باشید",
				{
					"reply_markup":
					{
						"keyboard":
						[
							["مرسی 😘"],["/start"]
						],
					}
				});
				bot.sendMessage(groupid, replaceEmoj(result.Txt),
				{
					"reply_markup":
					{
						"inline_keyboard":
						[
							[
								{
									text: "رد",
									callback_data: "reject"
								},
								{
									text: "قبول",
									callback_data: "accept"
								}
							]
						],
					}
				});
			});
		}
	});

	bot.onText(/[۰۱۲۳۴۵۶۷۸۹]+/ , (msg) =>
	{
		const chatId = msg.chat.id;
		if(chatId.toString() != groupid)
		{
			bot.sendMessage(chatId, "فارسی نداریم. همه چی رو به انگلیسی بزن");
		}
	});

	bot.on("callback_query" , (callbackQuery) =>
	{
		// console.log(callbackQuery);
		const msg = callbackQuery.message;
		// console.log(msg);

		if(callbackQuery.data == "accept")
		{
			let fLoc = msg.text.indexOf("ي : (");
			let lLoc = msg.text.indexOf(")")
			let record = msg.text.substr(fLoc + 5, lLoc-fLoc-5);
			bot.answerCallbackQuery(callbackQuery.id)
			.then(function ()
			{
				UpdateEmployeeVacation(record, 1, function (result)
				{
					bot.sendMessage(result.ChatID, "مرخصی قبول شد 🌴🌱🌿")
					.then(function (r)
					{
						delete usersData[result.ChatID];
					});
				});
			});
		}
		else if(callbackQuery.data == "reject")
		{
			let fLoc = msg.text.indexOf("ي : (");
			let lLoc = msg.text.indexOf(")")
			let record = msg.text.substr(fLoc + 5, lLoc-fLoc-5 );
			bot.answerCallbackQuery(callbackQuery.id)
			.then(function ()
			{
				UpdateEmployeeVacation(record, 0, function (result)
				{
					bot.sendMessage(result.ChatID, "مرخصی رد شد 🌴🌱🌿")
					.then(function (r)
					{
						delete usersData[result.ChatID];
					});
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

function init(id)
{
	if(usersData[id] == undefined)
	{
		usersData[id] = {};
	}
}

function replaceEmoj(str)
{
	return str.replace(/@Birth@/g,"📆 ")
			.replace(/@Education@/g,"🎓 ")
			.replace(/@En@/g,"🗣 ")
			.replace(/@Geo@/g,"🗣 ")
			.replace(/@Ru@/g,"🗣 ")
			.replace(/@Time@/g,"⏰ ")
			.replace(/@Person@/g,"👤 ")
			.replace(/@Tel@/g,"☎ ️")
			.replace(/@Request@/g,"📝 ")
			.replace(/@Telegram@/g,"🌍 ")
			.replace(/@Web@/g,"🌍 ")
			.replace(/@CoField@/g,"⌨️ ")
			.replace(/@Experience@/g,"📂 ")
			.replace(/@Money@/g,"💵 ")
			.replace(/@Note@/g,"📃 ")
			.replace(/@Goals@/g,"🎈 ")
			.replace(/@Hobbies@/g,"⛷ ")
			.replace(/@Married@/g,"💑 ")
			.replace(/@Email@/g,"📧 ")
			.replace(/@LinkedIn@/g,"🖥 ")
			.replace(/@National@/g,"🏁 ")
			.replace(/@IMOGI@/g,"🥛🔮💜");
}

function InsertEmployeeVacation(id, cbf)
{
	sqlSer.execute
	({
		procedure: "GWLCInsertEmployeeVacation",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.NVARCHAR,
				val: 0
			},
			ChatID:
			{
				type: sqlSer.NVARCHAR,
				val: id
			},
			FullName:
			{
				type: sqlSer.NVARCHAR,
				val: usersData[id].FullName
			},
			UserName:
			{
				type: sqlSer.NVARCHAR,
				val: usersData[id].UserName
			},
			Type:
			{
				type: sqlSer.INT,
				val: usersData[id].type
			},
			TimePeriod:
			{
				type: sqlSer.NVARCHAR,
				val: usersData[id].timePeriod
			},
			Day:
			{
				type: sqlSer.NVARCHAR,
				val: usersData[id].day || null
			}
		}
	})
	.then(function (resu)
	{
		//console.log(resu[0][0]);
		cbf( resu[0][0][0] );
	})
	.catch(function (err)
	{
		console.error( new Error(`#Error. message: ${err}`.red) );
		cbf( err );
	});
}

function UpdateEmployeeVacation(recordId, ans, cbf)
{
	sqlSer.execute
	({
		procedure: "GWLCUpdateEmployeeVacation",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.NVARCHAR,
				val: 0
			},
			VacationID:
			{
				type: sqlSer.INT,
				val: recordId
			},
			Result:
			{
				type: sqlSer.NVARCHAR,
				val: ans
			}
		}
	})
	.then(function (resu)
	{
		//console.log(resu[0][0]);
		cbf( resu[0][0][0] );
	})
	.catch(function (err)
	{
		console.error( new Error(`#Error. message: ${err}`.red) );
		cbf( err );
	});
}