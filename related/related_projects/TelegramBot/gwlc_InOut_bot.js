let colors = require('colors');
let ups = require('../../../UsPs');
let Tbot = require('node-telegram-bot-api');
let sqlSer = require('seriate');
let path = require('path');
let nodeSch = require('node-schedule');
let geolib = require('geolib');

let consV = require('../../../constantVars');
global.consV = consV;

let placeLat = 41.7321733;
let placeLong = 44.7564693;

bot = new Tbot(ups.telegram.img.InOut.apiToken, {polling: true});

db_connect(function ()
{
	startSch();
	startBot();
});

async function startBot()
{
	bot.onText(/\/start/ , (msg) =>
	{
		const chatId = msg.chat.id;
		bot.sendMessage(chatId,"سلام. به ربات حضور غیاب خوش آمدی",
		{
			"reply_markup":
			{
				"keyboard": [[{text: "مکان فعلی شما 😏" , request_location: true}]]
			}
		});
	});
	bot.on('location' , (msg) =>
	{
		let dis = geolib.getDistance
		(
			{
				latitude: msg.location.latitude,
				longitude: msg.location.longitude
			},
			{
				latitude: placeLat,
				longitude: placeLong
			}
		);
		let seMsg = "مکان واقعی شما ثبت شد 😎";
		if(dis > 1600)
		{
			seMsg = "به نظر میرسه اطراف هتل نیستی و مکانتو زدی!! مکان شما ثبت شد ولی لازم است با تیم آی تی تماس و موضوع رو پیگیری کنید";
		}
		InsertEmployeeLocationLog(msg , dis, function ()
		{
			const chatId = msg.chat.id;
			bot.sendMessage(chatId, seMsg,
			{
				"reply_markup":
				{
					"keyboard": [["⬆️ رفتم" , "⬇ آمدم" ]]
				}
			});
		});
	});
	bot.onText(/آمدم/ , (msg) =>
	{
		InsertEmployeeInOut(msg , "IN" , function (data)
		{
			const chatId = msg.chat.id;
			bot.sendMessage(chatId, replaceEmoj(data.Txt),
			{
				"reply_markup":
				{
					"keyboard": [[{text: "مکان فعلی شما 😏" , request_location: true}]]
				}
			});
		});
	});
	bot.onText(/رفتم/ , (msg) =>
	{
		InsertEmployeeInOut(msg , "OUT" , function (data)
		{
			const chatId = msg.chat.id;
			bot.sendMessage(chatId, replaceEmoj(data.Txt),
			{
				"reply_markup":
				{
					"keyboard": [[{text: "مکان فعلی شما 😏" , request_location: true}]]
				}
			});
		});
	});
}

function db_connect(cbf)
{
	try
	{
		sqlSer.setDefaultConfig(ups.seriate.config);
	}
	catch (error)
	{
		console.log(error);
	}
	cbf();
}

function InsertEmployeeInOut(data, Type, cbf)
{
	sqlSer.execute
	({
		procedure: "GWLCInsertEmployeeInOut",
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
				val: data.chat.id
			},
			FullName:
			{
				type: sqlSer.NVARCHAR,
				val: data.from.first_name + (data.from.last_name || "")
			},
			UserName:
			{
				type: sqlSer.NVARCHAR,
				val: data.from.username
			},
			Number:
			{
				type: sqlSer.NVARCHAR,
				val: null
			},
			Type:
			{
				type: sqlSer.NVARCHAR,
				val: Type
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

function InsertEmployeeLocationLog(data, dis, cbf)
{
	sqlSer.execute
	({
		procedure: "GWLCInsertEmployeeLocationLog",
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
				val: data.chat.id
			},
			Lat:
			{
				type: sqlSer.NVARCHAR,
				val: data.location.latitude
			},
			Long:
			{
				type: sqlSer.NVARCHAR,
				val: data.location.longitude
			},
			Distance:
			{
				type: sqlSer.NVARCHAR,
				val: dis
			}
		}
	})
	.then(function (resu)
	{
		//console.log(resu[0][0]);
		cbf( null , resu[0][0] );
	})
	.catch(function (err)
	{
		console.error( new Error(`#Error. message: ${err}`.red) );
		cbf( err );
	});
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
			.replace(/@Hobbies@/g," ⛷ ")
			.replace(/@Married@/g," 💑 ")
			.replace(/@Email@/g," 📧 ")
			.replace(/@LinkedIn@/g," 🖥 ")
			.replace(/@National@/g," 🏁 ")
			.replace(/@KISS@/g," 😘 ")
			.replace(/@BYE@/g," 🖐🏻 ")
			.replace(/@IMOGI@/g," 🥛🔮💜 ");
}

function startSch()
{
	nodeSch.scheduleJob("*/20 * * * *" , function ()
	{
		EmployeesInoutReminder(function (data)
		{
			if(data != undefined && data != null)
			{
				data.forEach(element =>
				{
					bot.sendMessage(element.ChatID, replaceEmoj(element.Message));
				});
			}
		});
	});
}

function EmployeesInoutReminder(cbf)
{
	sqlSer.execute
	({
		procedure: "GWLCEmployeesInoutReminder",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.NVARCHAR,
				val: 0
			}
		}
	})
	.then(function (resu)
	{
		//console.log(resu[0][0]);
		cbf( resu[0][0] );
	})
	.catch(function (err)
	{
		console.error( new Error(`#Error. message: ${err}`.red) );
		cbf( err );
	});
}
