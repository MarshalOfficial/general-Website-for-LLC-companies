"use strict";

let DBProfile = require( consV.methods.db.profile );
let middlewares = require( consV.methods.middlewares);
let express = require("express");
var async = require('async');
var router = express.Router({mergeParams: true});

router.route('/')
.get(async function(req , res)
{
	let title = "گزارش ورود و خروج ها";
	res.render("myaccount/reports/InOut" ,
	{
		title: title
	});
});

module.exports = router;
