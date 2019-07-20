"use strict";

let express = require("express");
let router = express.Router({mergeParams: true});

router.route('/')
.get(function(req , res)
{
	let title = 'سرور. ای ام جی';
	res.render("panel/adminStuff/os",
	{
		title: title
	});
});

module.exports = router;
