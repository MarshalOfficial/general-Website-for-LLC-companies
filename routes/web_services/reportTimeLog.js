"use strict";

let DBMain = require( consV.methods.db.main);
let middlewares = require( consV.methods.middlewares);
let express = require("express");
let router = express.Router({mergeParams: true});
let moment = require('moment');

router.use(middlewares.CheckLogedIn);

router.route('/')
.post(function (req , res)
{
	let data = req.body;
	data.userID = req.session.user.ID;
	if(data.date == undefined || data.date == null)
	{
		data.date = moment().format("YYYY-MM-DD");
	}
	DBMain.reportTimeLog(data, function(err , info)
	{
		if( err || (info == null) )
		{
			res.send( consV.codes.db.Error.toString() );
		}
		else
		{
			info.forEach( (element,i) =>
			{
				info[i].SaveDate = moment(info[i].SaveDate).format("YYYY-MM-DD") || null;
			});
			res.json( info );
		}
	});
});

module.exports = router;
