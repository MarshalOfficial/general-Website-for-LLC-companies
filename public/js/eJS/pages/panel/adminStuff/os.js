"use strict";

// Events
$(window).bind("load", function()
{
	$(document).ready(function()
	{
		// modal
		setDefaultMmodal('در حال پردازش');
	});
});
function reboot()
{
	$.ajax
	({
		url: "<%=consV.webApi.rebootOs%>",
		type: 'POST',
		success: function (res)
		{
			if( res == "<%=consV.codes.lackOfInformation%>" )
			{
				failMmodal("اطلاعات حداقل پر نشده است");
			}
			else
			{
				failMmodal("خطای داخلی سیستم، در اسرع وقت سیستم درست میشود. متاسفیم");
			}
		},
		error: function(JXHR , status , err)
		{
			failMmodal("احتمال خطا از مرورگر شما");
		}
	});
}
