"use strict";

let DBProfile = require( consV.methods.db.profile );
let middlewares = require( consV.methods.middlewares);
let express = require("express");
var async = require('async');
var router = express.Router({mergeParams: true});

router.route('/')
.get(async function(req , res)
{
	// let user = await DBProfile.userInfoById(req.session.user._id);		
	let title = "GWLC ثبت و گزارش عملکرد";
	res.render("myaccount/timelog" ,
	{
		// user: user,
		title: title
	});
});

module.exports = router;
