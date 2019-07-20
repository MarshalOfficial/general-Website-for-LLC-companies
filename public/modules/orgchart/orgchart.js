$(document).ready(function()
{
	var orgChart = new getOrgChart(document.getElementById("people"),
	{
		// theme: "monica",
		linkType: "B",
		renderNodeEvent: renderNodeHandler,
		primaryFields: ["name" , "title" , "mail", "CustomHtmlLI", "CustomHtmlT"],
		photoFields: ["image"],
		// enableMove: false,
		enableEdit: false,
		enableZoom: false,
		enableSearch: false,
		enableZoomOnNodeDoubleClick: false,
		enableExportToImage: false,
		enableGridView: false,
		enableDetailsView: false,
		expandToLevel: false,
		scale: 0.55,
		// boxSizeInPercentage:
		// {
		// 	minBoxSize:
		// 	{
		// 		width: 5,
		// 		height: 5
		// 	},
		// 	boxSize:
		// 	{
		// 		width: 20,
		// 		height: 20
		// 	},
		// 	maxBoxSize:
		// 	{
		// 		width: 1,
		// 		height: 100
		// 	}
		// },
		// levelSeparation: 200,
		// secondParentIdField: "secondManager",
		// seperationMixedHierarchyNodes: 200,
		// gridView: false,
		// layout: getOrgChart.MIXED_HIERARCHY_RIGHT_LINKS,
		dataSource:
		[
			// {
			// 	id: 1, parentId: null, name: "هیئت موسس", title: "", image: "/orgchart/conference.jpg"
			// },
			{
				id: 2, parentId: 1, name: "محمد بروجردی", title: "CO-Founder & CEO",
				CustomHtmlLI: "<div class='socialMedia'><a href='https://www.linkedin.com/in/mohammad-broujerdi/' class='fab fa-linkedin'></a></div>",
				CustomHtmlT: "<div class='socialMedia'><a href='https://t.me/drbroujerdi_IMG' class='fab fa-telegram'></a></div>",
				mail: "drmbroujerdi@gmail.com", image: "/orgchart/dr.jpg"
			},
			{
				id: 3, parentId: 1, name: "بهاره جعفریان", title: "CO-Founder",
				CustomHtmlLI: "<div class='socialMedia'><a href='https://www.linkedin.com/in/bahareh-jafarian/' class='fab fa-linkedin'></a></div>",
				CustomHtmlT: "<div class='socialMedia'><a href='https://t.me/Bahar_jafarian' class='fab fa-telegram'></a></div>",
				mail: "drbaharehjafarian@gmail.com", image: "/orgchart/bj.jpg"
			},
			// {
			// 	id: 4, parentId: 1, name: "هیئت مدیره", image: "/orgchart/hook.jpg"
			// },
			{
				id: 5, parentId: 2, name: "محمد مرامی", title: "B Of D & Sport Department Manager", 
				CustomHtmlLI: "<div class='socialMedia'><a href='https://www.linkedin.com/in/sifu' class='fab fa-linkedin'></a></div>",
				CustomHtmlT: "<div class='socialMedia'><a href='https://t.me/Sifu_Marami' class='fab fa-telegram'></a></div>",
				mail: "sifu.marami@yahoo.com", image: "/orgchart/sifu.jpg"
			},
			{
				id: 6, parentId: 7, name: "مسعود قربانزاده", title: "Computer Department Manager",
				CustomHtmlLI: "<div class='socialMedia'><a href='https://www.linkedin.com/in/mlibre' class='fab fa-linkedin'></a></div>",
				CustomHtmlT: "<div class='socialMedia'><a href='https://t.me/mlibre' class='fab fa-telegram'></a></div>",
				mail: "m.gh@linuxmail.org", image: "/orgchart/mlibre.jpg"
			},
			{
				id: 7, parentId: 2, name: "سایر دپارتمانها", title: "Other Departments",
				mail: "", image: "/orgchart/businessmen.jpg"
			},
			{
				id: 8, parentId: 2, name: "محسن بلالی", title: "marketing Manager",
				CustomHtmlLI: "<div class='socialMedia'><a href='https://www.linkedin.com/in/mohsen-balali/' class='fab fa-linkedin'></a></div>",
				CustomHtmlT: "<div class='socialMedia'><a href='https://t.me/norobiz' class='fab fa-telegram'></a></div>",
				mail: "norobizz@gmail.com", image: "/orgchart/mohsen.jpeg"
			},
			{
				id: 10, parentId: 2, name: "محمد تقی بسطامی", title: "Food And Medicine",
				CustomHtmlLI: "<div class='socialMedia'><a href='https://www.linkedin.com/in//' class='fab fa-linkedin'></a></div>",
				CustomHtmlT: "<div class='socialMedia'><a href='https://t.me/' class='fab fa-telegram'></a></div>",
				mail: "test@test.com", image: ""
			},
			{
				id: 9, parentId: 7, name: "...", title: "Real Estate Assistant",
				CustomHtmlLI: "<div class='socialMedia'><a href='https://www.linkedin.com/in//' class='fab fa-linkedin'></a></div>",
				CustomHtmlT: "<div class='socialMedia'><a href='https://t.me/' class='fab fa-telegram'></a></div>",
				mail: "test@test.com", image: ""
			},
			{
				id: 11, parentId: 7, name: "محمد حسین خاکی", title: "Building & Facilities Department Manager",
				CustomHtmlLI: "<div class='socialMedia'><a href='https://www.linkedin.com/in//' class='fab fa-linkedin'></a></div>",
				CustomHtmlT: "<div class='socialMedia'><a href='https://t.me/' class='fab fa-telegram'></a></div>",
				mail: "test@test.com", image: ""
			},
			{
				id: 12, parentId: 7, name: "حسام الدین بروجردی", title: "Legal Department Manager",
				CustomHtmlLI: "<div class='socialMedia'><a href='https://www.linkedin.com/in//' class='fab fa-linkedin'></a></div>",
				CustomHtmlT: "<div class='socialMedia'><a href='https://t.me/' class='fab fa-telegram'></a></div>",
				mail: "test@test.com", image: ""
			}

		],
		customize:
		{
			"1": { color: "green" },
			"2": { color: "mediumdarkblue" },
			"3": { color: "darkred" },
			"4": { color: "neutralgrey" },
			"5": { color: "neutralgrey" },
			"6": { color: "neutralgrey" },
			"7": { color: "blue" },
			"8": { color: "neutralgrey" },
			"9": { color: "neutralgrey" },
			"10": { color: "neutralgrey" },
			"11": { color: "neutralgrey" },
			"12": { color: "neutralgrey" }
		}
	});
	function renderNodeHandler(sender, args)
	{
		for(i = 0; i < args.content.length; i++)
		{
			if( args.content[i].indexOf(args.node.data["CustomHtmlLI"]) != -1)
			{
				args.content[i] = "<foreignObject x='210' y='75' width='10' height='10'>" + args.node.data["CustomHtmlLI"] + "</foreignObject>";
			}
			if( args.content[i].indexOf(args.node.data["CustomHtmlT"]) != -1)
			{
				args.content[i] = "<foreignObject x='260' y='75' width='10' height='10'>" +
				args.node.data["CustomHtmlT"] + "</foreignObject>";
			}
		}
	}
});