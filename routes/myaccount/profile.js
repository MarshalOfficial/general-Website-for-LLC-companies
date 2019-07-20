"use strict";

let DBProfile = require( consV.methods.db.profile );
let middlewares = require( consV.methods.middlewares);
let express = require("express");
var async = require('async');
var router = express.Router({mergeParams: true});

router.route('/')
.get(async function(req , res)
{	
	let title = "GWLC پروفایل شخصی";
	res.render("myaccount/profile" ,
	{
		user: req.session.user,
		title: title
	});
});

module.exports = router;
