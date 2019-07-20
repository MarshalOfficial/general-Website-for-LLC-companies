"use strict";

let DBProfile = require( consV.methods.db.profile );
let middlewares = require( consV.methods.middlewares);
let express = require("express");
let router = express.Router({mergeParams: true});

router.use(middlewares.CheckLogedIn);

router.route('/')
.post(function (req , res)
{
	DBProfile.getClientFullStatus(req.body.ID || req.session.user.ID, function(err , info)
	{
		if( err || (info == null) )
		{
			res.send( consV.codes.db.Error.toString() );
		}
		else
		{
			info.forEach(element =>
			{				
				element.ServiceStatus = JSON.parse(element.ServiceStatus);
				element.ServiceSteps = JSON.parse(element.ServiceSteps);
				element.ServiceRequestStepLogs = JSON.parse(element.ServiceRequestStepLogs);
			});
			res.json( info );
		}
	});
});

module.exports = router;
