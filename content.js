
define([
	'jquery', 
	'modernizr', 
	'require', 
	'templates', 
	'$document',
	'prelogin-ui',
	'bundles',
], function ($, mod, r, h, $d, ui, bundles) {

	// "use strict" -- STRICT VIOLATIONS
	// global
	var _ui = $d && $d.UI;
	var $window = $(window);
	var $doc = $d && $d.document;
	var compile = h.compile;
	var body = $d && $d.body;
	var hero_img = body.find(".heroContainer.responsive");
	var template = body.find("#HeroImageTemplate");
	

	
// stickyMenu(); 
accordion();
scrollToTop();


r.specified("hero_image") && r(['jquery.picture', 'hero_image'], 
function($, hi) {
		hero_img.picture && hero_img.picture();
		hero_img.append($.trim(compile(template.html())(hi)));
		hero_img.children('img').addClass("loaded").children('script,noscript').remove();
});

$( window ).load(function() {
	headroom();
});

}); 