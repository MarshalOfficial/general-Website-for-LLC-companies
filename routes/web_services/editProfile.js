"use strict";

let DBProfile = require( consV.methods.db.profile );
let express = require("express");
let router = express.Router({mergeParams: true});
let middlewares = require( consV.methods.middlewares);

router.use(middlewares.modifyProfilePermission);

router.route('/')
.post(async function (req , res)
{	
	DBProfile.editClientInfo(req.body, req.session.user.ID, function (err, result)
	{
		if(err)
		{
			res.send( consV.codes.db.Error.toString() );
		}
		else if( result )
		{
			req.session.logged = true;
			req.session.user = result;

			res.send( consV.codes.db.success.toString() );
		}
	})
});

module.exports = router;
