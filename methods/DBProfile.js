"use strict";

let database = require(consV.methods.db.main);
let async = require('async');

exports.signUp = function signUp(data , cbf)
{
	let sqlSer = database.GetConnSync();
	let result = sqlSer.execute
	({
		procedure: "GWLCSignUp",
		params:
		{
			Email:
			{
				type: sqlSer.NVARCHAR,
				val: data.email
			},
			Password:
			{
				type: sqlSer.NVARCHAR,
				val: data.password
			},
			Mobile:
			{
				type: sqlSer.NVARCHAR,
				val: data.phoneNumber
			}
		}
	}).then(function (resu)
	{
		
		if ( resu[0][0][0].Result != "Fail" )
		{
			resu[0][0][0].Permissions = resu[0][0][0].Permissions.split(' ');
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

exports.GetEmployeePubicProfile = function GetEmployeePubicProfile(FullName, Lang, cbf)
{	
	let sqlSer = database.GetConnSync();	
	let result = sqlSer.execute
	({
		procedure: "GWLCGetEmployeePubicProfile",
		params:
		{
			FirstName:
			{
				type: sqlSer.NVARCHAR,
				val: FullName[0]
			},
			LastName:
			{
				type: sqlSer.NVARCHAR,
				val: FullName[1]
			}
		}
	}).then(function (resu)
	{
		if ( resu[0][0][0] != undefined && resu[0][0][0].Result != "Fail" )
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

exports.ClientInfoByID = function ClientInfoByID(ID, cbf)
{	
	let sqlSer = database.GetConnSync();	
	let result = sqlSer.execute
	({
		procedure: "GWLCGetClient",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: ID
			},
			ID:
			{
				type: sqlSer.INT,
				val: ID
			}
		}
	}).then(function (resu)
	{		
		if ( resu[0][0][0].Result != "Fail" )
		{
			resu[0][0][0].Permissions = resu[0][0][0].Permissions.split(' ');
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

exports.userInfoByEmOrUN = function userInfoByEmOrUN(emUs, password, cbf)
{	
	let sqlSer = database.GetConnSync();	
	let result = sqlSer.execute
	({
		procedure: "GWLCLoginClients",
		params:
		{
			UserName:
			{
				type: sqlSer.NVARCHAR,
				val: emUs
			},
			Password:
			{
				type: sqlSer.NVARCHAR,
				val: password
			}
		}
	}).then(function (resu)
	{		
		if ( resu[0][0][0].Result != "Fail" )
		{
			resu[0][0][0].Permissions = resu[0][0][0].Permissions.split(' ');
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

exports.adInfoByEmOrUN = function adInfoByEmOrUN(emUs, password, cbf)
{	
	let sqlSer = database.GetConnSync();	
	let result = sqlSer.execute
	({
		procedure: "GWLCLoginEmployees",
		params:
		{
			UserName:
			{
				type: sqlSer.NVARCHAR,
				val: emUs
			},
			Password:
			{
				type: sqlSer.NVARCHAR,
				val: password
			}
		}
	}).then(function (resu)
	{
		if ( resu[0][0][0].Result != "Fail" )
		{
			resu[0][0][0].Permissions = resu[0][0][0].Permissions.split(' ');
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

exports.editClientInfo = function editClientInfo(data, userId , cbf)
{
	let datastring = JSON.stringify(data);	
	let sqlSer = database.GetConnSync();	
	let result = sqlSer.execute
	({
		procedure: "GWLCUpdateClient",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.NVARCHAR,
				val: userId
			},
			ID:
			{
				type: sqlSer.NVARCHAR,
				val: userId
			},
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

exports.getClientFullStatus = function getClientFullStatus(ID , cbf)
{	
	let sqlSer = database.GetConnSync();	
	let result = sqlSer.execute
	({
		procedure: "GWLCGetClientFullStatus",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: ID
			},
			ClientID:
			{
				type: sqlSer.NVARCHAR,
				val: ID
			}
		}
	}).then(function (resu)
	{		
		if ( resu[0][0][0] != undefined && resu[0][0][0].Result != "Fail" )
		{
			cbf( null , resu[0][0] );
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

exports.getAllServices = function getAllServices(data , cbf)
{	
	let sqlSer = database.GetConnSync();	
	let result = sqlSer.execute
	({
		procedure: "GWLCGetAllServices",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.NVARCHAR,
				val: data.ID
			},
			ClientID:
			{
				type: sqlSer.NVARCHAR,
				val: data.ID
			}
		}
	}).then(function (resu)
	{
		if ( resu[0][0][0].Result != "Fail" )
		{
			cbf( null , resu[0][0] );
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

exports.setServices = function setServices(data, ID, cbf)
{
	let datastring = JSON.stringify(data);
	let sqlSer = database.GetConnSync();	
	let result = sqlSer.execute
	({
		procedure: "GWLCUpdateServiceRequests",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: ID
			},
			ClientID:
			{
				type: sqlSer.INT,
				val: ID
			},
			EmployeeID:
			{
				type: sqlSer.INT,
				val: ID
			},
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

exports.GetAllClients = function GetAllClients(cbf)
{
	let sqlSer = database.GetConnSync();
	let result = sqlSer.execute
	({
		procedure: "GWLCGetAllClients",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: 0
			}
		}
	}).then(function (resu)
	{
		if ( resu[0][0][0].Result != "Fail" )
		{
			cbf( null , resu[0][0] );
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

exports.GetEmployeesInoutManagedReport = function GetEmployeesInoutManagedReport(data, cbf)
{	
	let sqlSer = database.GetConnSync();
	let result = sqlSer.execute
	({
		procedure: "GWLCGetEmployeesInoutManagedReport",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: 0
			},
			EmployeeID:
			{
				type: sqlSer.NVARCHAR,
				val: data.EmployeeID
			},
			FromDate:
			{
				type: sqlSer.NVARCHAR,
				val: data.FromDate
			},
			ToDate:
			{
				type: sqlSer.NVARCHAR,
				val: data.ToDate
			}
		}
	}).then(function (resu)
	{		
		if ( resu[0][0][0] != undefined && resu[0][0][0].Result != "Fail" )
		{
			cbf( null , resu[0][0] );
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

exports.GetPermissionStatus = function GetPermissionStatus(data, cbf)
{	
	let sqlSer = database.GetConnSync();
	let result = sqlSer.execute
	({
		procedure: "GWLCGetPermissionStatus",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: 0
			},
			EmployeeID:
			{
				type: sqlSer.NVARCHAR,
				val: data.EmployeeID
			},
			ClientID:
			{
				type: sqlSer.NVARCHAR,
				val: data.ClientID
			}
		}
	}).then(function (resu)
	{		
		if ( resu[0][0] != undefined && resu[0][0][0].Result != "Fail" )
		{
			cbf( null , resu[0][0] );
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

exports.RemovePermission = function RemovePermission(data, cbf)
{	
	let sqlSer = database.GetConnSync();
	let result = sqlSer.execute
	({
		procedure: "GWLCRemovePermission",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: 0
			},
			EmployeeID:
			{
				type: sqlSer.NVARCHAR,
				val: data.EmployeeID
			},
			ClientID:
			{
				type: sqlSer.NVARCHAR,
				val: data.ClientID
			},
			PermID:
			{
				type: sqlSer.NVARCHAR,
				val: data.PermID
			}
		}
	}).then(function (resu)
	{		
		if ( resu[0][0] != undefined && resu[0][0][0].Result != "Fail" )
		{
			cbf( null , resu[0][0] );
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

exports.AddPermission = function AddPermission(data, cbf)
{	
	let sqlSer = database.GetConnSync();
	let result = sqlSer.execute
	({
		procedure: "GWLCAddPermission",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: 0
			},
			EmployeeID:
			{
				type: sqlSer.NVARCHAR,
				val: data.EmployeeID
			},
			ClientID:
			{
				type: sqlSer.NVARCHAR,
				val: data.ClientID
			},
			PermID:
			{
				type: sqlSer.NVARCHAR,
				val: data.PermID
			}
		}
	}).then(function (resu)
	{		
		if ( resu[0][0] != undefined && resu[0][0][0].Result != "Fail" )
		{
			cbf( null , resu[0][0] );
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

exports.UpdateServiceRequestStepStatus = function UpdateServiceRequestStepStatus(data, cbf)
{	
	let sqlSer = database.GetConnSync();
	let result = sqlSer.execute
	({
		procedure: "GWLCUpdateServiceRequestStepStatus",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: 0
			},
			StepID:
			{
				type: sqlSer.NVARCHAR,
				val: data.StepID
			},
			StatusID:
			{
				type: sqlSer.NVARCHAR,
				val: data.StatusID
			},
			RequestID:
			{
				type: sqlSer.NVARCHAR,
				val: data.RequestID
			}
		}
	}).then(function (resu)
	{		
		if ( resu[0][0] != undefined && resu[0][0][0].Result != "Fail" )
		{
			cbf( null , resu[0][0] );
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

exports.UpdateServiceRequestStep = function UpdateServiceRequestStep(data, cbf)
{	
	let sqlSer = database.GetConnSync();
	let result = sqlSer.execute
	({
		procedure: "GWLCUpdateServiceRequestStep",
		params:
		{
			OperatorUserID:
			{
				type: sqlSer.INT,
				val: 0
			},
			StepID:
			{
				type: sqlSer.NVARCHAR,
				val: data.StepID
			},
			RequestID:
			{
				type: sqlSer.NVARCHAR,
				val: data.RequestID
			}
		}
	}).then(function (resu)
	{		
		if ( resu[0][0] != undefined && resu[0][0][0].Result != "Fail" )
		{
			cbf( null , resu[0][0] );
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