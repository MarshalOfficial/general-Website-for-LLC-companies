let fs = require('fs');
let mkdirp = require('mkdirp');

/************************* In JS *************************/

Array.prototype.diff = function (a)
{
	return this.filter(function (i)
	{
		return a.indexOf(i) < 0;
	});
}

Array.prototype.remove = function (elem)
{
	let index = this.findIndex(el => el === elem);
	while( index != -1)
	{
		this.splice(index , 1);
		index = this.findIndex(el => el === elem);
	}
	return this;
}
/************************* Helper Functions *************************/

exports.createFile = function createFile(fullFileAddress, data)
{
	fs.writeFile(fullFileAddress , data, function (err)
	{
		if(err)
		{
			if(err.code == 'ENOENT')
			{
				console.error( new Error(`#Space. Can not save file. message: ${err}`.red) );
			}
			let sliced_address = fullFileAddress.slice(0, fullFileAddress.lastIndexOf('/'));
			mkdirp(sliced_address, (err) =>
			{
				createFile(fullFileAddress, data)
			});
		}
		else
		{
			console.log("#eJS. %s created.".yellow, fullFileAddress);
		}
	});
}

exports.directoryListRecursive = function DLR(dir, fileList)
{
	if(dir[dir.length-1] != '/')
	{
		dir += '/';
	}
	var files = fs.readdirSync(dir);
	fileList = fileList || [];
	files.forEach(function (file)
	{
		if(fs.statSync(dir + file).isDirectory())
		{
			fileList = DLR(dir + file + '/', fileList);
		}
		else
		{
			fileList.push(dir+file);
		}
	});
	return fileList;
}