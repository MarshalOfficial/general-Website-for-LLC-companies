"use strict";

let DBMain = require( consV.methods.db.main );
let express = require("express");
let router = express.Router({mergeParams: true});

router.route('/')
.all(function(req , res)
{
	DBMain.get_article( 'aboutus' , res.locals.lang , function(err, CA)
	{
		let title = 'درباره ی شرکت IMG';
		res.render("aboutus",
		{
			title: title,
			item: CA
		});
	});
});

module.exports = router;
