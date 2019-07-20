"use strict";

$(window).bind("load", function()
{
	$(document).ready(function()
	{
		// modal
		setDefaultMmodal('در حال پردازش');
		
		getAllServices(function (result)
		{
			setServicesUI(result);			
		});
			
		// remove disabled
		$('.nav-tabs .nav-item .disabled').removeClass('disabled');
		$("a[href='#rep-tabCon']").tab('show');
	});
});

function getAllServices(cbf)
{
	$.ajax
	({
		url: '<%=consV.webApi.getAllServices%>',
		type: 'POST',
		success: function (res)
		{
			if( res )
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

function setServices(ev)
{
	ev.preventDefault();
	var form = $(ev.target);
	$('#MModal').modal({show:true});
	$.ajax
	({
		url: form.attr('action'),
		type: 'POST',
		data: $(form).serialize(),
		success: function (res)
		{
			if( res == "<%=consV.codes.db.success%>" )
			{
				successMmodal("با موفقیت ثبت شد");
			}
			else if( res == "<%=consV.codes.db.Error%>" )
			{
				failMmodal("خطای داخلی سیستم، در اسرع وقت سیستم درست میشود. متاسفیم");
			}
			else if(res == "<%=consV.codes.notAllowed%>")
			{
				failMmodal("شما مجوز ویرایش این درخواست را ندارید");
			}
		},
		error: function(JXHR , status , err)
		{
			failMmodal("احتمال خطا از مرورگر شما");
		}
	});
}

function setServicesUI(list)
{
	$('#requestCheckboxList').html('');	
	list.forEach( (element,i) =>
	{
		var html = '<div class="form-check">';
		html += `<label class="form-check-label">`;
		html += `<input `;
		if(element.HasService == "true")
		{
			html += ' checked ';
		}
		html += `class="form-check-input" type="checkbox" name="ServicesID" value="${element.ID}">${element.Title}`;
		html += `<span class="form-check-sign">`;
		html += `<span class="check ltrDir"></span>`;
		html += `</span></label></div>`;
		$('#requestCheckboxList').append(html);
	});
}

function printReportLogs()
{
	userTimeLogReport({}, function (res)
	{
		// console.log(res);
		setRepList(res);
	});
}

function setLogId(ev)
{
	ev.preventDefault();
	let el = $(ev.target);
	logId = el.data("id");
	$('.nav-tabs a[href="#reg-tabCon"]').tab('show');
}

function fillTimeLogForm(result)
{
	// console.log(result);
	if(logId == 0)
	{
		document.getElementById('timeLogFormDate').valueAsDate = new Date();
	}
	else
	{		
		document.getElementById('timeLogFormDate').valueAsDate = new Date(result.SaveDate);
	}

}