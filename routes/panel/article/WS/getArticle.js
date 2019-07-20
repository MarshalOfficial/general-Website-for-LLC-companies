"use strict";

let DBMain = require( consV.methods.db.main);
let middlewares = require( consV.methods.middlewares);
let express = require("express");
let router = express.Router({mergeParams: true});

router.use(middlewares.checkArticleListNameAccess);

router.route('/')
.post(function (req , res)
{
	let formVars = req.body;	
	DBMain.get_article( formVars.pageName , formVars.pageLang , function(err, ar)
	{		
		if(err || (ar == null) )
		{
			res.send( consV.codes.db.Error.toString() );
		}
		else
		{
			res.json( ar );
		}
	});
});

module.exports = router;
