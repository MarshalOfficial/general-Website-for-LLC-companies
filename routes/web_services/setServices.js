"use strict";

let DBProfile = require( consV.methods.db.profile );
let middlewares = require( consV.methods.middlewares);
let express = require("express");
let router = express.Router({mergeParams: true});

router.use(middlewares.modifyServicePermission);

router.route('/')
.post(async function (req , res)
{	
	DBProfile.setServices(req.body, req.session.user.ID, function (err, result)
	{		
		if(err)
		{
			res.send( consV.codes.db.Error.toString() );
		}
		else if( result )
		{
			res.send( consV.codes.db.success.toString() );
		}
	})
});

module.exports = router;
