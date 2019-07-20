"use strict";

let DBMain = require(consV.methods.db.main);
let middlewares = require(consV.methods.middlewares);
let express = require("express");
let async = require('async');
let router = express.Router({mergeParams: true});

// router.route('*/:portalName/*') u can splite the params that is not splited here by this way
router.route('*')
.all(function(req , res)
{
	let portalName = req.params[4];	
	async.parallel
	([
		function (callback)
		{
			DBMain.get_article( portalName , res.locals.lang , function(err, CA)
			{				
				callback(err , CA);
			});
		},
		function (callback)
		{
			DBMain.slideshowInf({Page: portalName, Lang: res.locals.lang}, function(err, doc)
			{
				if(err || doc.length == 0)
				{
					console.error( new Error( `#SlideShow Problem. err=${err}`) );
					callback(err || true);
				}
				else
				{					
					callback(err , doc);
				}
			});
		},
		function (callback)
		{
			DBMain.getMlementsInfo(portalName, res.locals.lang, function(err, mElements)
			{
				callback(null , mElements);
			});

			// let mElements =
			// [
			// 	{
			// 		melementText: 'وبلاگ',
			// 		url: consV.links.weblog,
			// 		faIcon: 'fab fa-blogger',
			// 		BGColor: '#620099'
			// 	}
			// ];
		}
	],
	function (err , results)
	{
		if(err)
		{
			res.render(consV.pages.underConstruction);
			return;
		}
		else
		{
			res.render("portals/home" ,
			{
				title: consV.site.title,
				slideshows: results[1],
				CA: results[0] || null,
				portalName: portalName,
				mElements: results[2]
			});
		}
	});
});

module.exports = router;
