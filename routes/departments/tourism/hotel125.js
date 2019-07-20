"use strict";

let DBMain = require(consV.methods.db.main);
let middlewares = require( consV.methods.middlewares);
let express = require("express");
let async = require('async');
let router = express.Router({mergeParams: true});

router.route('/')
.get(function(req , res)
{
	DBMain.get_article( "Hotel125" , res.locals.lang , function(err, CA)
	{		
		if(CA == null)
		{		
			res.render("stuff/notTranslated");
			return;
		}
		else
		{
			let title = CA.Title;
			res.render("departments/tourism/article",
			{
				art: CA,
				title: title
			});
		}
	});
});

module.exports = router;
