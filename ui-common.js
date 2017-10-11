require.config({
	'paths': {
		'socialIcons': 'prelogin/compiled-templates/HeaderSocialIconsTemplate',
		'Headroom': '//cdnjs.cloudflare.com/ajax/libs/headroom/0.9.4/headroom.min'
	},
	
	// shim: {
	// 	"Headroom": {
	// 		"exports": "window.Headroom"
	// },
// }

});


define(['jquery', 'modernizr', '$document', 'templates','require','handlebars', 'socialIcons', 'Headroom'], function ($,mod, $d, t, r, h, si, Headroom) {
		
		$ = window.jQuery;
		var $doc = $d && $d.document;
		var head = $doc.find(document.head || 'head');
		var body = $d && $d.body;
		var activeCls = 'active';
		var $window = $(window);
	    var compile = h.compile;
	    var sd = $d && $d.SessionJSON;
	    var _render = $d && $d.render;
		var _ui = $d && $d.UI;
		var _prerender = $d && $d.pre_render;
		var _subroutinePromise = $d.subroutinePromise;
		var isRetailSubDomain = false;
		var subDomainName;
	
	if ("function" === typeof sd)
			sd = sd();
			var sb = sd.GetDomain;
			if(typeof(sb) !=  'undefined'){
				var isRetailSubDomain = sb.IsRetailSubDomain;
			} else {
			// var isRetailSubDomain = true; 
			// Force cobrand trigger
			var isRetailSubDomain = true; 
			var subDomainId =  184;
			var subDomainName =  "CMS Default";
			}
				subDomainName = isRetailSubDomain ? "" : sb.SubDomainName;
				if (isRetailSubDomain === false) { 
					subDomainName = isRetailSubDomain ? "" : sb.SubDomainName;
					subDomainId = isRetailSubDomain ? "" : sb.SubDomainId;
			}
		
	

// DOM READY JS
//landing Page Mobile Nav

$(function() {
var div ="<div class='drawer-overlay'></div>";
$(".podcast").append(div);
$( "#nav-trigger  button" ).click(function() {
document.getElementById("mySidenav").style.width = "250px";
$("#mySidenav ul").addClass("expanded").fadeIn(600);
$(".drawer-overlay").addClass("active");
});

$( "#mySidenav .closebtn" ).click(function() {
document.getElementById("mySidenav").style.width = "0";
$("#mySidenav ul").removeClass('expanded').fadeOut(80);
$(".drawer-overlay").removeClass("active");
});
});


// $(function () {
// 	var headertext = [];
// 	var headers = document.querySelectorAll("thead");
// 	var tablebody = document.querySelectorAll("tbody");
	
// 	for(var i = 0; i < headers.length; i++) { headertext[i]=[]; for (var j = 0, headrow; headrow = headers[i].rows[0].cells[j]; j++) { var current = headrow; headertext[i].push(current.textContent.replace(/\r?\n|\r/,"")); } } if (headers.length > 0) {
// 		for (var h = 0, tbody; tbody = tablebody[h]; h++) {
// 			for (var i = 0, row; row = tbody.rows[i]; i++) {
// 			  for (var j = 0, col; col = row.cells[j]; j++) {
// 			    col.setAttribute("data-th", headertext[h][j]);
// 			  } 
// 			}
// 		}
// 	}
// } ());

headroom = function(element){
// grab an element
var myElement = document.querySelector("#header-container");
// construct an instance of Headroom, passing the element
var headroom  = new Headroom(myElement);
// initialise
headroom.init(); 
}

//Social Icons
$(function() {
		if ((isRetailSubDomain === true)) {
			// headersocialicons.parent().html(compile(headersocialicons.html())(window.socialicons || {}));
			socialIcons  = h.templates['socialIcons'];
			$('.login').append(socialIcons);
			$('.social-wrap').append(socialIcons);
			$('.social-wrap').prepend('<h5>Stay Connected</h5>');	
		} 
	
// Cobrand Logic
	var logo_img = $(".cobrand_logo");
	var main_img = $(".main_logo");
	var cobrlogo = 'svg/sm_pre_cobr.svg'
	// old logo var cobrlogo = 'svg/sm_logo.svg'
	var baseImagePath = logo_img.data("base-path");
	var mainImagePath = main_img.data("base-path");
	var loaded = 'logo_img loaded';
	var hidden = 'js-hidden';
	var cobr = "cobrands";
	switch (!0) {
			case !isRetailSubDomain && !!subDomainName.length:
				var data = { 
						"base": baseImagePath,
						"cobr": cobr,
						"subdomain": subDomainId
					}
				tmp = compile("{{base}}{{cobr}}/{{subdomain}}.png");
				$.loadImage(tmp(data)).done(cobrandImage);
				displayHeroImage();
				break; 
	    case window.location.href.indexOf("podcasts") > -1 || window.location.href.indexOf("directmail") > -1:
			break;
			default:
			tmp = compile("{{base}}{{cobr}}/{{subdomain}}.png");
				$('.cobrand-wrap').hide();
			    // $('.main_logo').hide();
				$("#marketingHero").show();
		    $(mainLogo);
				break;
		}
		
		function mainLogo() {
			main_img.prop({
						"src": mainImagePath + "svg/sm_logo_opt.svg", 
						"alt": "TransUnion SmartMove",
						"style": "color:transparent; width:235px; height:75px;"
		});		 
		}

		function cobrandImage(i) {
			logo_img.prop({
				"src": i.attr("src"),
				"alt": subDomainName + ", Powered by TransUnion SmartMove",
			});
			main_img.prop({
				"src": mainImagePath + cobrlogo,
				"alt": "Powered by TransUnion SmartMove"
			});
			$('.main_logo').show();
			$('.cobrand-wrap').show();
			$('.header-top').removeClass('cobr-hidden');
			$('.header-top').addClass('cobr-active');

		}


	});

/* RESPONSIVE NAVIGATION */
// 	$(function() {

// 		var menuOptions = {
// 			"customToggle": "ResponsiveNavButton",
// 			"navClass": "menu",
// 			"closeOnNavClick": !0
// 		};
// 		var menu = body.find(".nav-main ." + menuOptions.navClass);
	
// 		menu.find("a[href]").each(parseLinks)
	
	
// 		!!menu.length && _ui.done(function(o) {
// 			$window.on("resize.smartmove", toggleClose);
// 			body.on("click", "#" + menuOptions.customToggle, activeMobileMenu);
	
// 			function toggleClose(e) {
// 				e && 768 < windowWidth() && menu.hasClass("opened") && menu.removeClass("opened").addClass("closed")
// 			};
	
// 			function activeMobileMenu(e) {
// 				if (!(e && e.type && "click" === e.type)) return;
// 				body.off("click", activeMobileMenu);
// 				r(['responsive-nav'], function(nav) {
// 					menu.selector && nav(menu.selector, menuOptions).toggle();
// 				});
// 				activeMobileMenu = null;
// 			};
// 		});
// 		/* RESPONSIVE MENU ITEMS */
// 			var mainMenu = body.find("#mainMenu")
// 			if (!mainMenu.length) return;
	
// 			var links = ".dropdown > a, .dropdown-submenu > a",
// 				subMenu = ".dropdown-submenu",
// 				cls = "resp-active",
// 				dropdownMenu = ".dropdown-menu",
// 				active = !1;
	
// 			// attach events
// 			mainMenu.off({
// 					"click": responsiveClick,
// 					"hover": subMenuHover
// 				})
// 				.on("click", links, responsiveClick)
// 				.on("hover", subMenu, subMenuHover);
	
// 			function responsiveClick(e) {
// 				if (e && !(windowWidth() < 979)) return e.preventDefault(), e = $(this), active = e.parent().hasClass(cls), mainMenu.find("." + cls).removeClass(cls), !active && e.parents("li").addClass(cls), !1
// 			};
	
// 			function subMenuHover(e) {
// 				if (e && !(767 > windowWidth())) {
// 					var b = windowWidth();
// 					e = $(e.target).find(dropdownMenu);
// 					e.offset();
// 					var c = e.width(),
// 						d = e.parents(dropdownMenu).width(),
// 						e = e.offset().left + e.width();
// 					e.css("margin-left", e > b ? "-" + (d + c + 10) + "px" : 0)
// 				}
// 			}
// // Link Hover
// 	});
// 	$(function() {

// 		var hash = body.find("a[data-hash]");
// 		var hashHeader = body.find("header .main-nav");

// 		if (!hash.length) return;
// 		var headerHeight = hashHeader.height();
// 		$window.off("click.smartmove", anchorClick)
// 			.on("click.smartmove", anchorClick);

// 		function anchorClick(e) {
// 			if (e && e.preventDefault) return e.preventDefault(), a = $(this).attr("href"), $('html,body').animate({
// 				scrollTop: $(a).offset().top - (991 < windowWidth() ? headerHeight + 50 : 30)
// 			}, 600), !1
// 		}
// });
// END DOM READY
// Name functions 
	// stickyMenu = function()	{
	// var header = "header:first";
	// 	var logoWrapper = ".logo";
	// 	var logo = "img";
	// 	var flatParentItems = ".flat-menu .nav-main ul > li > a";

	// 	var headerHeight = 0;
	// 	var smallHeaderHeight = 0;
	// 	var marginTop = 0;
	// 	var _isSticky = false;

	// 	var stylesID = "sticky-menu-style";
	// 	var menuActive = "sticky-menu-active";

	// 	var transitionProperty = mod.csstransitions && mod.prefixed('transitionDuration');
	// 	var transitionRegExp = /^([A-Z])(.*?)([A-Z])(.*?)([A-Z])(.*?)$/;
	// 	var animateInterval = 300;
	// 	var wt = 991;

	// 	// attach events
	// 	$window.off({
	// 			"scroll.smartmove resize.smartmove": checkStickyMenu
	// 		})
	// 		.on({
	// 			"scroll.smartmove resize.smartmove": checkStickyMenu
	// 		})
	// 		.trigger("scroll.smartmove");

	// 	function checkStickyMenu() {

	// 		if (windowWidth() < wt)
	// 			return "active";

	// 		$window.off({
	// 			"scroll.smartmove resize.smartmove": checkStickyMenu
	// 		});

	// 		// find elements
	// 		header = body.find(header);
	// 		logoWrapper = header.find(logoWrapper);
	// 		logo = logoWrapper.find(logo);
	// 		flatParentItems = $(flatParentItems);
	// 		$('#' + stylesID).remove(); // remove if present
	// 		// set dimensions
	// 		headerHeight = header.height();
	// 		var sheet = $.addStyleSheet(stylesID).appendTo(head)
	// 			.addCSSRule('.sticky-menu-active #' + header.parents('.iw_component').attr('id'), "height:319px;display:block;");
	// 		body.addClass(menuActive);
	// 		flatParentItems.addClass(menuActive);
	// 		smallHeaderHeight = header.height();
	// 		marginTop = headerHeight + parseInt(logo.css("margin-top"), 10);
	// 		scrollTopCheck(marginTop) || (body.removeClass(menuActive) && flatParentItems.removeClass(menuActive));

	// 		return checkStickyMenu = function(e) {
	// 			if (!e) return;

	// 			var b = body.outerHeight(!0);
	// 			var w = $window.outerHeight(!0);
	// 			var h = headerHeight;

	// 			switch (!0) {
	// 				case windowWidth() < wt:
	// 				case _isSticky && !scrollTopCheck(marginTop):
	// 				case (b - w - h <= 10):
	// 					body.removeClass(menuActive);
	// 					flatParentItems.removeClass(menuActive);
	// 					_isSticky = !1;
	// 					break;
	// 				case !_isSticky && scrollTopCheck(marginTop):
	// 					_isSticky = !0;
	// 					body.addClass(menuActive);
	// 					flatParentItems.addClass(menuActive);
	// 					break;
	// 			}
	// 		}, $window.on({
	// 			"scroll.smartmove resize.smartmove": checkStickyMenu
	// 		}), "active"
	// 	}

	// }

	

accordion  = function(e) {
/* TABS */
	_ui.done(function() {
		var tabs = body.find("#what-tabs");
		tabs.off("click", tabClick).on("click", "a", tabClick);

		function tabClick(e) {
			if (!e)
				return !1;
			e.preventDefault();
			$(this).tab && $(this).tab("show");
			return !1;
		};
	});

/* TOGGLES */
	_ui.done(function () {
		var toggles = body.find(".toggle");
		var parents = toggles.parent('.toogle');

		if (!toggles.length)
			return;

		var previewParClosedHeight = 25;
		var cls = "active";
		var isAccordion = "toogle-accordion";
		var toggle;

		// attach events
		parents.off("click", labelClick)
			.on("click", toggles.find(">label"), labelClick);

		function labelClick(e) {
			if (!e) return;

			var toogle = $(this),
				toggle = $(e.target).parent('.toggle'),
				previewPar = false,
				previewParCurrentHeight, previewParAnimateHeight,
				toggleContent = ">.toggle-content";

			toogle.hasClass(isAccordion) && $(e.delegateTarget).find("." + cls).removeClass(cls);
			toggle.toggleClass(cls);

			// Preview Paragraph
			if (previewPar = toggle.find(">p"), !!previewPar.length) {
				previewParCurrentHeight = previewPar.height() || parseInt(previewPar.css("height"), 10);
				previewParAnimateHeight = previewPar.css("height", "auto").height();
				previewPar.css("height", "")
					.height(previewParCurrentHeight);
			}

			// Content
			toggleContent = toggle.find(toggleContent);
			if (toggle.hasClass(cls)) {
				previewPar.animate({
					"height": previewParAnimateHeight
				}, 350, function() {
					$(this).addClass(previewCls)
				});
				toggleContent.slideDown(350, $.noop);
			} else {
				previewPar.animate({
					"height": previewParClosedHeight
				}, 350, function() {
					$(this).removeClass(previewCls)
				});
				toggleContent.slideUp(350, $.noop);
			}
		}
	});

}
//Scroll to Top 
scrollToTop = function(e) {
		/* SCROLL TO TOP */
	var scrollToTop = '<div class="scroll-to-top"><a id="scrollToTop" class="icon">Scroll to top</a></div>';
	_render.done(function() {
		scrollToTop = $(scrollToTop).appendTo(body);
	});
	_ui.done(function(o) {
		var $data = $window.data(),
			scrollDoc = $("html,body"),
			ceiling = 150,
			cls = "visible",
			_isScroll = !1;

		scrollToTop.off("click", scrollToTopClick)
			.on("click", scrollToTopClick);
		$window.off({
				"scroll.smartmove": windowScroll,
				"scrolltotop.smartmove": scrollToTopAnimate
			})
			.on({
				"scroll.smartmove": windowScroll,
				"scrolltotop.smartmove": scrollToTopAnimate
			});


		function scrollToTopClick(e) {
			return e && !_isScroll && $(this).removeClass(cls), $window.trigger("scrolltotop.smartmove"), !1
		};

		function scrollToTopAnimate(e) {
			_isScroll = !0;
			r(['velocity'], function($) {
				scrollDoc.animate({
					"scrollTop": 0
				}, 500, function() {
					_isScroll = !1
				});
			});
		}

		function windowScroll(e) {
			if (!(e && $data.pos) || _isScroll) return;
			$window.off("scroll.smartmove", windowScroll);
			windowScroll = function(e) {
				(e && !_isScroll) && (ceiling < $data.pos.y) && scrollToTop.addClass(cls) || scrollToTop.removeClass(cls)
			};
			return $window.on("scroll.smartmove", windowScroll), windowScroll(e);
		}
	});
}


body.find(".sidebar-menu").find("li").removeClass(activeCls).find("a[href]").each(parseLinks);
	function parseLinks(i, a) {
				if (!!a.href.length && a.href === location.toString()) {
					$(a).parents("li").addClass(activeCls)
				};
}

// direct mail landing pages
if (window.location.href.indexOf("direct-mail-coupon.page") !== -1) {
        var session = SessionJSON.GetDirectMailCoupon;
        var name = session.OwnerName;
        var couponCode = session.CouponCode
        var offerCode = session.OfferCode;

        $("#customerName").text(name);
        $("#coupon-code").text(couponCode);

        $('#submitEmailAddress').click(function () {
            if ($('#error-email-invite').is(':hidden')) {
                $('[name="tl.OfferCode"]').val(offerCode);
                $('[name="tl.Email"]').val($("#emailAddress").val());
                $('#emaildirectmailcoupon').click();
            }
        });

        if (SessionJSON.EmailDirectMailCoupon && SessionJSON.EmailDirectMailCoupon.length >= 1) {
            if (SessionJSON.Failure && SessionJSON.Failure.failureReason === 'DIRECT_MAIL_REDEEMED') {
                $('#H2').text('Sorry');
                $('#emailResponse').text('We were unable to send your email.');
            }

            $('#emailModal').modal();
        }
    }

    $('#submit-code').click(function () {
        $('[name="tl.OfferCode"]').val($('#card-number').val());
        $('#submitoffercode').click();
    });

//functions
function displayHeroImage() {
	    
        if(sb){
	        switch (sb.SubDomainId) {
	            case 252: //usaa
	                $("#usaaHero").show();
	                break;
	            default:
	                $("#marketingHero").show();
	        }
        }
}

function windowWidth() {
		return $window.width()
};
function scrollTopCheck(b) {
		var a = $window.data("pos");
		return (a && a.y || $window.scrollTop()) > b
};
function isVisible(i) {
		return i.is(":visible") && "hidden" !== i.css("visibility") && "none" !== i.css("display")
	};

function naturalWidth(i) {
		return "undefined" !== $.typeOf(i.prop("naturalWidth")) ? i.prop("naturalWidth") : i.width()
};


if (mod.mobile || (mod.touch || mod.w3cpointerevents)) r(['hammer'], function(hammer) {
	return "function" === $.typeOf(hammer) && new hammer(document.documentElement);
});
//progressive enhancement 
if ($doc.hasClass('lt-ie10')) r(['PIE'], function(pi) {
	if (pi !== window.PIE || !pi.attach) return;

	var pieElements = [":input", ".btn", ".scroll-to-top a", ".pricing-box", ".key-points", ".what-box", ".toggle label", ".error"],
		_body = body.get(0),
		observer = new MutationObserver(attachPIE);
		$doc.addClass("csspie");
		observer.observe(_body, {
		"childList": !0,
		"subtree": !0
});

	function attachPIE() {
		if ("function" === $.typeOf(this.disconnect)) this.disconnect();
		pi.attach(_body);
		body.find(pieElements.join(",")).each(function() {
			pi.attach(this)
		})
	}
});

_subroutinePromise.resolve();
return $.extend($d, {
"head": head
});


});	

