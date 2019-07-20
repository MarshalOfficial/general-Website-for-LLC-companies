let async = require('async');
let ups = require('../../../UsPs');
let consV = require('../../../constantVars');
global.consV = consV;
let Tbot = require('node-telegram-bot-api');
let sqlSer = require('seriate');
let path = require('path');
let sharedBotLib = require('./sharedBotLib');

bot = new Tbot(ups.telegram.img.RecReq.apiToken, {polling: false});

db_connect(function ()
{
	startBot();
});

const options =
{
	// parse_mode: 'markdown'
}

function startBot()
{	
	get_telegram_bot_messages(function(err, result)
	{
		async.forEachOf(result, function(element, index, callback)
		{
			let groupid = "";
			switch (element.Department) {
				case "HR":
					groupid = "-1001347218842";//uVlg
					break;
				case "Legal":
					groupid = "-1001363815497";
					break;
				default:
					break;
			}
		
			let message = sharedBotLib.replaceText(element.Memo);

			bot.sendMessage(groupid, message, options);
			
			update_telegram_bot_message(element.ID,function(err,resultt)
			{
				if(element.FileUrl != "" && element.FileUrl != null)
				{		
					let patt = path.join('..' , '..' , '..' ,  'space' , element.FileUrl);
					bot.sendDocument(groupid,patt)
					.then(function (ressss)
					{
						callback(null);
					});				
				}
				else
				{
					callback(null);
				}
			});			
		},
		function (err)
		{
			if(err)
			{
				console.error( new Error("#error: ".red + err) );
			}
		});		
	});

	console.log("#Done :)");
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

function get_telegram_bot_messages(cbf)
{
	sqlSer.execute
	({
		procedure: "GWLCGetUnSendTelegramBotMessages",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: 1
			}
		}
	})
	.then(function (resu)
	{
		// console.log(resu[0]);
		cbf( null , resu[0][0] );
	})
	.catch(function (err)
	{
		console.error( new Error(`#Error. message: ${err}`) );
		cbf( err );
	});
}


function update_telegram_bot_message(id,cbf)
{
	sqlSer.execute
	({
		procedure: "GWLCUpdateSendedTelegramBotMessage",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: 1
			},
			ID:
			{
				type: sqlSer.INT,
				val: id
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