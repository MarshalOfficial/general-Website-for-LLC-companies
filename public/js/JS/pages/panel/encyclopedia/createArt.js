"use strict";

// Events
$(window).bind("load", function()
{
	$(document).ready(function()
	{
		// modal
		setDefaultMmodal('در حال پردازش');
		
		setSpaceFolderName(artItem.spaceFolderName);
		setArtSpaceAddress("articles/"+artItem.spaceFolderName);
	});
});