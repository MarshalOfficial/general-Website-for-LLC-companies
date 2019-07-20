
function setCreEdiArtFromData(artItem)
{	
	let artLang = $('#artPageLang').val();

	$('#spaceFolderAddress').val("articles/");
	$('#treeTitle').val(artItem.Title);	
	if(typeof artItem.summary != "undefined")
	{
		$('#summary').val(artItem.summary[artLang]);
	}
	else
	{
		$('#summary').val("");
	}

	$('#tags').importTags("");
	artItem.Tag = artItem.Tag.split(" ");
	if(typeof artItem.Tag != 'undefined' && artItem.Tag != null)
	{
		artItem.Tag.forEach(function(el , index)
		{
			$('#tags').addTag(el);
		});
	}

	if(typeof artItem.Content == 'undefined')
	{
		tinyMCE.activeEditor.setContent('');
	}
	else
	{
		tinyMCE.activeEditor.setContent(artItem.Content || "");
	}
	$('#articleVideoUrl').val(artItem.VideoUrl || "");
	$('#artDepartment').val(artItem.DepartmentID).prop('selected' , true);
}

function setSpaceFolderName(name)
{
	$('#spaceFolderName').val(name);
}

function setArtSpaceAddress(add)
{
	$('#spaceFolderAddress').val(add);
}

function setArtTreeTitle(ti)
{
	$('#treeTitle').val(ti);
}

function setDepList(deps)
{
	deps.forEach( (element,i) =>
	{
		$('#artDepartment').append($('<option>', {value: element.ID, text: element.Title }));
	});
}

function setArtTags(tags)
{
	$('#tags').importTags("");
	if(typeof tags != 'undefined' && tags != null)
	{
		tags.forEach(function(el , index)
		{
			$('#tags').addTag(el);
		});
	}
}

function setArtCon(Con)
{
	if(typeof Con == 'undefined' || Con == null)
	{
		tinyMCE.activeEditor.setContent('');
	}
	else
	{
		tinyMCE.activeEditor.setContent(Con);
	}
}

function getFromLang()
{
	return $('#artPageLang').val();
}

function CEAFSendFile(ev)
{
	let form = ev.target;
	let formData = new FormData( $(form)[0] );
	ev.preventDefault();
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
			if(res == "-10")
			{
				top.$('.mce-btn.mce-open').parent().find('.mce-textbox').val('Error. SomeThing Is Wrong');
			}
			else if( res )
			{
				top.$('.mce-btn.mce-open').parent().find('.mce-textbox').val(res);
			}
		},
		error: function(JXHR , status , err)
		{
			failMmodal("احتمال خطا از مرورگر شما");
		}
	});
}

function getArtPageName()
{
	return $('#artPageName').val();
}

function getArtPageLang()
{
	return $('#artPageLang').val();
}

function setArtPageName(arts)
{
	var newArts = [];
	arts.forEach(element =>
	{
		if(newArts.indexOf(element.PageName) == -1)
		{
			newArts.push(element.PageName);
		}
	});	
	newArts.forEach( (element,i) =>
	{
		$('#artPageName').append($('<option>', {value:element, text:element }));
	});
}