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
	DBMain.get_article( 'recruitment' , res.locals.lang , function(err, art)
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
			let title = 'استخدام و همکاری';
			res.render("departments/human_resources/recruitment",
			{
				article : art,
				title: title,
				imageAdd: "https://company.org/articles/achievement-3656071_640.jpg"
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
			if(req.files.file == "" || req.files.file == undefined)
			{
				// res.send( consV.codes.lackOfInformation.toString() );
				callback(null);
			}
			else
			{
				callback(null);
			}
		},
		function (callback)
		{
			if(req.files.imageFile != undefined)
			{
				req.files.imageFile.name = chancedName + req.files.imageFile.name;
				space.copyFile(consV.space.cv, req.files.imageFile.name, req.files.imageFile.data ,function (err, res)
				{
					req.body.ImgUrl = consV.space.cv + req.files.imageFile.name;
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
			if(req.files.file != undefined)
			{
				req.files.file.name = chancedName + req.files.file.name;
				space.copyFile(consV.space.cv, req.files.file.name, req.files.file.data ,function (err, res)
				{
					req.body.ResumeURL = consV.space.cv + req.files.file.name;
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
			DBMain.setRecruitmentRequest(req.body, function(err , info)
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
