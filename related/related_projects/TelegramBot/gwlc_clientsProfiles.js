let colors = require('colors');
let ups = require('../../../UsPs');
let consV = require('../../../constantVars');
global.consV = consV;
let Tbot = require('node-telegram-bot-api');
let sqlSer = require('seriate');
let sharedBotLib = require('./sharedBotLib');
let path = require('path');
let async = require('async');
let moment = require('moment');

bot = new Tbot(ups.telegram.img.clientsProfiles.apiToken, {polling: true});

db_connect(function ()
{
	startBot();
});

function startBot()
{
	bot.onText(/\/start/ , (msg) =>
	{
		const chatId = msg.chat.id;
		let arrObjWrapper = [];
		GetAllClients(function (err, resu)
		{
			resu.forEach(element =>
			{
					// console.log(element);
					
				let tmp = {};
				tmp.text = element.FullName || "اسم کامل وارد نشده";
				tmp.callback_data = element.ID;
				arrObjWrapper.push([tmp]);
			});			
			bot.sendMessage(chatId, "سلام. روزت بخیر ❤️🎉\n لیست کلاینت ها",
			{
				"reply_markup":
				{
					"inline_keyboard": arrObjWrapper,
				}
			});
		});
	});
	bot.on("callback_query" , (callbackQuery) =>
	{
		// console.log(callbackQuery);
		const msg = callbackQuery.message;
		GetClientForBot(callbackQuery.data, function (res)
		{			
			bot.sendMessage(msg.chat.id, sharedBotLib.replaceText(res.Result),
			{
				
			});
		});
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

function GetClientForBot(ID, cbf)
{
	sqlSer.execute
	({
		procedure: "GWLCGetClientForBot",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.NVARCHAR,
				val: 0
			},
			ID:
			{
				type: sqlSer.INT,
				val: ID
			}
		}
	})
	.then(function (resu)
	{
		cbf( resu[0][0][0] );
	})
	.catch(function (err)
	{
		console.error( new Error(`#Error. message: ${err}`.red) );
		cbf( err );
	});
}

function GetAllClients(cbf)
{
	let result = sqlSer.execute
	({
		procedure: "GWLCGetAllClients",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: 0
			}
		}
	}).then(function (resu)
	{
		if ( resu[0][0][0].Result != "Fail" )
		{
			cbf( null , resu[0][0] );
		}
		else
		{
			cbf( null , null );
		}
		
	})
	.catch(function (err)
	{
		console.error( new Error(`#Error. message: ${err}`.red) );
		cbf( err );
	});
}

function ToPersian(string)
{	
    var etp = ['۰' , '۱' , '۲' , '۳' , '۴' , '۵' , '۶' , '۷' , '۸' , '۹'];
    var sr = "";
    var st = string.toString();
    for(var i = 0 ; i < st.length ; i++)
    {
        sr += etp[ parseInt(st[i]) ];
    }
    return sr;
}