"use strict";

// Events
$(window).bind("load", function()
{
	$(document).ready(function()
	{
		// modal
		setDefaultMmodal('در حال پردازش');

		// edit tab
		$('.nav-tabs a[href="#edit"]').on('show.bs.tab', function ()
		{
			getArticleListName(function (res)
			{
				setArtPageName(res)
				updateForm();
			});
		});
		// remove disabled
		$('.nav-tabs .nav-item .disabled').removeClass('disabled');
		$("a[href='#edit']").tab('show');
	});
});

// Functions

function updateForm()
{
	getArticle(getArtPageName(), getArtPageLang(), function (art)
	{
		getDepList(function (result)
		{
			setDepList(result);
			setCreEdiArtFromData(art);
		});
	});
}

function placeFormlangChanged()
{
	var artLang = $('#placeFormlang').val();

	$('#URLName').val(artItem.URLName);

	encTree( $('#artPageName').val(), "root", 4, function (res)
	{
		createPlaceNodeTree(res, 'EncTree', artLang, artItem);
	});
}
function placeFormEncChanged()
{
	$('#nodePlaceInput').val("");
	placeFormlangChanged();
}