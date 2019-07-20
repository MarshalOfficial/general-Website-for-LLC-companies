
function setSlideShowFromData(Item)
{
	$('#slideShowFormImg').attr('src' , '/' + Item.ImgAddress);
	if(Item.ImgAlt != null && Item != undefined)
	{
		let alts = Item.ImgAlt.split(" ");
		$('#slideShowFormImageAlt1').val(alts[0]);
		$('#slideShowFormImageAlt2').val(alts[1]);
		$('#slideShowFormImageAlt3').val(alts[2]);
	}
	$('#slideShowFormTitle').val(Item.Title || "");
	$('#slideShowFormUrl').val(Item.Url || "");
	$('#slideID').val(Item.ID || 0);
	
}

function getSlideShowFormPage()
{
	return $('#slideShowFormPage').val();
}
function getSlideShowFormSN()
{
	return $('#slideShowFormSN').val();
}
function getSlideShowFormLang()
{
	return $('#slideShowFormLang').val();
}

function setSlidesPagesNames(arts)
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
		$('#slideShowFormPage').append($('<option>', {value:element, text:element }));
	});
}

function setSlidesTitles(arts)
{	
	var newArts = [];
	arts.forEach(element =>
	{
		if(newArts.indexOf(element.Title) == -1)
		{
			newArts.push(element.Title);
		}
	});
	$('#slideShowFormSN').html('');	
	newArts.forEach( (element,i) =>
	{
		$('#slideShowFormSN').append($('<option>', {value:element, text:element }));
	});
}