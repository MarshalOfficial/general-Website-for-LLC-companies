"use strict";

let DBProfile = require( consV.methods.db.profile );
let middlewares = require( consV.methods.middlewares);
let express = require("express");
var async = require('async');
var router = express.Router({mergeParams: true});

router.route('/')
.get(async function(req , res)
{
	let title = "تنظیم دسترسی ها";
	res.render("myaccount/permissions" ,
	{
		title: title
	});
});

module.exports = router;
