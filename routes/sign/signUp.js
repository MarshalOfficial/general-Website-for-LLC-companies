"use strict";

let DBProfile = require( consV.methods.db.profile);
let express = require("express");
var async = require('async');
var router = express.Router({mergeParams: true});

router.route('/')
.get(function(req , res)
{
	let title = "IMG . ثبت نام در سایت";		
	res.render("sign/signUp" ,
	{
		title: title
	});
})
.post(function(req , res)
{
	if(req.body.email == "" || typeof req.body.email == "undefined" ||
	req.body.password == "" || typeof req.body.password == "undefined")
	{
		res.send( consV.codes.lackOfInformation.toString() );
		return;
	}
	async.series
	([
		function (callback)
		{
			DBProfile.userInfoByEmOrUN(req.body.email , req.body.password, function (err, user)
			{
				if(err)
				{
					res.send( consV.codes.db.Error.toString() );
				}
				else if( user == null )
				{
					callback(null);
				}
				else if( user )
				{
					callback(consV.codes.db.docFound);
				}
			});
		},
		function (callback)
		{
			DBProfile.signUp(req.body , function (err, user)
			{				
				if(err)
				{
					callback(true , consV.codes.db.Error);
				}
				else
				{
					callback(null , user);
				}
			});
		}
	],
	function (err , result)
	{
		if(err)
		{			
			if( result[0] == consV.codes.db.Error || result[1] == consV.codes.db.Error )
			{
				res.send( consV.codes.db.Error.toString() );
			}
			else if(err == consV.codes.db.docFound)
			{
				res.send( consV.codes.db.docFound.toString() );
			}
		}
		else
		{
			// User Created
			req.session.logged = true;
			req.session.user = result[1];
			res.send( "1" );
		}
	});
});

module.exports = router;
