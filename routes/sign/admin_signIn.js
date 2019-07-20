"use strict";

let DBProfile = require( consV.methods.db.profile );
let express = require("express");
var router = express.Router({mergeParams: true});

router.route('/')
.get(function(req , res)
{
	let title = "ورود ادمین ها و ... آی ام جی";		
	res.render("sign/admin_signIn",
	{
		title: title
	});
})
.post(async function(req , res)
{
	if(req.body.emUs == "" || typeof req.body.emUs == "undefined" ||
   req.body.password == "" || typeof req.body.password == "undefined")
   {
		res.send( consV.codes.lackOfInformation.toString() );
		return;
   }
	DBProfile.adInfoByEmOrUN(req.body.emUs , req.body.password, function (err, user)
	{
		if(err)
		{
			res.send( consV.codes.db.Error.toString() );
		}
		else if( user == null )
		{
			res.send( consV.codes.db.docNotFound.toString() );
		}
		else if( user )
		{
			req.session.logged = true;
			req.session.user = user;

			res.send( consV.codes.db.success.toString() );
		}
	});
});

module.exports = router;
