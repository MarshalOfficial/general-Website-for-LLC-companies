"use strict";

// Events
$(window).bind("load", function()
{
	$(document).ready(function()
	{
		getSlideShowPagesList(function (res)
		{
			setSlidesPagesNames(res);
			updateSlideShowFormByPageChange();
		});
		// modal
		setDefaultMmodal('در حال پردازش');
	});
});


// Functions

function getSlideShowPagesList(cbf)
{
	$.ajax
	({
		url: '<%=consV.webApi.slideShowPagesList%>',
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

function updateSlideShowFormByPageChange()
{	
	getSlideShowInfo({Page: getSlideShowFormPage(), Lang: getSlideShowFormLang()}, function (res)
	{
		setSlidesTitles(res);
		updateSlideShowForm();
	});
}

function updateSlideShowForm()
{	
	getSlideShowInfo({Page: getSlideShowFormPage(), Lang: getSlideShowFormLang(), Title: getSlideShowFormSN()}, function (res)
	{
		setSlideShowFromData(res[0]);
	});
}


function getSlideShowInfo(data, cbf)
{
	$.ajax
	({
		url: '<%=consV.webApi.getSlideShow%>',
		type: 'POST',
		data: data,
		success: function (res)
		{
			if( res == "<%=consV.codes.lackOfInformation%>" )
			{
				console.log("اطلاعات حداقل پر نشده است");
			}
			else if( res == "<%=consV.codes.db.Error%>" )
			{
				console.log("خطای داخلی سیستم، در اسرع وقت سیستم درست میشود. متاسفیم");
			}
			else if(res)
			{
				cbf(res);
			}
		},
		error: function(JXHR , status , err)
		{
			console.log(`#Ajax. Error in getSlideShowInfo get request. message: ${err}`);
		}
	});
}

function postSlideShowInfo(ev)
{
	$('#MModal').modal('show');
	ev.preventDefault();

	let form = ev.target;
	let formData = new FormData( $(form)[0] );

	$.ajax
	({
		url: $(form).attr('action'),
		type: 'POST',
		enctype: 'multipart/form-data',
		processData: false,
		contentType: false,
		// cache: false,
		data: formData,
		success: function (res)
		{
			if( res == "<%=consV.codes.lackOfInformation%>" )
			{
				failMmodal("اطلاعات حداقل پر نشده است");
			}
			else if(res == "<%=consV.codes.db.Error%>")
			{
				failMmodal("خطای داخلی سیستم، در اسرع وقت سیستم درست میشود. متاسفیم");
			}
			else if(res)
			{
				successMmodal("با موفقیت ثبت شد");
			}
		},
		error: function(JXHR , status , err)
		{
			failMmodal("احتمال خطا از مرورگر شما");
		}
	});
}