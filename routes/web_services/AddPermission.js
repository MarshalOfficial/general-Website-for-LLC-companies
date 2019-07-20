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
	DBProfile.AddPermission(data, function(err , info)
	{
		if( err || (info == null) )
		{
			res.send( consV.codes.db.Error.toString() );
		}
		else
		{
			res.json( info );
		}
	});
});

module.exports = router;
