"use strict";

let DBProfile = require( consV.methods.db.profile );
let middlewares = require( consV.methods.middlewares);
let express = require("express");
let router = express.Router({mergeParams: true});

router.use(middlewares.CheckLogedIn);

router.route('/')
.post(function (req , res)
{	
	let data = req.body;
	data.ID = req.session.user.ID;
	DBProfile.getAllServices(data, function(err , info)
	{
		if( err || (info == null) )
		{
			res.send( consV.codes.db.Error.toString() );
		}
		else
		{
			
			// info.Services = JSON.parse(info.Services);
			// info.UserServices = JSON.parse(info.UserServices);
			// console.log(info);
			res.json( info );
		}
	});
});

module.exports = router;
