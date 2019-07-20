"use strict";

$(window).bind("load", function()
{
	$(document).ready(function()
	{
		// modal
		setDefaultMmodal('در حال پردازش');
		// client status
		getClientFullStatus(function (result)
		{
			console.log(result);
			if(result != -2)
			{
				fillThead(result);
				fillTr(result);
			}
			else if(result == -2)
			{
				$("#requestCard").empty();
			}
			
		});
	});
});

function fillTr(data)
{
	$("#table_container_content").html('');
	data.forEach((element,i) =>
	{
		var htmlTable = `<div class="tab-pane active" id="tab${element.ServiceID}">`;
		$("#table_container_content").append($(htmlTable));
		var po = `#tab${element.ServiceID}`;
		htmlTable += `<table class="table rtlDir" id="table${element.ServiceID}">
								<thead class="text-warning text-right thead-light">
									<tr>
										<th>وضعیت</th>
										<th>مرحله</th>
										<th>پیام</th>
									</tr>
								</thead>`;
		htmlTable += `<tbody id="tbody${element.ServiceID}">`;
		// $(`"table${element.ServiceID}"`).append($(htmlTable));
		// console.log(element , element.ServiceRequestStepLogs);
		if(element.ServiceRequestStepLogs != null)
		{
			element.ServiceRequestStepLogs.forEach((el,j) =>
			{
				// console.log('if' , el.Priority , element.Priority);
				if(el.Priority-1 <= element.Priority && el.Priority+1 >= element.Priority)
				{
					if(el.Priority == element.Priority)
					{
						htmlTable += `<tr class="table-info">`;
					}
					else
					{
						htmlTable += `<tr>`;
					}
					htmlTable += `<td>`;										
					if(el.StatusID == 2)
					{
						htmlTable += `<i class="fab fa-accusoft text-warning Font1d25rem mr-3"></li>`;
					}
					else if(el.StatusID == 1)
					{
						htmlTable += `<i class="fas fa-circle-notch text-black Font1d25rem mr-3"></li>`;
					}
					else
					{
						htmlTable += `<i class="fas fa-check text-success"></li>`;
					}
					htmlTable += `</td>
										<td><a href="${el.Url}">${el.StepTitle}</a></td>
										<td class="td-actions text-right rtlDir">
											${el.StatusTitle}
										</td>
									</tr>`;
				}
			});
			htmlTable += `</tbody></table></div>`;
			$(po).append($(htmlTable));
		}
	});
}

function fillThead(data)
{
	$('#tableServicesTHead').html('');
	data.forEach((element,i) =>
	{
		var html = `<li class="nav-item mr-3 ml-2">
					<a class="nav-link `;
					if(i == 0)
					{
						html += ' active ';
					}
			html += `pl-4" href="#tab${element.ServiceID}" data-toggle="tab">
						<i class="fas fa-cannabis"></i>${element.ServiceTitle}
						<div class="ripple-container"></div>
					</a>
				</li>`;
		$('#tableServicesTHead').append($(html));
	});

}

function childeNoChanged(ev)
{
	
}

function getClientFullStatus(cbf)
{
	$.ajax
	({
		url: "/web_services/getClientFullStatus",
		type: 'POST',
		success: function (res)
		{			
			if( res == "-2" )
			{
				failMmodal("خطای داخلی سیستم، در اسرع وقت سیستم درست میشود. متاسفیم");
			}
			else if(res == "-5")
			{
				failMmodal("شما مجوز ویرایش این درخواست را ندارید");
			}
			if( res )
			{
				cbf(res)
			}
		},
		error: function(JXHR , status , err)
		{
			failMmodal("احتمال خطا از مرورگر شما");
		}
	});
}