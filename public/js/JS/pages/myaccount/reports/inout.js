"use strict";

let userId = null;
let FromDate = null;
let ToDate = null;

$(window).bind("load", function()
{
	$(document).ready(function()
	{
		// modal
		setDefaultMmodal('در حال پردازش');
		// tabs
		$('.nav-tabs a[href="#tabUsers"]').on('show.bs.tab', function ()
		{
			GetAllEmployee(function (result)
			{
				fillTrUsers(result);
			});
		});
		$('.nav-tabs a[href="#tabReport"]').on('show.bs.tab', function ()
		{
			GetEmployeesInoutManagedReport(function (result)
			{
				console.log(result);	
				fillTrReport(result);
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
						<thead class="text-warning text-center thead-light">
							<tr>
								<th>ایمیل</th>
								<th>نام</th>
								<th>شماره</th>
								<th>نقش</th>
								<th>انتخاب</th>
							</tr>
						</thead>`;
	htmlTable += `<tbody id="tbodyUsers">`;
	data.forEach((el,i) =>
	{
		htmlTable += `<tr>`;
		htmlTable += `<td class="text-center rtlDir">`;
		htmlTable += `<div class="FontIranSans">${el.Email}</div>`;
		htmlTable += `</td>
							<td class="text-center rtlDir">
								<div class="FontIranSans">${el.FullName}</div>
							</td>
							<td class="text-center rtlDir">
								<div class="FontIranSans">${el.Mobile}</div>
							</td>
							<td class="text-center rtlDir">
								<div class="FontIranSans">${el.RoleName}</div>
							</td>
							<td class="text-center rtlDir">
								<button type="submit" class="btn btn-primary pull-right" onclick="userSelected(${el.ID});">انتخاب</button>
							</td>

						</tr>`;
	});
	htmlTable += `</tbody></table></div>`;
	$(po).append($(htmlTable));
}

function fillTrReport(data)
{
	$("#table_container_content").html('');
	// var userInfo = `<`;data[0]

	var htmlTable = `<div class="tab-pane active" id="tabReport">`;
	htmlTable += `<div class="row">
		<div class="col-md-3">
			<div class="form-group">
				<label class="bmd-label-floating">از</label>
				<input id="FromDate" name="FromDate" type="date" value="${moment().startOf('month').format("YYYY-MM-DD")}" class="form-control">
			</div>
		</div>
		<div class="col-md-3">
			<div class="form-group">
				<label class="bmd-label-floating">تا</label>
				<input id="ToDate" name="ToDate" type="date" value="${moment().endOf('month').format("YYYY-MM-DD")}" class="form-control">
			</div>
		</div>
		<div class="col-md-3 mt-auto">
			<div class="form-group">
				<button type="submit" class="btn btn-primary w-100" onclick="DoFilter(event);">فیلتر</button>
			</div>
		</div>
	</div>`;
	$("#table_container_content").append($(htmlTable));
	var po = `#tabReport`;
	htmlTable = `<table class="table rtlDir" id="tableAccess">
						<thead class="text-warning text-center thead-light">
							<tr>
								<th>تاریخ</th>
								<th>روز</th>
								<th>صحت ورود و خروج</th>
								<th>صحت مکانی</th>
								<th>ساعت کاری</th>
							</tr>
						</thead>`;
	htmlTable += `<tbody id="tbodyAccess">`;

	let SumAll = null;
	if(data != null)
	{
		SumAll = data[0].SumAll;
		data.forEach((el,j) =>
		{
			htmlTable += `<tr>`;

			htmlTable += `<td class="text-center">
								${moment(el.Date).format("MM/DD/YYYY")}
							  </td>`;

 			htmlTable +=`<td class="text-center">
								${el.DayName}
							 </td>`;
			if(el.IsCorrect == false)
			{
				htmlTable +=`<td class="text-center table-danger">
									No
								</td>`;
			}
			else if(el.IsCorrect == true)
			{
				htmlTable +=`<td class="text-center table-success">
									Yes
								 </td>`;
			}
			if(el.IsLocationCorrect == false)
			{
				htmlTable +=`<td class="text-center table-danger">
									No
								</td>`;
			}
			else if(el.IsLocationCorrect == true)
			{
				htmlTable +=`<td class="text-center table-success">
									Yes
								 </td>`;
			}

			htmlTable +=`<td class="text-center table-success">
									${(el.SumDay/60.0).toFixed(2)}
								 </td>`;
		});
	}
	htmlTable += `</tbody></table>`;
	htmlTable += `<div class="rtlDir text-right mr-5">مجموع ساعات کاری: ${(SumAll/60).toFixed(2)}</div>
	</div>`;

	$(po).append($(htmlTable));
}

function GetAllEmployee(cbf)
{
	$.ajax
	({
		url: "/web_services/GetAllEmployee",
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

function UpdateServiceRequestStep(data)
{
	$.ajax
	({
		url: "/web_services/UpdateServiceRequestStep",
		type: 'POST',
		data: data,
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
				// cbf(res)
			}
		},
		error: function(JXHR , status , err)
		{
			failMmodal("احتمال خطا از مرورگر شما");
		}
	});
}

function GetEmployeesInoutManagedReport(cbf)
{
	$.ajax
	({
		url: "/web_services/GetEmployeesInoutManagedReport",
		type: 'POST',
		data:
		{
			EmployeeID: userId,
			FromDate: $('#FromDate').val() || moment().startOf('month').format("YYYY-MM-DD"),
			ToDate: $('#ToDate').val() || moment().endOf('month').format("YYYY-MM-DD")
		},
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

function userSelected(id)
{
	userId = id;
	$("a[href='#tabReport").tab('show');
}

function DoFilter(ev)
{
	GetEmployeesInoutManagedReport(function (result)
	{
		fillTrReport(result);
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
