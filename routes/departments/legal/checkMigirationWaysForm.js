"use strict";

let DBMain = require(consV.methods.db.main);
let middlewares = require( consV.methods.middlewares);
let express = require("express");
let async = require('async');
let router = express.Router({mergeParams: true});
let space = require( consV.methods.space );
let Chance = require("chance");

router.route('/')
.get(function(req , res)
{
	DBMain.get_article( 'checkMigirationWaysForm' , res.locals.lang , function(err, art)
	{
		if(err)
		{
			res.status(500).render('stuff/500');
			return;
		}
		else if(art == null)
		{
			res.render("stuff/notTranslated");
			return;
		}
		else
		{
			let title = 'فرم ارزیابی راه های مهاجرت';
			res.render("departments/legal/checkMigirationWaysForm",
			{
				article : art,
				title: title,
				imageAdd: "https://company.org/articles/gulls-540791_640.jpg"
			});
		}
	});
})
.post(function(req , res)
{
	let chance = new Chance();
	let chancedName = chance.hash();

	async.series
	([
		function (callback)
		{			
			if(req.files.file != undefined)
			{
				req.files.file.name = chancedName + req.files.file.name;
				space.copyFile(consV.space.cv, req.files.file.name, req.files.file.data ,function (err, res)
				{
					req.body.CV = consV.space.cv + req.files.file.name;
					callback(err);
				});
			}
			else
			{
				callback(null);
			}
		},
		function (callback)
		{
			DBMain.InsertMigrationRequest(req.body, function(err)
			{
				callback(err);
			});
		}
	],
	function (err, results)
	{
		if( err )
		{
			console.error( new Error("#error: ".red + err) );
			if(results[0] == true || results[1] == true)
			{
				res.send( consV.codes.lackOfInformation.toString() );
			}
			else
			{
				res.send( consV.codes.db.Error.toString() );
			}
		}
		else
		{
			res.send( consV.codes.db.success.toString() );
		}
	});
});
module.exports = router;
