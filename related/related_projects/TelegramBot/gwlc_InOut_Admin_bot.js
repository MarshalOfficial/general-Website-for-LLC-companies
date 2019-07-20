let colors = require('colors');
let ups = require('../../../UsPs');
let consV = require('../../../constantVars');
global.consV = consV;
let Tbot = require('node-telegram-bot-api');
let sqlSer = require('seriate');
let path = require('path');
let async = require('async');
let moment = require('moment');

bot = new Tbot(ups.telegram.img.InOutAdmin.apiToken, {polling: true});

db_connect(function ()
{
	startBot();
});

async function startBot()
{
	bot.onText(/\/start/ , (msg) =>
	{
		const chatId = msg.chat.id;
		bot.sendMessage(chatId,"سلام. لیست حاضرین و غایبین 🙋🏼🙋🏻‍♂️",
		{
			"reply_markup":
			{
				"keyboard": [["لیست غایبین 👐🏻" , "لیست حاضرین ✌🏻" , "گزارش حضور و غیاب روز 📄"]]
			}
		});
	});
	bot.onText(/لیست حاضرین/ , (msg) =>
	{
		GetEmployeesTodayStatus(1 , function (resu)
		{			
			const chatId = msg.chat.id;
			resu.forEach((element,i) =>
			{
				if(element.RealName == '')
				{
					element.RealName = null;
				}
				bot.sendMessage(chatId, ToPersian(i+1) + '. ' + (element.RealName || element.FullName),
				{
					
				});
			});
			if(resu.length == 0)
			{
				bot.sendMessage(chatId, "هیچ حاضری نداریم 🎉");
			}
		});
	});
	bot.onText(/لیست غایبین/ , (msg) =>
	{
		GetEmployeesTodayStatus(2 , function (resu)
		{
			const chatId = msg.chat.id;		
			resu.forEach((element,i) =>
			{
				if(element.RealName == '')
				{
					element.RealName = null;
				}
				bot.sendMessage(chatId, ToPersian(i+1) + '. ' + (element.RealName || element.FullName),
				{
					
				});
			});
			if(resu.length == 0)
			{
				bot.sendMessage(chatId, "غایت نداریم، همه حاضرن 🎈🎊🎉");
			}
		});
	});
	bot.onText(/گزارش حضور و غیاب روز/ , (msg) =>
	{
		GetEmployeesInoutReport({} , function (resu)
		{
			const chatId = msg.chat.id;
			resu.forEach(element => {
				element.Data = element.Data.replace(/@Person@/g,"👤 ")
				.replace(/@Clock@/g,"⏱ ");
				bot.sendMessage(chatId, element.Data);
			});
			if(resu.length == 0)
			{
				bot.sendMessage(chatId, "هیچ گزارشی ثبت نشده 🎉");
			}
			
			// let q = {};
			// async.forEachOf(resu, function(element, index, callback)
			// {
			// 	if(q[element.ChatID] == undefined)
			// 	{
			// 		q[element.ChatID] = [];
			// 	}
			// 	q[element.ChatID].push(element);
			// 	callback(null);
			// },
			// function (err)
			// {
			// 	Object.keys(q).forEach(element =>
			// 	{
			// 		if(q[element].RealName == '')
			// 		{
			// 			q[element].RealName = null;
			// 		}
					
			// 		let messge = q[element][0].RealName || q[element][0].FullName;
			// 		messge += '\n';
			// 		q[element].forEach(el =>
			// 		{
			// 			if(el.Type == "IN")
			// 			{
			// 				el.CreateDate = moment.utc(el.CreateDate).format("ساعت: HH:mm - تاریخ: YYYY-MM-DD");
			// 				messge += "ورود: " + el.CreateDate + '\n';
			// 			}
			// 			if(el.Type == "OUT")
			// 			{
			// 				el.CreateDate = moment.utc(el.CreateDate).format("ساعت: HH:mm - تاریخ: YYYY-MM-DD");

			// 				messge += "خروج: " + el.CreateDate + '\n';
			// 			}
			// 		});
			// 		bot.sendMessage(chatId, messge);
			// 	});
				
			// 	if(err)
			// 	{
			// 		console.error( new Error("#error: ".red + err) );
			// 	}
			// });
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

function GetEmployeesTodayStatus(Type, cbf)
{
	sqlSer.execute
	({
		procedure: "GWLCGetEmployeesTodayStatus",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.NVARCHAR,
				val: 0
			},
			Type:
			{
				type: sqlSer.INT,
				val: Type
			}
		}
	})
	.then(function (resu)
	{
		cbf( resu[0][0] );
	})
	.catch(function (err)
	{
		console.error( new Error(`#Error. message: ${err}`.red) );
		cbf( err );
	});
}

function GetEmployeesTodayStatus(Type, cbf)
{
	sqlSer.execute
	({
		procedure: "GWLCGetEmployeesTodayStatus",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.NVARCHAR,
				val: 0
			},
			Type:
			{
				type: sqlSer.INT,
				val: Type
			}
		}
	})
	.then(function (resu)
	{
		cbf( resu[0][0] );
	})
	.catch(function (err)
	{
		console.error( new Error(`#Error. message: ${err}`.red) );
		cbf( err );
	});
}

function GetEmployeesInoutReport(data, cbf)
{
	sqlSer.execute
	({
		procedure: "GWLCGetEmployeesInoutReport",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.NVARCHAR,
				val: 0
			},
			FromDate:
			{
				type: sqlSer.NVARCHAR,
				val: data.FromDate || null
			},
			ToDate:
			{
				type: sqlSer.NVARCHAR,
				val: data.ToDate || null
			}		}
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