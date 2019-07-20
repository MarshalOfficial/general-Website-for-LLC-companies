"use strict";

let DBProfile = require( consV.methods.db.profile );
let middlewares = require( consV.methods.middlewares);
let express = require("express");
var async = require('async');
var router = express.Router({mergeParams: true});

router.route('/')
.get(async function(req , res)
{
	let title = "ثبت درخواست در ای ام جی";
	res.render("myaccount/services" ,
	{
		title: title
	});
});

module.exports = router;
