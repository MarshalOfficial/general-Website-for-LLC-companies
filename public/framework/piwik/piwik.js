var _paq = _paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
_paq.push(["setCookieDomain", "*.healoba.com"]);
_paq.push(["setDomains", ["*.healoba.com"]]);
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
	var u="//healoba.com:2052/";
	_paq.push(['setTrackerUrl', u+'piwik.php']);
	_paq.push(['setSiteId', '1']);
	var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
	g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
})();