"use strict";

let DBMain = require( consV.methods.db.main );
let middlewares = require( consV.methods.middlewares);
let express = require("express");
let router = express.Router({mergeParams: true});

router.use(middlewares.CheckLogedIn);

router.route('/')
.post(function (req , res)
{	
	let data = req.body;
	data.ID = req.session.user.ID;
	DBMain.GetAllDepartments(function(err , info)
	{
		if( err || (info == null) )
		{
			res.send( consV.codes.db.Error.toString() );
		}
		else
		{
			// info.Services e= JSON.parse(info.Services);
			// info.UserServices = JSON.parse(info.UserServices);
			// console.log(info);
			res.json( info );
		}
	});
});

module.exports = router;
