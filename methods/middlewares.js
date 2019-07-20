"use strict";

let i18n = require('i18n');
let DBArticles = require( consV.methods.db.articles);
let async = require('async');


function isSessCreated(req , res , next)
{
	if( typeof req.session == 'undefined')
	{
		// res.redirect('/');
		// next(new Error('Access denied.'.red));
		console.log(new Error('Session has not been created'.red));
	}
	next();
}

//**************** Permision & Access ****************\\
function CheckLogedIn(req , res , next)
{
	let sess = req.session;
	if( sess.logged != true)
	{
		res.redirect('/' + res.locals.lang + consV.pages.signIn);
		next(new Error('Access denied.'.red));
	}
	next();
}

function CheckHelperAccess(req , res , next)
{
	let sess = req.session;
	if( sess.user.Permissions.indexOf('helpers') == -1 )
	{
		res.redirect('/' + res.locals.lang);
		next(new Error('Access denied.'.red));
	}
	next();
}

function CheckPanelAccess(req , res , next)
{
	let sess = req.session;	
	if( sess.user.Permissions.indexOf('UserPanel') == -1 )
	{
		res.redirect('/' + res.locals.lang);
		next(new Error('Access denied.'.red));
	}
	next();
}

function CheckSpaceAccess(req , res , next)
{
	let sess = req.session;
	if( sess.user.Permissions.indexOf('Space') == -1 )
	{
		res.redirect('/' + res.locals.lang);
		next(new Error('Access denied.'.red));
	}
	next();
}

function CheckUpArAccess (req , res , next)
{
	let sess = req.session;
	async.series
	([
		function (callback)
		{
			if( sess.user.Permissions.indexOf('Root') != -1 )
			{
				callback(true , 'root');
			}
			else
			{
				callback(null);
			}
		},
		function (callback)
		{
			if( sess.user.Permissions.update_art != true )
			{
				res.send( consV.codes.notAllowed.toString() );
				callback(true);
			}
			else
			{
				callback(null);
			}
		},
		function (callback)
		{
			DBArticles.check_editPerm_by_spaceFName(sess.user._id,
			req.body.spaceFolderName, function (err, perm)
			{
				if(err)
				{
					res.send( consV.codes.db.Error.toString() );
				}
				else if(perm == false)
				{
					err = true;
					res.send( consV.codes.notAllowed.toString() );
				}
				callback(err);
			});
		}
	],
	function (err , result)
	{
		if(err)
		{
			if(result == 'root')
			{
				next();
			}
			else
			{
				next(new Error('Access denied.'.red));
			}
		}
		else
		{
			next();
		}
	});
}

function CheckUploadFFArAccess (req , res , next)
{
	let sess = req.session;
	async.series
	([
		function (callback)
		{
			if( sess.user.Permissions.root == true )
			{
				callback(true , 'root');
			}
			else
			{
				callback(null);
			}
		},
		function (callback)
		{
			let splite = req.body.spaceFolderAddress.match(/[^\/]+/ig);
			let spaceFolderName= splite[splite.length-1];
			DBArticles.check_editPerm_by_spaceFName(sess.user._id,
			spaceFolderName, function (err, perm)
			{
				if(err)
				{
					res.send( consV.codes.db.Error.toString() );
				}
				else if(perm == false)
				{
					err = true;
					res.send( consV.codes.notAllowed.toString() );
				}
				callback(err);
			});
		}
	],
	function (err , result)
	{
		if(err)
		{
			if(result == 'root')
			{
				next();
			}
			else
			{
				next(new Error('Access denied.'.red));
			}
		}
		else
		{
			next();
		}
	});
}

function CheckCrArAccess(req , res , next)
{
	let sess = req.session;
	if( sess.user.Permissions.indexOf('Root') == -1 && sess.user.Permissions.indexOf('create_art') == -1 )
	{
		res.redirect('/' + res.locals.lang);
		next(new Error('Access denied.'.red));
	}
	next();
}

exports.CheckRootAccess = function CheckRootAccess(req , res , next)
{
	let sess = req.session;
	if( sess.user.Permissions.indexOf('Root') == -1 )
	{
		res.redirect('/' + res.locals.lang);
		next(new Error('Access denied.'.red));
	}
	next();
}

exports.modifyServicePermission = function modifyServicePermission(req , res , next)
{
	
	let sess = req.session;
	if( sess.user.Permissions.indexOf('ModifyServiceRequest') == -1 )
	{
		res.send( consV.codes.notAllowed.toString() );
		next(new Error('Access denied.'.red));
	}
	next();
}

exports.modifyProfilePermission = function modifyProfilePermission(req , res , next)
{
	let sess = req.session;
	if( sess.user.Permissions.indexOf('EditProfile') == -1 )
	{
		res.send( consV.codes.notAllowed.toString() );
		next(new Error('Access denied.'.red));
	}
	next();
}

function CheckGlPlArAccess(req , res , next)
{
	let sess = req.session;
	if( sess.user.Permissions.place_art != true )
	{
		res.redirect('/' + res.locals.lang);
		next(new Error('Access denied.'.red));
	}
	next();
}

exports.CheckTransAccess = function CheckTransAccess(req , res , next)
{
	let sess = req.session;
	if( sess.user.Permissions.indexOf('Root') == -1 && sess.user.Permissions.indexOf('TranslateAccess') == -1 )
	{
		res.redirect('/' + res.locals.lang);
		next(new Error('Access denied.'.red));
	}
	next();
}

function CheckDlArAccess (req , res , next)
{
	let sess = req.session;
	if( sess.user.Permissions.delete_art != true )
	{
		res.redirect('/' + res.locals.lang);
		next(new Error('Access denied.'.red));
	}
	next();
}

function checkApArAccess(req , res , next)
{
	let sess = req.session;
	if( sess.user.Permissions.approve_art != true )
	{
		res.redirect('/' + res.locals.lang);
		next(new Error('Access denied.'.red));
	}
	next();
}

function checkAddResArAccess(req , res , next)
{
	let sess = req.session;
	if( sess.user.Permissions.add_res_art != true )
	{
		res.send( consV.codes.notAllowed.toString() );
		next(new Error('Access denied.'.red));
	}
	next();
}

exports.checkArticleListNameAccess =  function checkArticleListNameAccess(req , res , next)
{
	let sess = req.session;
	if( sess.user.Permissions.indexOf('ArticleListName') == -1 )
	{
		res.redirect('/' + res.locals.lang);
		next(new Error('Access denied.'.red));
	}
	next();
}

function checkPageStuffAccess(req , res , next)
{
	let sess = req.session;
	if( sess.user.Permissions.indexOf('Root') == -1 && sess.user.Permissions.indexOf('PagesStuff') == -1 )
	{
		res.redirect('/' + res.locals.lang);
		next(new Error('Access denied.'.red));
	}
	next();
}

function checkAdminStuffAccess(req , res , next)
{
	let sess = req.session;
	if( sess.user.Permissions.indexOf('Root') == -1 && sess.user.Permissions.admin_stuff != true )
	{
		res.redirect('/' + res.locals.lang);
		next(new Error('Access denied.'.red));
	}
	next();
}

//**************** Create & Set Useful Variables ****************\\
function CreLasUrs(req , res , next)
{
	let url = req.originalUrl;
	let splite = url.match(/[^\/]+/ig);
	res.locals.altPage = {};
	if(splite != null)
	{
		splite.splice(0 , 1);
		consV.site.langs.inArray.forEach( (el , index) =>
		{
			res.locals.altPage[el] = '/' + el + '/' + splite.join('/');
		});
	}
	next();
}

function CreLangVar(req , res , next)
{
	let url = req.originalUrl;
	let splite = url.match(/[^\/]+/ig);
	if(splite == null)
	{
		res.locals.lang = consV.site.langs.default;
	}
	else
	{
		res.locals.lang = splite[0];
	}
	next();
}

function SpSes(req , res , next)
{
	res.locals.sess = req.session;
	next();
}

function SpPIm(req , res , next)
{
	let crypto = require('crypto');
	res.locals.profileImage = 'https://www.gravatar.com/avatar/' +
	crypto.createHash('md5').update(req.session.user.Email).digest('hex')
	+ '?s=500';
	next();
}

//**************** Set Settings ****************\\
function setLocaleGlo(req , res , next)
{
	let url = req.originalUrl;
	let splite = url.match(/[^\/]+/ig);
	if(splite == null)
	{
		i18n.setLocale(consV.site.langs.default);
	}
	else
	{
		i18n.setLocale(splite[0]);
	}
	next();
}


exports.isSessCreated = isSessCreated;
exports.CheckLogedIn = CheckLogedIn;
exports.CheckHelperAccess = CheckHelperAccess;
exports.CheckPanelAccess = CheckPanelAccess;
exports.CheckSpaceAccess = CheckSpaceAccess;
exports.CheckUpArAccess = CheckUpArAccess;
exports.CheckUploadFFArAccess = CheckUploadFFArAccess;
exports.CheckCrArAccess = CheckCrArAccess;
exports.CheckGlPlArAccess = CheckGlPlArAccess;
exports.CheckDlArAccess = CheckDlArAccess;
exports.checkApArAccess = checkApArAccess;
exports.checkAddResArAccess = checkAddResArAccess;
exports.checkPageStuffAccess = checkPageStuffAccess;
exports.checkAdminStuffAccess = checkAdminStuffAccess;
exports.CreLasUrs = CreLasUrs;
exports.CreLangVar = CreLangVar;
exports.SpSes = SpSes;
exports.SpPIm = SpPIm;
exports.setLocaleGlo = setLocaleGlo;
