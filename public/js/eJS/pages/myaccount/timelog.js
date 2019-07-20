"use strict";

var logId;

$(window).bind("load", function()
{
	$(document).ready(function()
	{
		logId = 0;
		// modal
		setDefaultMmodal('در حال پردازش');
		// tabs
		$('.nav-tabs a[href="#rep-tabCon"]').on('show.bs.tab', function ()
		{
			logId = 0;
			printReportLogs();
		});
		$('.nav-tabs a[href="#reg-tabCon"]').on('show.bs.tab', function ()
		{
			$('#logIdForm').val(logId);
			userTimeLogReport({logId:logId}, function (result)
			{				
				fillTimeLogForm(result[0]);
				
			});
			
		});
		// remove disabled
		$('.nav-tabs .nav-item .disabled').removeClass('disabled');
		$("a[href='#rep-tabCon']").tab('show');
	});
});

function userTimeLogReport(data, cbf)
{
	$.ajax
	({
		url: '<%=consV.webApi.reportTimeLog%>',
		type: 'POST',
		data: data,
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

function deleteTimeLog(ev, cbf)
{
	ev.preventDefault();
	let el = $(ev.target);
	$('#MModal').modal({show:true});
	$.ajax
	({
		url: '<%=consV.webApi.deleteTimeLog%>',
		type: 'POST',
		data:
		{
			id: el.data("id")
		},
		success: function (res)
		{			
			if( res == "<%=consV.codes.db.success%>" )
			{
				successMmodal("با موفقیت حذف شد");
				cbf();
			}
			else if( res == "<%=consV.codes.db.Error%>" )
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

function postTimeLogForm(ev)
{
	ev.preventDefault();
	var form = $(ev.target);
	$('#MModal').modal({show:true});
	$.ajax
	({
		url: form.attr('action'),
		type: 'POST',
		data: $(form).serialize(),		success: function (res)
		{
			if( res == "<%=consV.codes.db.success%>" )
			{
				successMmodal("با موفقیت ثبت شد");
			}
			else if( res == "<%=consV.codes.db.Error%>" )
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

function setRepList(list)
{
	$('#rep-tabCon .container').html('');	
	list.forEach( (element,i) =>
	{
		var html = '<div class="card card-nav-tabs">';
		html += `<h4 class="card-header card-header-info text-right rtlDir">${element.Title} <span class="float-left">${element.SaveDate}</span></h4>`;
		html += `<div class="card-body">`;
		html += `<p class="card-text text-right rtlDir">${element.Memo}</p>`;
		html += `<button type="button" class="btn btn-primary col-3 ml-3 d-inline-block float-right" data-id='${element.ID}' onclick='deleteTimeLog(event,printReportLogs);'>حذف</button>`;
		html += `<button type="button" class="btn btn-success col-3 ml-auto d-inline-block float-right" data-id='${element.ID}' onclick='setLogId(event);'">ویرایش</button>`;
		html += `</div>`;
		html += `</div>`;
		$('#rep-tabCon .container').append(html);
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