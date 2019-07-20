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
	DBMain.deleteTimeLog(req.body.id, function(err , info)
	{
		if( err || (info == null) )
		{
			res.send( consV.codes.db.Error.toString() );
		}
		else
		{
			res.send( consV.codes.db.success.toString() );
		}
	});
});

module.exports = router;
