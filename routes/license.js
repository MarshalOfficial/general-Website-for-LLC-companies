"use strict";

let DBMain = require( consV.methods.db.main );
let express = require("express");
let router = express.Router({mergeParams: true});

router.route('/')
.all(function(req , res)
{
	DBMain.get_article( 'license' , res.locals.lang , function(err, CA)
	{
		let title = 'قوانین شرایط سایت IMG';
		res.render("license",
		{
			title: title,
			item: CA
		});
	});
});

module.exports = router;
