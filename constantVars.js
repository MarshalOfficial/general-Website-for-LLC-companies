"use strict";

let path = require('path');
let rootPath = path.resolve(__dirname);

/**************************** Host ****************************/
let host = {};

host.domain = 'healight.green';
// host.shop = "https://shop.healight.green";

exports.host = host;
/**************************** Web Site ****************************/
let site = {};

site.mail = "m.gh@linuxmail.org";
site.favicon = '/favicon.png';
site.logo = '/site/logo.png';
site.des = "Company Description";
site.title = "Website Title";

site.langs = {};

site.langs.default = 'en';

site.langs.fa = {};
site.langs.fa.name = 'فارسی';
site.langs.en = {};
site.langs.en.name = 'English';
site.langs.ru = {};
site.langs.ru.name = 'русский';
site.langs.ge = {};
site.langs.ge.name = 'ქართული';

site.langs.inArray = [];

Object.keys(site.langs).forEach(element => {	
	if(typeof site.langs[element].name != 'undefined')
	{
		site.langs.inArray = site.langs.inArray.concat(element);
	}
});

site.CoToLang = {};
site.CoToLang.GE = 'ge';
site.CoToLang.IR = 'fa';
site.CoToLang.RU = 'ru';

/**************************** Liceses ****************************/
site.googleVerificationCode = ''; // copy from google site
// Google Verification with file: Copy file to space/stuff
site.googleCustomSearchCode = "fdfdsfs"; // copy from google site
// Set Look And feel Config to Result only.
site.fontIranLicense = 'GDGDGDGDGDG';
site.disqusSrc = "httpisqus.com/embed.js"; //for single language enlgish encyclopedia

exports.site = site;
/**************************** Database Config****************************/
let database = {};

database.enc = {};

database.enc.tourism = {};
database.enc.tourism.CollName = "tourism";
database.enc.tourism.name = "tourism";
database.enc.tourism.title = "tourism";
database.enc.tourism.FALogo = "apple";

database.enc.education = {};
database.enc.education.CollName = "education";
database.enc.education.name = "education";
database.enc.education.title = "education";
database.enc.education.FALogo = "leaf";

database.enc.psychosos = {};
database.enc.psychosos.CollName = "psychosos";
database.enc.psychosos.name = "psychosos";
database.enc.psychosos.title = "psychosos";
database.enc.psychosos.FALogo = "apple";

database.enc.estate = {};
database.enc.estate.CollName = "estate";
database.enc.estate.name = "estate";
database.enc.estate.title = "estate";
database.enc.estate.FALogo = "pagelines";

database.enc.facilities = {};
database.enc.facilities.CollName = "facilities";
database.enc.facilities.name = "facilities";
database.enc.facilities.title = "facilities";
database.enc.facilities.FALogo = "pagelines";

database.enc.legal = {};
database.enc.legal.CollName = "legal";
database.enc.legal.name = "legal";
database.enc.legal.title = "legal";
database.enc.legal.FALogo = "apple";

database.enc.sport = {};
database.enc.sport.CollName = "sport";
database.enc.sport.name = "sport";
database.enc.sport.title = "sport";
database.enc.sport.FALogo = "thermometer";

database.enc.it = {};
database.enc.it.CollName = "it";
database.enc.it.name = "it";
database.enc.it.title = "it";
database.enc.it.FALogo = "heart";

database.enc.marketing = {};
database.enc.marketing.CollName = "marketing";
database.enc.marketing.name = "marketing";
database.enc.marketing.title = "marketing";
database.enc.marketing.FALogo = "heart";

database.enc.medical = {};
database.enc.medical.CollName = "medical";
database.enc.medical.name = "medical";
database.enc.medical.title = "medical";
database.enc.medical.FALogo = "heart";

database.enc.medical = {};
database.enc.medical.CollName = "art";
database.enc.medical.name = "art";
database.enc.medical.title = "art";
database.enc.medical.FALogo = "heart";

database.enc.artistic = {};
database.enc.artistic.CollName = "ceremonial";
database.enc.artistic.name = "ceremonial";
database.enc.artistic.title = "ceremonial";
database.enc.artistic.FALogo = "heart";

database.enc.EncsColls = [];
Object.keys(database.enc).forEach(element => {	
	if(typeof database.enc[element].CollName != 'undefined')
	{
		database.enc.EncsColls = database.enc.EncsColls.concat(database.enc[element].CollName);
	}
});

exports.database = database;
/**************************** links / Server JS ****************************/
let links = {};

links.sign_out = "/sign/sign_out";
links.lanPopShow = "/stuff/lanPopShow";
links.telegram = {};
links.telegram.fa = "https://t.me/company";
links.youtube = "https://www.youtube.com/channel/dadad";
links.aparat = "https://www.aparat.com/company.org";
links.medium = {};
links.medium.fa = "";
links.weblog = "https://blog.company.org/";

exports.links = links;
/**************************** Pages / Server JS ****************************/
let pages = {};

pages.home = "/home";
pages.license = "/license";
pages.aboutus = "/aboutus";
pages.searchRes = "/searchRes";
pages.orgchart = "/orgchart"
pages.signIn = "/sign/signIn/#mainPart";
pages.adSignIn = "/sign/admin_signIn/#mainPart";
pages.signUp = "/sign/signUp/#mainPart";
pages.myaccount = {};
pages.myaccount.overview = "/myaccount/overview";
pages.myaccount.profile = "/myaccount/profile";
pages.myaccount.timelog = "/myaccount/timelog";
pages.myaccount.services = "/myaccount/services";
pages.myaccount.permissions = "/myaccount/permissions";
pages.myaccount.reports = {};
pages.myaccount.reports.inout = "/myaccount/reports/InOut";
pages.portals = {};

pages.departments = {};

pages.departments.legal = {};
pages.departments.legal.canada = '/departments/legal/canada';
pages.departments.legal.geo = '/departments/legal/geo';
pages.departments.legal.checkMigirationWaysForm = '/departments/legal/checkMigirationWaysForm';

pages.departments.human_resources = {};
pages.departments.human_resources.recruitment = '/departments/human_resources/recruitment';

pages.encyclopedia = {};
Object.keys(database.enc).forEach(element => {	
	if(typeof database.enc[element].CollName != 'undefined')
	{
		pages.portals[element] = "/portals/" + database.enc[element].name;
		pages.encyclopedia[element] = "/encyclopedia/" + database.enc[element].name;
	}
});
pages.panel = {};
pages.panel.home = "/panel/home";
pages.panel.EncTree = "/panel/EncTree";
pages.panel.article = {};
pages.panel.article.home = "/panel/article";
pages.panel.article.createArt = pages.panel.article.home + '/createArt';
pages.panel.article.placeArt = pages.panel.article.home + '/placeArt';
pages.panel.article.editArt = pages.panel.article.home + '/editArt';
pages.panel.article.deleteArt = pages.panel.article.home + '/deleteArt';
pages.panel.article.approveArt = pages.panel.article.home + '/approveArt';
pages.panel.article.resources = pages.panel.article.home + '/resources';
pages.panel.article.products = pages.panel.article.home + '/products';
pages.panel.article.delResource = pages.panel.article.home + '/delResource';
pages.panel.article.nodeInf = pages.panel.article.home + '/nodeInf';
pages.panel.article.nodeUrl = pages.panel.article.home + '/nodeUrl';
pages.panel.article.ArtApproves = pages.panel.article.home + '/ArtApproves';
pages.panel.article.ArtResources = pages.panel.article.home + '/ArtResources';
pages.panel.article.URLNameValidation = pages.panel.article.home + '/URLNameValidation';
pages.panel.pagesStuff = {};
pages.panel.pagesStuff.home = "/panel/pagesStuff";
pages.panel.pagesStuff.mainPage = pages.panel.pagesStuff.home + "/mainPage";
pages.panel.pagesStuff.createSlideshow = pages.panel.pagesStuff.home + "/createSlideshow";
pages.panel.pagesStuff.editSlideshow = pages.panel.pagesStuff.home + "/editSlideshow";
pages.panel.pagesStuff.getSlideShow = pages.panel.pagesStuff.home + "/getSlideShow";
pages.panel.translate = {};
pages.panel.translate.home = "/panel/translate";
pages.panel.translate.text = pages.panel.translate.home + "/text";
pages.panel.translate.art = pages.panel.translate.home + "/art";
pages.panel.adminStuff = {};
pages.panel.adminStuff.home = "/panel/adminStuff";
pages.panel.adminStuff.addResources = pages.panel.adminStuff.home + "/addResources";
pages.panel.adminStuff.editResources = pages.panel.adminStuff.home + "/editResources";
pages.panel.adminStuff.resApproveArt = pages.panel.adminStuff.home + "/resApproveArt";
pages.panel.adminStuff.resTrusUsers = pages.panel.adminStuff.home + "/resTrusUsers";
pages.panel.adminStuff.resInf = pages.panel.adminStuff.home + "/resInf";
pages.panel.adminStuff.leg = pages.panel.adminStuff.home + "/leg";
pages.panel.adminStuff.nonArtTel = pages.panel.adminStuff.home + "/nonArtTel";
pages.panel.adminStuff.perm = pages.panel.adminStuff.home + "/perm";
pages.panel.adminStuff.os = pages.panel.adminStuff.home + "/os";
pages.helper = {};
pages.helper.userRegion = '/helper/user_region';
pages.online_services = {};
pages.online_services.home = "/online_services/home";
pages.online_services.temperament = '/online_services/temperament';
pages.notTranslated = '/stuff/notTranslated';
pages.underConstruction = 'stuff/underConstruction';
pages.notTranslatedHtml = rootPath + '/site/stuff/notTranslated.html';
pages.notFound = 'stuff/404';

exports.pages = pages;
/**************************** Web Api ****************************/
let webApi = {};
webApi.home = '/web_services';

pages.panel.adminStuff.nonArtsTelList_WA = pages.panel.adminStuff.home + "/WS/nonArtsTelList_WA";
pages.panel.adminStuff.nonArtTelAdd_WA = pages.panel.adminStuff.home + "/WS/nonArtTelAdd_WA";
pages.panel.adminStuff.nonArtTelDel_WA = pages.panel.adminStuff.home + "/WS/nonArtTelDel_WA";
pages.panel.adminStuff.permList_WA = pages.panel.adminStuff.home + "/WS/permList_WA";
pages.panel.adminStuff.delUser_WA = pages.panel.adminStuff.home + "/WS/delUser_WA";
pages.panel.adminStuff.addEditResources = pages.panel.adminStuff.home + "/WS/addEditResources";
pages.panel.adminStuff.delResources = pages.panel.adminStuff.home + "/WS/delResources";
pages.panel.article.articlesList = pages.panel.article.home + '/WS/articlesList';
pages.panel.article.getArticle = pages.panel.article.home + '/WS/getArticle';
pages.panel.article.uploadFile = pages.panel.article.home + '/WS/uploadFile';
webApi.slideShowPagesList = webApi.home + '/slideshowPageList';
webApi.editProfile = webApi.home + "/editProfile";
webApi.getSlideShow = webApi.home + '/getSlideShow';
webApi.setSlideShow = webApi.home + '/setSlideShow';
webApi.setServices = webApi.home + '/setServices';
webApi.getLocalTrans = webApi.home + '/getLocalTrans';
webApi.rebootOs = webApi.home + '/rebootOs';
webApi.reportTimeLog = webApi.home + '/reportTimeLog';
webApi.getAllServices = webApi.home + '/getAllServices';
webApi.getDepList = webApi.home + '/getDepList';
webApi.getClientFullStatus = webApi.home + '/getClientFullStatus';
webApi.GetAllClients = webApi.home + '/GetAllClients';
webApi.GetEmployeesInoutManagedReport = webApi.home + '/GetEmployeesInoutManagedReport';
webApi.GetAllEmployee = webApi.home + '/GetAllEmployee';
webApi.GetPermissionStatus = webApi.home + '/GetPermissionStatus';
webApi.deleteTimeLog = webApi.home + '/deleteTimeLog';
webApi.AddPermission = webApi.home + '/AddPermission';
webApi.RemovePermission = webApi.home + '/RemovePermission';
webApi.UpdateServiceRequestStepStatus = webApi.home + '/UpdateServiceRequestStepStatus';
webApi.UpdateServiceRequestStep = webApi.home + '/UpdateServiceRequestStep';
webApi.getClientProfile = webApi.home + '/getClientProfile';

exports.webApi = webApi;
/**************************** Layouts ****************************/
let layouts = {};

layouts.head = rootPath + '/site/layouts/head.ejs';
layouts.header = rootPath + '/site/layouts/header.ejs';
layouts.navbar = rootPath + '/site/layouts/navbar.ejs';
layouts.sidebar_navbar = rootPath + '/site/layouts/sidebar_navbar.ejs';
layouts.footer = rootPath + '/site/layouts/footer.ejs';
layouts.scripts = rootPath + '/site/layouts/scripts.ejs';
layouts.script = rootPath + '/site/layouts/script.ejs';
layouts.panel = {};
layouts.panel.navbar = rootPath + '/site/layouts/pages/panel/navbar.ejs';
layouts.panel.sidebar = rootPath + '/site/layouts/pages/panel/sidebar.ejs';
layouts.panel.CEArtFrom = rootPath + '/site/layouts/pages/panel/CreEditArtForm.ejs';
layouts.panel.addEditResForm = rootPath + '/site/layouts/pages/panel/addEditResForm.ejs';
layouts.panel.placeArtForm = rootPath + '/site/layouts/pages/panel/placeArtForm.ejs';
layouts.panel.chooseNodeTree = rootPath + '/site/layouts/pages/panel/chooseNodeTree.ejs';
layouts.panel.slideShowForm = rootPath + '/site/layouts/pages/panel/slideShowForm.ejs';
layouts.enc = {};
layouts.enc.sidebar = rootPath + '/site/layouts/pages/encyclopedia/sidebar.ejs';
layouts.enc.mobile_sidebar = rootPath + '/site/layouts/pages/encyclopedia/mobile_sidebar.ejs';
layouts.os = {};
layouts.os.temperament = {};
layouts.os.temperament.sidebar = rootPath + '/site/layouts/pages/online_services/temperament/sidebar.ejs';
layouts.myaccount = {};
layouts.myaccount.sidebar = rootPath + '/site/layouts/pages/myaccout/sidebar.ejs';
layouts.myaccount.navbar = rootPath + '/site/layouts/pages/myaccout/navbar.ejs';
layouts.myaccount.footer = rootPath + '/site/layouts/pages/myaccout/footer.ejs';
layouts.slideshow = rootPath + '/site/layouts/elements/slideshow.ejs';
layouts.melement = rootPath + '/site/layouts/elements/melement.ejs';
layouts.headerEL = rootPath + '/site/layouts/elements/headerEl.ejs';
layouts.article = rootPath + '/site/layouts/elements/article.ejs';
layouts.collapsibleQuestion = rootPath + '/site/layouts/elements/collapsibleQuestion.ejs';
layouts.approveRate = rootPath + '/site/layouts/elements/approveRate.ejs';
layouts.sharing = rootPath + '/site/layouts/elements/sharing.ejs';
layouts.comments = rootPath + '/site/layouts/elements/comments.ejs';
layouts.resources = rootPath + '/site/layouts/elements/resources.ejs';
layouts.artTags = rootPath + '/site/layouts/elements/artTags.ejs';
layouts.artLicense = rootPath + '/site/layouts/elements/artLicense.ejs';
layouts.allResources = rootPath + '/site/layouts/elements/allResources.ejs';
layouts.locationbar = rootPath + '/site/layouts/elements/location_bar.ejs';
layouts.mmodal = rootPath + '/site/layouts/elements/mmodal.ejs';
layouts.questionMark = rootPath + '/site/layouts/elements/questionMark.ejs';
layouts.telegram = rootPath + '/site/layouts/elements/telegram.ejs';
layouts.temperament = rootPath + '/site/layouts/elements/temperament.ejs';
layouts.nodeJsObToClientJsOb = rootPath + '/site/layouts/helper/nodeJsObToClientJsOb.ejs';
layouts.ad = rootPath + "/site/layouts/elements/ad.ejs";

exports.layouts = layouts;
/**************************** Client CSS ****************************/
let css = {};

css.main = '/stylesheet/css/main/theme.css';
css.material_dashboard = '/framework/material-dashboard-v2.1.0/assets/css/material-dashboard.css';
css.beautifier = '/stylesheet/css/main/beautifier.css';
css.bootstrap = '/framework/bootstrap-4.1.3-dist/css/bootstrap.min.css';
css.circliful = '/framework/jquery-circliful/jquery.circliful.css';
css.font = '/stylesheet/css/main/font.css';
css.fontAwesome = '/framework/font-awesome/css/all.min.css';
css.animate = '/framework/animateCss/animate.min.css';
css.customBS = '/stylesheet/css/main/customBS.css';
css.fa = '/stylesheet/css/main/fa.css';
css.en = '/stylesheet/css/main/en.css';
css.os = {};
css.os.home = '/stylesheet/css/pages/online_services/home.css';
css.os.temperament = '/stylesheet/css/pages/online_services/temperament.css';
css.enc = {};
css.enc.main = '/stylesheet/css/pages/encyclopedia/theme.css';
css.enc.sidebar = '/stylesheet/css/pages/encyclopedia/sidebar.css';

css.myaccount = {};
css.myaccount.main = '/stylesheet/css/pages/myaccount/theme.css';

css.panel = {};
css.panel.main = '/stylesheet/css/pages/panel/theme.css';
css.panel.sidebar = '/stylesheet/css/pages/panel/sidebar.css';
css.panel.EncTree = '/stylesheet/css/pages/panel/EncTree.css';

css.departments = {};
css.departments.main = "/stylesheet/css/pages/departments/main.css";

css.headerEl = '/stylesheet/css/elements/headerEl.css';
css.sign = '/stylesheet/css/pages/sign.css';
css.tinymce = '/stylesheet/css/elements/tinymce.css';
css.framework = {};
css.framework.orgchart = '/framework/getorgchart/getorgchart.css';
css.orgchart = '/modules/orgchart/orgchart.css';
css.resources = '/stylesheet/css/elements/resources.css';
css.tagInput = '/framework/jQuery-Tags-Input/dist/jquery.tagsinput.min.css';
css.tagInputCustom = '/stylesheet/css/elements/tagInput.css';
css.slideshow = '/modules/slideshow/slideshow.css';
css.tag = '/stylesheet/css/elements/tag.css';
css.toggleBotton = '/stylesheet/css/elements/toggleBotton.css';
css.article = '/stylesheet/css/elements/article.css';
css.approveRate = '/stylesheet/css/elements/approveRate.css';
css.artTags = '/stylesheet/css/elements/artTags.css';
css.mmodal = '/stylesheet/css/elements/mmodal.css';
css.boxes = '/stylesheet/css/elements/boxes.css';
css.questionmark = '/stylesheet/css/elements/questionMark.css';
css.gcs = '/stylesheet/css/elements/google_custom_search.css';
css.things = '/stylesheet/css/main/things.css';
css.pub = {};
css.pub.profile = '/stylesheet/css/pages/pub/profile.css';

exports.css = css;
/**************************** Client JS ****************************/
let js = {};

js.main = '/js/JS/main/main.js';
js.sign = '/js/JS/pages/sign.js';
js.os = {};
js.os.temperament = '/js/JS/pages/online_services/temperament.js';

js.pages = {};
js.pages.departments = {};
js.pages.departments.human_resources = {};
js.pages.departments.human_resources.recruitment = '/js/JS/pages/departments/human_resources/recruitment.js'; 
js.pages.departments.legal = {};
js.pages.departments.legal.checkMigirationWaysForm = '/js/JS/pages/departments/legal/checkMigirationWaysForm.js'; 

js.encyclopedia = {};
js.encyclopedia.sidebar = '/js/JS/pages/encyclopedia/sidebar.js';

js.myaccount = {};
js.myaccount.overview = '/js/JS/pages/myaccount/overview.js';
js.myaccount.permissions = '/js/JS/pages/myaccount/permissions.js';
js.myaccount.reports = {};
js.myaccount.reports.inout = '/js/JS/pages/myaccount/reports/inout.js';
js.myaccount.profile = '/js/JS/pages/myaccount/profile.js';
js.myaccount.timelog = '/js/JS/pages/myaccount/timelog.js';
js.myaccount.services = '/js/JS/pages/myaccount/services.js';

js.panel = {};
js.panel.main = '/js/JS/pages/panel/panel.js';
js.panel.sidebar = '/js/JS/pages/panel/sidebar.js';
js.panel.EncTree = '/js/JS/pages/panel/EncTree.js';
js.panel.chooseNodeTree = '/js/JS/pages/panel/chooseNodeTree.js';
js.panel.article = {};
js.panel.article.main = '/js/JS/pages/panel/encyclopedia/main.js';
js.panel.article.editArt = '/js/JS/pages/panel/encyclopedia/editArt.js';
js.panel.article.createArt = '/js/JS/pages/panel/encyclopedia/createArt.js';
js.panel.article.placeArt = '/js/JS/pages/panel/encyclopedia/placeArt.js';
js.panel.article.approveArt = '/js/JS/pages/panel/encyclopedia/approveArt.js';
js.panel.article.resources = '/js/JS/pages/panel/encyclopedia/resources.js';
js.panel.article.CreEditArtForm = '/js/JS/pages/panel/encyclopedia/CreEditArtForm.js';
js.panel.pagesStuff = {};
js.panel.pagesStuff.main = '/js/JS/pages/panel/pagesStuff/main.js';
js.panel.pagesStuff.mainPage = '/js/JS/pages/panel/pagesStuff/mainPage.js';
js.panel.pagesStuff.editSlideshow = '/js/JS/pages/panel/pagesStuff/slideShow.js';
js.panel.pagesStuff.editSlideshowFrom = '/js/JS/pages/panel/pagesStuff/slideShowFrom.js';
js.panel.adminStuff = {};
js.panel.adminStuff.main = '/js/JS/pages/panel/adminStuff/main.js';
js.panel.adminStuff.addEditResForm = '/js/JS/pages/panel/adminStuff/addEditResForm.js';
js.panel.adminStuff.addResources = '/js/JS/pages/panel/adminStuff/addResources.js';
js.panel.adminStuff.editResources = '/js/JS/pages/panel/adminStuff/editResources.js';
js.panel.adminStuff.resApproveArt = '/js/JS/pages/panel/adminStuff/resApproveArt.js';
js.panel.adminStuff.resTrusUsers = '/js/JS/pages/panel/adminStuff/resTrusUsers.js';
js.panel.adminStuff.leg = '/js/JS/pages/panel/adminStuff/leg.js';
js.panel.adminStuff.nonArtTel = '/js/JS/pages/panel/adminStuff/nonArtTel.js';
js.panel.adminStuff.perm = '/js/JS/pages/panel/adminStuff/perm.js';
js.panel.adminStuff.os = '/js/JS/pages/panel/adminStuff/os.js';
js.panel.translate = {};
js.panel.translate.text = '/js/JS/pages/panel/transalte/text.js';

js.material_dashboard = {};
js.material_dashboard.bootstrap = '/framework/material-dashboard-v2.1.0/assets/js/core/bootstrap-material-design.min.js';
js.material_dashboard.main = '/framework/material-dashboard-v2.1.0/assets/js/material-dashboard.min.js';
// js.material_dashboard.arrive = '/framework/material-dashboard-v2.1.0/assets/js/plugins/arrive.min.js';
js.material_dashboard.bootstrapNotify = '/framework/material-dashboard-v2.1.0/assets/js/plugins/bootstrap-notify.js';
js.material_dashboard.chartist = '/framework/material-dashboard-v2.1.0/assets/js/plugins/chartist.min.js';
js.material_dashboard.perfectScrollbarJquery = '/framework/material-dashboard-v2.1.0/assets/js/plugins/perfect-scrollbar.jquery.min.js';
js.material_dashboard.popper = '/framework/material-dashboard-v2.1.0/assets/js/core/popper.min.js';
// js.material_dashboard.demo = '/framework/material-dashboard-v2.1.0/assets/js/plugins/demo.js';

js.jquery = '/framework/jquery-3.3.1.min.js';
js.bootstrap = '/framework/bootstrap-4.1.3-dist/js/bootstrap.min.js';
js.popper = '/framework/popper/popper.js';
js.hammer = '/framework/hammer.min.js';
js.jshashes = '/framework/hashes.min.js';
js.tinymce = '/framework/tinymce/js/tinymce/tinymce.min.js';
js.tinymceJquery = '/framework/tinymce/js/tinymce/jquery.tinymce.min.js';
js.piwik = '/framework/piwik/piwik.js';
js.chartjs = '/framework/chartjs/Chart.bundle.min.js';
js.framework = {};
js.framework.circliful = '/framework/jquery-circliful/jquery.circliful.js';
js.framework.disqus = '/framework/disqus/disqus.js';
js.framework.orgchart = "/framework/getorgchart/getorgchart.js";
js.orgchart = "/modules/orgchart/orgchart.js";
js.tinymceInit = '/js/JS/elements/tinymceInit.js';
js.tagInput = '/framework/jQuery-Tags-Input/dist/jquery.tagsinput.min.js';
js.tagInputCustom = '/js/JS/elements/tagInput.js';
js.timeAgo = '/framework/jquery-timeago-master/jquery.timeago.js';
js.timeAgoFa = '/framework/jquery-timeago-master/locale/jquery.timeago.fa.js';
js.slideshow = '/modules/slideshow/slideshow.js';
js.search = '/js/JS/elements/search.js';
js.mmodal = '/js/JS/elements/mmodal.js';
js.langPop = '/js/JS/elements/langPop.js';
js.popover = '/js/JS/elements/popover.js';
js.moment = "/framework/moment.min.js";

exports.js = js;
/**************************** Methods ****************************/
let methods = {};

methods.db = {};
methods.db.main = rootPath + '/methods/DBMain.js';
methods.db.profile = rootPath + '/methods/DBProfile.js';
methods.db.articles = rootPath + '/methods/DBArticles.js';
methods.db.relatedP = rootPath + '/methods/DBRelatedP.js';
methods.middlewares = rootPath + '/methods/middlewares.js';
methods.space = rootPath + '/methods/space.js';
methods.helper = rootPath + '/methods/helper.js';
methods.fix_or_maintain = rootPath + '/methods/fix_or_maintain.js';

exports.methods = methods;
/**************************** Space ****************************/
let space = {};

space.relPath = './space/';
space.articlesFolderName = 'articles/';
space.resourcesFolderName = 'resources/';
space.siteFolderName = 'site/';
space.cv = 'cv/';
space.slideshowFolderName = 'slideshow/';
space.onlineServicesFolderName = 'online_services/';
space.profilePic = '/profiles/';

exports.space = space;

/**************************** Space ****************************/
let locales = {};

locales.home = rootPath + '/public/locales/';

exports.locales = locales;

/**************************** Codes ****************************/
let codes = {};

codes.notAllowed = -5;
codes.db = {};
codes.db.Error = -2;
codes.db.docNotFound = -3;
codes.db.docFound = 2;
codes.db.success = true;
codes.space = {};
codes.space.error = -1;
codes.space.success = 11;
codes.validationError = -4;
codes.lackOfInformation = -6;
codes.general = {};
codes.general.error = -10;
codes.general.success = 3;

exports.codes = codes;