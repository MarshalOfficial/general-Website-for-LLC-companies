"use strict";

let DBMain = require( consV.methods.db.main );
let express = require("express");
let router = express.Router({mergeParams: true});

router.route('/')
.all(function(req , res)
{	
	let title = 'چارت سازمانی شرکت آی ام جی';
	res.render("orgchart",
	{
		title: title
	});
});

module.exports = router;
