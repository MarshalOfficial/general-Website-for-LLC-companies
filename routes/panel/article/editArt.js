"use strict";

let DBMain = require( consV.methods.db.main);
let middlewares = require( consV.methods.middlewares);
let express = require("express");
let async = require('async');
let router = express.Router({mergeParams: true});

router.use(middlewares.CheckUpArAccess);

router.route('/')
.get(function(req , res)
{
	let title = 'پنل GWLC صفحه ی اصلی';
	res.render("panel/article/editArt",
	{
		title: title
	});
})
router.route('/')
.post(function (req , res)
{
	let formVars = req.body;
	
	if(formVars.artPageLang == "" || typeof formVars.artPageLang == "undefined")
	{
		res.send( consV.codes.lackOfInformation.toString() );
		return;
	}

	async.series
	([
		function (callback)
		{			
			DBMain.updatePageArt(formVars, req.session.user.ID , function(err, art)
			{
				callback(err , art);
			});
		}
	],
	function (err , result)
	{
		if(err)
		{
			res.send( consV.codes.db.Error.toString() );
		}
		else
		{
			res.json( result[0] );
		}
	});
});


module.exports = router;
