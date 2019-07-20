"use strict";

let DBMain = require(consV.methods.db.main);
let middlewares = require(consV.methods.middlewares);
let express = require("express");
let async = require('async');
let router = express.Router({mergeParams: true});

router.route('/')
.all(function(req , res)
{
	async.parallel
	([
		function (callback)
		{
			DBMain.get_article( 'main' , res.locals.lang , function(err, CA)
			{				
				callback(err , CA);
			});
		},
		function (callback)
		{
			DBMain.slideshowInf({Page: "main", Lang: res.locals.lang}, function(err, doc)
			{
				if(err)
				{
					console.error( new Error( `#SlideShow Problem. err=${err}`) );
					callback(err);
				}
				else
				{
					callback(err , doc);
				}
			});
		}
	],
	function (err , results)
	{
		if(err)
		{
			res.status(500).render('stuff/500');
			return;
		}
		else
		{
			res.render("home" ,
			{
				title: consV.site.title,
				slideshows: results[1],
				CA: results[0] || null
			});
		}
	});
});

module.exports = router;
