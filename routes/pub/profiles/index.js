"use strict";

let DBMain = require(consV.methods.db.main);
let DBProfile = require( consV.methods.db.profile );
let middlewares = require(consV.methods.middlewares);
let express = require("express");
let async = require('async');
let router = express.Router({mergeParams: true});

// router.route('*/:FullName/*') u can splite the params that is not splited here by this way
router.route('*')
.all(function(req , res)
{
	let FullName = req.params[3].replace(/^\/+/g , '');
	FullName = FullName.split("-");
	
	async.parallel
	([
		function (callback)
		{			
			DBProfile.GetEmployeePubicProfile( FullName , res.locals.lang , function(err, CA)
			{
				callback(err , CA);
			});
		}
	],
	function (err , results)
	{
		if(err)
		{			
			if(results[0] == undefined)
			{
				res.status(404).render(consV.pages.notFound);
			}
			else
			{
				res.render(consV.pages.underConstruction);
			}
			return;
		}
		else
		{
			results[0].ImgAddress = consV.space.profilePic + results[0].ImgAddress; 
			let Title = FullName.join(' ') + ' - ' + consV.site.title ;
			
			res.render("pub/profiles/index.ejs" ,
			{
				title: Title ,
				info: results[0] || null,
				FullName: FullName.join(' '),
			});
		}
	});
});

module.exports = router;
