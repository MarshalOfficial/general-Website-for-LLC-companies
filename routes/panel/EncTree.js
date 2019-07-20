"use strict";

var DBArticles = require( consV.methods.db.articles);
let DBMain = require( consV.methods.db.main);
var space = require( consV.methods.space );
let middlewares = require( consV.methods.middlewares);
let express = require("express");
var async = require('async');
var router = express.Router({mergeParams: true});



router.route('/')
.post(function (req , res)
{
	let formVars = req.body;	
	if( formVars.nodeId == "root")
	{
		formVars.nodeId = DBMain.root_id_by_coll_name(formVars.enc);
	}
	if(err)
	{
		res.send( consV.codes.db.Error.toString() );
	}
	else
	{
		res.json( result[0] );
	}
});

module.exports = router;
