"use strict";

let userId = null;

$(window).bind("load", function()
{
	$(document).ready(function()
	{
		// modal
		setDefaultMmodal('در حال پردازش');
		// tabs
		$('.nav-tabs a[href="#tabUsers"]').on('show.bs.tab', function ()
		{
			GetAllClients(function (result)
			{
				fillTrUsers(result);
			});
		});
		$('.nav-tabs a[href="#tabPermissions"]').on('show.bs.tab', function ()
		{
			GetPermissionStatusClient(userId, function (result)
			{
				fillTrPermissions(result);
			});
		});
		$('.nav-tabs a[href="#tabAccess"]').on('show.bs.tab', function ()
		{
			getClientFullStatus(userId, function (result)
			{
				fillTrAccess(result);
			});
		});
		$("a[href='#tabUsers").tab('show');
	});
});

function fillTrUsers(data)
{
	$("#table_container_content").html('');

	var po = `#tabUsers`;
	var htmlTable = `<div class="tab-pane active" id="tabUsers">`;
	$("#table_container_content").append($(htmlTable));
	htmlTable = `<table class="table rtlDir" id="tableUsers">
						<thead class="text-warning text-right thead-light">
							<tr>
								<th>ایمیل</th>
								<th>نام</th>
								<th>شماره</th>
								<th>انتخاب</th>
							</tr>
						</thead>`;
	htmlTable += `<tbody id="tbodyUsers">`;
	data.forEach((el,i) =>
	{
		htmlTable += `<tr>`;
		htmlTable += `<td>`;
		htmlTable += `<div class="FontIranSans">${el.Email}</div>`;
		htmlTable += `</td>
							<td>
								<div class="FontIranSans">${el.FullName}</div>
							</td>
							<td class="text-right rtlDir">
								<div class="FontIranSans">${el.Mobile}</div>
							</td>
							<td class="text-right rtlDir">
								<button type="submit" class="btn btn-primary pull-right" onclick="userSelected(${el.ID});">انتخاب</button>
							</td>

						</tr>`;
	});
	htmlTable += `</tbody></table></div>`;
	$(po).append($(htmlTable));
}

function fillTrPermissions(data)
{
	$("#table_container_content").html('');

	var po = `#tabPermissions`;
	var htmlTable = `<div class="tab-pane active" id="tabPermissions">`;
	$("#table_container_content").append($(htmlTable));
	htmlTable = `<table class="table rtlDir" id="tablePermissions">
						<thead class="text-warning text-right thead-light">
							<tr>
								<th>مجوز</th>
								<th>توضیح</th>
								<th>وضعیت</th>
							</tr>
						</thead>`;
	htmlTable += `<tbody id="tbodyPermissions">`;
	data.forEach((el,i) =>
	{
		htmlTable += `<tr>`;
		htmlTable += `<td>`;
		htmlTable += `<div class="FontIranSans">${el.PermID}</div>`;
		htmlTable += `</td>
							<td>
								<div class="FontIranSans">${el.PermDesc}</div>
							</td>
							<td class="text-right rtlDir">
								<label class="switch">
									<input type="checkbox" ${el.HasPerm ? "checked" : ""} onclick="permissionChanged(event, '${el.PermID}');">
									<span class="slider round"></span>
								</label>
							</td>
						</tr>`;
	});
	htmlTable += `</tbody></table></div>`;
	$(po).append($(htmlTable));
}

function fillTrAccess(data)
{
	$("#table_container_content").html('');
	data.forEach((element,i) =>
	{
		var htmlTable = `<div class="tab-pane active" id="tabAccess">`;
		$("#table_container_content").append($(htmlTable));
		var po = `#tabAccess`;
		htmlTable = `<table class="table rtlDir" id="tableAccess">
								<thead class="text-warning text-right thead-light">
									<tr>
										<th>درخواست</th>
										<th>مرحله</th>
										<th>حالت</th>
										<th>اشاره</th>
									</tr>
								</thead>`;
		htmlTable += `<tbody id="tbodyAccess">`;
		if(element.ServiceRequestStepLogs != null)
		{
			element.ServiceRequestStepLogs.forEach((el,j) =>
			{
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
					htmlTable += `<td>${element.ServiceTitle}`;										
					htmlTable += `</td>
										<td>
											<a href="${el.Url}">${el.StepTitle}</a>
										</td>`;
					htmlTable += `<td class="td-actions text-right rtlDir">
										<select class="form-control" onchange="statusChanged(event)">`;
					element.ServiceStatus.forEach((el2,j) =>
					{
						if(el2.ID == el.StatusID)
						{
							htmlTable += `<option value="${el2.ID}" data-stepid="${el.StepID}" data-requestid="${el.RequestID}" selected>${el2.Title}</option>`;
						}
						else
						{
							htmlTable += `<option value="${el2.ID}" data-stepid="${el.StepID}" data-requestid="${el.RequestID}">${el2.Title}</option>`;
						}
					});
					htmlTable +=`</select></td>`;
					htmlTable += `<td class="text-right rtlDir">
											<button type="submit" class="btn btn-primary" data-stepid="${el.StepID}" data-requestid="${el.RequestID}" onclick="stepSelected(event);">انتخاب</button>
										</td></tr>`;
				}
			});
			htmlTable += `</tbody></table></div>`;
			$(po).append($(htmlTable));
		}
	});
}

function permissionChanged(ev, PermID)
{
	if(ev.target.checked == false)
	{
		RemovePermission(userId , PermID);
	}
	else if(ev.target.checked == true)
	{
		AddPermission(userId , PermID);
	}
}

function GetAllClients(cbf)
{
	$.ajax
	({
		url: "<%=consV.webApi.GetAllClients%>",
		type: 'POST',
		success: function (res)
		{
			if( res == "<%=consV.codes.db.Error%>" )
			{
				failMmodal("خطای داخلی سیستم، در اسرع وقت سیستم درست میشود. متاسفیم");
			}
			else if(res == "<%=consV.codes.notAllowed%>")
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

function GetPermissionStatusClient(ID, cbf)
{
	$.ajax
	({
		url: "<%=consV.webApi.GetPermissionStatus%>",
		type: 'POST',
		data:
		{
			ClientID: ID
		},
		success: function (res)
		{
			if( res == "<%=consV.codes.db.Error%>" )
			{
				failMmodal("خطای داخلی سیستم، در اسرع وقت سیستم درست میشود. متاسفیم");
			}
			else if(res == "<%=consV.codes.notAllowed%>")
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

function RemovePermission(userId, PermID)
{
	$.ajax
	({
		url: "<%=consV.webApi.RemovePermission%>",
		type: 'POST',
		data:
		{
			ClientID: userId,
			PermID: PermID
		},
		success: function (res)
		{
			if( res == "<%=consV.codes.db.Error%>" )
			{
				failMmodal("خطای داخلی سیستم، در اسرع وقت سیستم درست میشود. متاسفیم");
			}
			else if(res == "<%=consV.codes.notAllowed%>")
			{
				failMmodal("شما مجوز ویرایش این درخواست را ندارید");
			}
			if( res )
			{
				// cbf(res)
			}
		},
		error: function(JXHR , status , err)
		{
			failMmodal("احتمال خطا از مرورگر شما");
		}
	});
}

function AddPermission(userId, PermID)
{
	$.ajax
	({
		url: "<%=consV.webApi.AddPermission%>",
		type: 'POST',
		data:
		{
			ClientID: userId,
			PermID: PermID
		},
		success: function (res)
		{
			if( res == "<%=consV.codes.db.Error%>" )
			{
				failMmodal("خطای داخلی سیستم، در اسرع وقت سیستم درست میشود. متاسفیم");
			}
			else if(res == "<%=consV.codes.notAllowed%>")
			{
				failMmodal("شما مجوز ویرایش این درخواست را ندارید");
			}
			if( res )
			{
				// cbf(res)
			}
		},
		error: function(JXHR , status , err)
		{
			failMmodal("احتمال خطا از مرورگر شما");
		}
	});
}

function UpdateServiceRequestStepStatus(data)
{
	$.ajax
	({
		url: "<%=consV.webApi.UpdateServiceRequestStepStatus%>",
		type: 'POST',
		data: data,
		success: function (res)
		{
			if( res == "<%=consV.codes.db.Error%>" )
			{
				failMmodal("خطای داخلی سیستم، در اسرع وقت سیستم درست میشود. متاسفیم");
			}
			else if(res == "<%=consV.codes.notAllowed%>")
			{
				failMmodal("شما مجوز ویرایش این درخواست را ندارید");
			}
			if( res )
			{
				// cbf(res)
			}
		},
		error: function(JXHR , status , err)
		{
			failMmodal("احتمال خطا از مرورگر شما");
		}
	});
}

function UpdateServiceRequestStep(data)
{
	$.ajax
	({
		url: "<%=consV.webApi.UpdateServiceRequestStep%>",
		type: 'POST',
		data: data,
		success: function (res)
		{
			if( res == "<%=consV.codes.db.Error%>" )
			{
				failMmodal("خطای داخلی سیستم، در اسرع وقت سیستم درست میشود. متاسفیم");
			}
			else if(res == "<%=consV.codes.notAllowed%>")
			{
				failMmodal("شما مجوز ویرایش این درخواست را ندارید");
			}
			if( res )
			{
				// cbf(res)
			}
		},
		error: function(JXHR , status , err)
		{
			failMmodal("احتمال خطا از مرورگر شما");
		}
	});
}

function getClientFullStatus(ID, cbf)
{
	$.ajax
	({
		url: "<%=consV.webApi.getClientFullStatus%>",
		type: 'POST',
		data:
		{
			ID: ID
		},
		success: function (res)
		{			
			if( res == "<%=consV.codes.db.Error%>" )
			{
				failMmodal("خطای داخلی سیستم، در اسرع وقت سیستم درست میشود. متاسفیم");
			}
			else if(res == "<%=consV.codes.notAllowed%>")
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

function userSelected(id)
{
	userId = id;
	$("a[href='#tabPermissions").tab('show');
}

function statusChanged(ev)
{
	var el = $(ev.target).find(":selected");	
	UpdateServiceRequestStepStatus(
	{
		StepID: $(el).data("stepid"),
		StatusID: $(el).val(),
		RequestID: $(el).data("requestid")
	});
}

function stepSelected(ev)
{
	var el = $(ev.target);	
	UpdateServiceRequestStep(
	{
		StepID: $(el).data("stepid"),
		RequestID: $(el).data("requestid")
	});
}
