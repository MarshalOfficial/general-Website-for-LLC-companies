$(document).ready(function()
{
	setDefaultMmodal('در حال پردازش');
});

function ResgisterRecForm(ev)
{
	ev.preventDefault();
	$('#MModal').modal('show');
	let form = ev.target;
	let formData = new FormData( $(form)[0] );

	$.ajax
	({
		url: $(form).attr('action'),
		type: 'POST',
		processData: false,
		contentType: false,
		data: formData,
		tryCount: 0,
		tryLimit: 3,
		success: function (res)
		{
			if( res == "-6" )
			{
				failMmodal("اطلاعات حداقل پر نشده است");
			}
			else if( res )
			{
				successMmodal("فرم شما ثبت و به منابع انسانی ارسال شد. با شما تماس گرفته میشود");
			}
			else
			{
				failMmodal("Something is wrong");
			}
		},
		error: function(JXHR , status , err)
		{
			if(status == "timeout")
			{				
				this.tryCount++;
				if(this.tryCount <= this.tryLimit)
				{
					$.ajax(this);
					return;
				}
				else
				{
					failMmodal("سرور بار زیادی دارد لطفا بعدا امتحان کنید");
				}
			}
			else
			{
				failMmodal("Something is wrong");
			}
		},
		timeout: 10000
	});
}

// function SiteLawChanged(ev)
// {
// 	console.log($("#SiteLaw").prop("checked"));
	
// 	if( $("#SiteLaw").prop("checked") )
// 	{
// 		$("#submotBut").prop('disabled' , false)
// 	}
// 	else if( $("#SiteLaw").prop("checked") == false)
// 	{
// 		$("#submotBut").prop('disabled' , true)
// 	}
// }
