"use strict";

// Functions

function getArticleListName(cbf)
{
	$.ajax
	({
		url: '/' + lang + '/panel/article/WS/articlesList',
		type: 'POST',
		success: function (res)
		{
			if( res == '-1' )
			{
				// hadeaghal etelaat
				// URLNameDanger();
			}
			else if( res )
			{
				// URLNameSuccess();
				cbf(res);
			}
		},
		error: function(JXHR , status , err)
		{
			console.log("#Ajax. Error in getNodeInf post request. message: %s" , err);
		}
	});
}

function getArticle(pageName, pageLang, cbf)
{
	$.ajax
	({
		url: '/' + lang + '/panel/article/WS/getArticle',
		type: 'POST',
		data:
		{
			pageName: pageName,
			pageLang: pageLang
		},
		success: function (res)
		{
			if( res == '-1' )
			{
				// hadeaghal etelaat
				// URLNameDanger();
			}
			else if( res )
			{
				// URLNameSuccess();
				cbf(res);
			}
		},
		error: function(JXHR , status , err)
		{
			console.log("#Ajax. Error in getNodeInf post request. message: %s" , err);
		}
	});
}

function getDepList(cbf)
{
	$.ajax
	({
		url: '/web_services/getDepList',
		type: 'POST',
		success: function (res)
		{
			if( res == '-1' )
			{
				// hadeaghal etelaat
				// URLNameDanger();
			}
			else if( res )
			{
				// URLNameSuccess();
				cbf(res);
			}
		},
		error: function(JXHR , status , err)
		{
			console.log("#Ajax. Error in getNodeInf post request. message: %s" , err);
		}
	});
}
