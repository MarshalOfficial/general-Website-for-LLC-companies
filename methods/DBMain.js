"use strict";

let sqlSer = require('seriate');
let async = require('async');
let ups = require('../UsPs');
let Chance = require('chance');

let db;

exports.db_connect = function db_connect(cbf)
{
	try
	{
		sqlSer.setDefaultConfig(ups.seriate.config);
	}
	catch (error)
	{
		console.log(error);
	}
	cbf();
}

exports.GetConnSync = function GetConnSync()
{
	return sqlSer;
}

exports.setRecruitmentRequest = function setRecruitmentRequest(data, cbf)
{
	let result = sqlSer.execute
	({
		procedure: "GWLCInsertEmploymentRequest",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: data.userID || "1"
			},
			CooperationField:
			{
				type: sqlSer.NVARCHAR,
				val: data.recruitment_CoField
			},
			Name:
			{
				type: sqlSer.NVARCHAR,
				val: data.recruitment_name
			},
			LastName:
			{
				type: sqlSer.NVARCHAR,
				val: data.recruitment_lastname
			},
			BirthDate:
			{
				type: sqlSer.NVARCHAR,
				val: data.recBD
			},
			Mobile:
			{
				type: sqlSer.NVARCHAR,
				val: data.recTel
			},
			Gender:
			{
				type: sqlSer.INT,
				val: data.sex
			},
			isMarried:
			{
				type: sqlSer.INT,
				val: data.isMarried
			},
			Email:
			{
				type: sqlSer.NVARCHAR,
				val: data.recMail
			},
			Nationality:
			{
				type: sqlSer.NVARCHAR,
				val: data.nationality
			},
			ImgUrl:
			{
				type: sqlSer.NVARCHAR,
				val: data.ImgUrl
			},
			EducationDegree:
			{
				type: sqlSer.NVARCHAR,
				val: data.EducationDegree
			},
			EducationField:
			{
				type: sqlSer.NVARCHAR,
				val: data.EducationField
			},
			HasIDCard:
			{
				type: sqlSer.NVARCHAR,
				val: data.HasIDCard
			},
			IDCardCredit:
			{
				type: sqlSer.NVARCHAR,
				val: data.IDCardCredit
			},
			ResidentType:
			{
				type: sqlSer.NVARCHAR,
				val: data.ResidentType
			},
			WantedPosition:
			{
				type: sqlSer.NVARCHAR,
				val: data.WantedPosition
			},
			HasRelatedSkill:
			{
				type: sqlSer.NVARCHAR,
				val: data.HasRelatedSkill
			},
			Skills:
			{
				type: sqlSer.NVARCHAR,
				val: data.Skills
			},
			Experience:
			{
				type: sqlSer.NVARCHAR,
				val: data.Experience
			},
			OtherExperience:
			{
				type: sqlSer.NVARCHAR,
				val: data.OtherExperience
			},
			PersianSkillValue:
			{
				type: sqlSer.INT,
				val: data.FaSkill
			},
			EnglishSkillValue:
			{
				type: sqlSer.INT,
				val: data.EnSkill
			},
			GeorgianSkillValue:
			{
				type: sqlSer.INT,
				val: data.GeSkill
			},
			RussianSkillValue:
			{
				type: sqlSer.INT,
				val: data.RuSkill
			},
			OtherLanguages:
			{
				type: sqlSer.NVARCHAR,
				val: data.OtherLanguages
			},
			Hobbies:
			{
				type: sqlSer.NVARCHAR,
				val: data.Hobbies
			},
			GoalsAndWishes:
			{
				type: sqlSer.NVARCHAR,
				val: data.GoalsAndWishes
			},
			VolunteerActivity:
			{
				type: sqlSer.NVARCHAR,
				val: data.VolunteerActivity
			},
			NoteToUs:
			{
				type: sqlSer.NVARCHAR,
				val: data.NoteToUs
			},
			Memo:
			{
				type: sqlSer.NVARCHAR,
				val: data.Memo
			},
			ResumeURL:
			{
				type: sqlSer.NVARCHAR,
				val: data.ResumeURL
			},
			LinkedInUrl:
			{
				type: sqlSer.NVARCHAR,
				val: data.LinkedInUrl
			},
			SiteLaw:
			{
				type: sqlSer.NVARCHAR,
				val: data.SiteLaw
			}
		}
	}).then(function (resu)
	{
		// console.log(resu[0][0]);
		cbf( null , resu[0][0] );
	})
	.catch(function (err)
	{
		console.error( new Error(`#Error. message: ${err}`.red) );
		cbf( err );
	});
}

exports.InsertMigrationRequest = function InsertMigrationRequest(data , cbf)
{
	let datastring = JSON.stringify(data);
	
	let result = sqlSer.execute
	({
		procedure: "GWLCInsertMigrationRequest",
		params:
		{
			Data:
			{
				type: sqlSer.NVARCHAR,
				val: datastring
			}

		}
	}).then(function (resu)
	{		
		if ( resu[0][0][0].Result != "Fail" )
		{
			cbf( null , resu[0][0][0] );
		}
		else
		{
			cbf( null , null );
		}
		
	})
	.catch(function (err)
	{
		console.error( new Error(`#Error. message: ${err}`.red) );
		cbf( err );
	});
}

exports.reportTimeLog = function reportTimeLog(data, cbf)
{	
	let result = sqlSer.execute
	({
		procedure: "GWLCReportEmployeeTimeLogs",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: data.userID
			},
			ID:
			{
				type: sqlSer.INT,
				val: data.logId
			},
			EmployeeID:
			{
				type: sqlSer.VARCHAR,
				val: data.userID
			},
			SaveDateFrom:
			{
				type: sqlSer.VARCHAR,
				val: data.date
			}
		}
	}).then(function (resu)
	{
		// console.log(resu[0][0]);
		cbf( null , resu[0][0] );
	})
	.catch(function (err)
	{
		console.error( new Error(`#Error. message: ${err}`.red) );
		cbf( err );
	});
}

exports.deleteTimeLog = function deleteTimeLog(id, cbf)
{
	let result = sqlSer.execute
	({
		procedure: "GWLCDeleteEmployeeTimeLog",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: id
			},
			ID:
			{
				type: sqlSer.INT,
				val: id
			}
		}
	}).then(function (resu)
	{
		// console.log(resu[0][0]);
		cbf( null , resu );
	})
	.catch(function (err)
	{
		console.error( new Error(`#Error. message: ${err}`.red) );
		cbf( err );
	});
}

exports.getSlideShowPageList = function getSlideShowPageList(cbf)
{
	let result = sqlSer.execute
	({
		procedure: "GWLCGetAllSliderImages",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: 1
			}
		}
	}).then(function (resu)
	{
		// console.log(resu[0][0]);
		cbf( null , resu[0][0] );
	})
	.catch(function (err)
	{
		cbf( err );
	});
}

exports.slideshowInf = function slideshowInf(data, cbf)
{	
	let result = sqlSer.execute
	({
		procedure: "GWLCGetAllSliderImages",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: 1
			},
			Page:
			{
				type: sqlSer.VARCHAR,
				val: data.Page
			},
			Lang:
			{
				type: sqlSer.VARCHAR,
				val: data.Lang
			},
			Title:
			{
				type: sqlSer.NVARCHAR,
				val: data.Title
			}
		}
	}).then(function (resu)
	{		
		// console.log(resu[0][0]);
		cbf( null , resu[0][0] );
	})
	.catch(function (err)
	{
		console.log(err);
		cbf( err );
	});
}

exports.get_article = function get_article(pageName, lang, cbf)
{
	let result = sqlSer.execute
	({
		procedure: "GWLCGetPageArticle",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: 1
			},
			Page:
			{
				type: sqlSer.VARCHAR,
				val: pageName
			},
			Lang:
			{
				type: sqlSer.VARCHAR,
				val: lang
			}
		}
	}).then(function (resu)
	{
		// console.log(resu[0][0]);
		cbf( null , resu[0][0][0] );
	})
	.catch(function (err)
	{
		console.error( new Error(`#Error. message: ${err}`.red) );
		cbf( err );
	});
}

exports.GetAllDepartments = function GetAllDepartments(cbf)
{
	let result = sqlSer.execute
	({
		procedure: "GWLCGetAllDepartments",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: 1
			}
		}
	}).then(function (resu)
	{
		// console.log(resu[0][0]);
		cbf( null , resu[0][0] );
	})
	.catch(function (err)
	{
		console.error( new Error(`#Error. message: ${err}`.red) );
		cbf( err );
	});
}

exports.GetAllEmployee = function GetAllEmployee(cbf)
{
	let result = sqlSer.execute
	({
		procedure: "GWLCGetAllEmployee",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: 1
			}
		}
	}).then(function (resu)
	{
		// console.log(resu[0][0]);
		cbf( null , resu[0][0] );
	})
	.catch(function (err)
	{
		console.error( new Error(`#Error. message: ${err}`.red) );
		cbf( err );
	});
}

exports.getPageArticles = function getPageArticles(cbf)
{
	let result = sqlSer.execute
	({
		procedure: "GWLCGetPageArticles",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: 1
			}
		}
	}).then(function (resu)
	{
		// console.log(resu[0][0]);
		cbf( null , resu[0][0] );
	})
	.catch(function (err)
	{
		console.error( new Error(`#Error. message: ${err}`.red) );
		cbf( err );
	});
}

exports.updatePageArt = function updatePageArt(formData , userId, cbf)
{
	let result = sqlSer.execute
	({
		procedure: "GWLCUpdatePageArticle",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: 1
			},
			PageName:
			{
				type: sqlSer.NVARCHAR,
				val: formData.artPageName
			},
			Title:
			{
				type: sqlSer.NVARCHAR,
				val: formData.treeTitle
			},
			Content:
			{
				type: sqlSer.NVARCHAR,
				val: formData.articleContent
			},
			Tag:
			{
				type: sqlSer.NVARCHAR,
				val: ""
			},
			Language:
			{
				type: sqlSer.NVARCHAR,
				val: formData.artPageLang
			},
			VideoUrl:
			{
				type: sqlSer.NVARCHAR,
				val: formData.articleVideoUrl
			},
			UserID:
			{
				type: sqlSer.NVARCHAR,
				val: userId
			},
			DepartmentID:
			{
				type: sqlSer.NVARCHAR,
				val: formData.artDepartment
			}
		}
	}).then(function (resu)
	{
		// console.log(resu[0][0]);
		cbf( null , resu[0][0][0] );
	})
	.catch(function (err)
	{
		console.error( new Error(`#Error. message: ${err}`.red) );
		cbf( err );
	});
}

exports.setSlideshowInf = function setSlideshowInf(ID, Page, Lang, SlideNumber, Alts, Title, Url, Image_add, cbf)
{	
	let result = sqlSer.execute
	({
		procedure: "GWLCUpdateSliderImage",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: 1
			},
			ID:
			{
				type: sqlSer.INT,
				val: ID
			},
			Page:
			{
				type: sqlSer.NVARCHAR,
				val: Page
			},
			Title:
			{
				type: sqlSer.NVARCHAR,
				val: Title
			},
			ImgAlt:
			{
				type: sqlSer.NVARCHAR,
				val: Alts
			},
			Lang:
			{
				type: sqlSer.NVARCHAR,
				val: Lang
			},
			ImgAddress:
			{
				type: sqlSer.NVARCHAR,
				val: Image_add
			},
			Url:
			{
				type: sqlSer.NVARCHAR,
				val: Url
			}
		}
	}).then(function (resu)
	{
		// console.log(resu[0][0]);
		cbf( null , resu[0][0][0] );
	})
	.catch(function (err)
	{
		console.error( new Error(`#Error. message: ${err}`.red) );
		cbf( err );
	});
}

exports.getMlementsInfo = function getMlementsInfo(data, Lang, cbf)
{
	let result = sqlSer.execute
	({
		procedure: "GWLCGetMElements",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: 1
			},
			Page:
			{
				type: sqlSer.NVARCHAR,
				val: data
			},
			Lang:
			{
				type: sqlSer.NVARCHAR,
				val: Lang
			}

		}
	}).then(function (resu)
	{
		// console.log(resu[0][0]);
		cbf( null , resu[0][0] );
	})
	.catch(function (err)
	{
		cbf( err );
	});
}