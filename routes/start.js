"use strict";

let express = require("express");
let router = express.Router({mergeParams: true});

router.route('/')
.all(function(req , res)
{
	// if(typeof req.headers['cf-ipcountry'] != 'undefined' && req.headers['cf-ipcountry'] != 'XX')
	// {
	// 	if(req.headers['cf-ipcountry'] == 'GE')
	// 	{			
	// 		res.redirect('/' + consV.site.CoToLang[req.headers['cf-ipcountry']] + '/home');
	// 	}
	// 	else
	// 	{
	// 		res.redirect('/' + consV.site.langs.default + '/home');
	// 	}
	// }
	// else
	// {
		res.redirect('/' + consV.site.langs.default + '/home');
	// }
});

module.exports = router;