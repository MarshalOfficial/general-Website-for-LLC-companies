$(document).ready(function()
{
	$.get("<%=consV.pages.helper.userRegion%>", function response(ipLang)
	{
		var ti = '<span id="remSign" class="fa fa-times fa-pull-right cursorPointer" onclick="hideLanPop()"></span>';
		var dontShowAgain = {};

		dontShowAgain.en = "<div class='ltrDir'><a id='dontShowLanPop' href='#' onclick='dontShowLanPopAgain()'>Dont show this again</a></div>";
		dontShowAgain.fa = "<div class='rtlDir'><a id='dontShowLanPop' href='#' onclick='dontShowLanPopAgain()'>این پیام رو دیگه نیار</a></div>";
		dontShowAgain.ge = "<div class='rtlDir'><a id='dontShowLanPop' href='#' onclick='dontShowLanPopAgain()'>ეს შეტყობინება არ აჩვენე</a></div>";
		dontShowAgain.ru = "<div class='rtlDir'><a id='dontShowLanPop' href='#' onclick='dontShowLanPopAgain()'>این پیام رو دیگه نیار</a></div>";
		if( ipLang != lang )
		{
			if(ipLang == 'fa' && lang != 'fa')
			{
				$('#lanPop').attr('data-original-title', ti + "&nbsp&nbsp به دنبال صفحه ی فارسی هستید؟");
				$('#lanPop').attr('data-content', `<p><a href="${altPage.fa}">زبان رو به فارسی تغییر بده</a></p>` + dontShowAgain[lang]);
				$('#lanPop').popover('show');
			}
			else if(ipLang == 'ge' && lang != 'ge')
			{
				$('#lanPop').attr('data-original-title', ti + "&nbsp&nbsp ვეძებთ ქართულ გვერდს?");
				$('#lanPop').attr('data-content', `<p><a href="${altPage.ge}">ენის შეცვლა ქართულად</a></p>` + dontShowAgain[lang]);
				$('#lanPop').popover('show');
			}
			else if( typeof dontGenAltPage == 'undefined' || (typeof dontGenAltPage != 'undefined' && dontGenAltPage['en'] != true) )
			{
				$('#lanPop').attr('data-original-title',` ${ti} Looking for page in English?&nbsp&nbsp&nbsp&nbsp`);
				$('#lanPop').attr('data-content', `<p><a href="${altPage.en}">Change to English</a></p>` + dontShowAgain[lang]);
				$('#lanPop').popover('show');
			}
		}
	}, 'json');
});
function hideLanPop()
{
	$('#lanPop').popover('hide');
}
function dontShowLanPopAgain()
{
	$.ajax
	({
		url: '<%=consV.links.lanPopShow%>',
		type: 'POST',
		success: function (res)
		{
			if( res == true )
			{
				$('#remSign').click();
			}
			else
			{
				console.log("#Ajax. Error in LanPopShow response");
			}
		},
		error: function(JXHR , status , err)
		{
			console.log(`#Ajax. Error in LanPopShow post request. message: ${err}`);
		}
	});	
}