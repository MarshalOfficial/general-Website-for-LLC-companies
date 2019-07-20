"use strict";

let DBMain = require(consV.methods.db.main);
let middlewares = require( consV.methods.middlewares);
let express = require("express");
let async = require('async');
let router = express.Router({mergeParams: true});

router.route('/')
.get(function(req , res)
{
	DBMain.get_article( 'canada' , res.locals.lang , function(err, CA)
	{				
		let title = 'مهاجرت به کانادا';
		res.render("departments/legal/canada",
		{
			art: CA,
			title: title
		});
	});
});

module.exports = router;
