/**
 * By Houfeng
 * Houfeng@DCloud.io
 * 登录、设置相关代码
 * */
(function($, owner) {

	if (window.isIE6) {
		$.fn.fadeIn = function(dur, callback) {
			this.show();
			if (callback) callback();
		};
		$.fn.fadeOut = function(dur, callback) {
			this.hide();
			if (callback) callback();
		};
	}

	var viewHeight = 325;

	var ui = {
		body: $('body'),
		container: $('.ui-container'),
		settings: $('.ui-settings'),
		tabs: $('.ui-tabs'),
		a: $('a'),
		groupViewInner: $('.ui-view-group-inner'),
		groupView: $('.ui-view-group'),
		settingsView: $('.ui-view-settings'),
		loginView: $('.ui-view-login'),
		regView: $('.ui-view-reg'),
		views: $('[data-role=view]'),
		goLogin: $('.ui-btn-login-go'),
		goReg: $('.ui-btn-reg-go'),
		accountBox: $('.account'),
		loginAccountBox: $('#login-account'),
		loginPasswordBox: $('#login-password'),
		regAccountBox: $('#reg-account'),
		regPasswordBox: $('#reg-password'),
		accountDown: $('#login-account-down'),
		selectMenu: $('.ui-select'),
		proxyItems: $('.proxy-item'),
		proxyType: $('.proxy-type'),
		helpMenu: $('.ui-menu-help'),
		helpBtn: $('.ui-help'),
		arrow: $('.ui-arrow-out,ui-arrow-in'),
		forgetPassword: $('.forget-password'),
		login: $('.login'),
		register: $('.register'),
		proxySave: $('.proxy-save'),
		proxyCancel: $('.proxy-cancel'),
		helpMenuItems: $('.ui-menu-help li'),
		close: $('.ui-close'),
		errorActionItems: $('.ui-error-list li'),
		loginAlert: $('.ui-view-login .ui-alert'),
		regAlert: $('.ui-view-reg .ui-alert'),
		settingsAlert: $('.ui-view-settings .ui-alert'),
		mask: $('.ui-mask'),
		allControls: $('input,botton,a'),
		inputs: $('input')
	};

	//屏蔽右键菜单
	ui.body.on('contextmenu', function(event) {
		return false;
	});

	//原生交互需要用到的
	ui.inputs.on('focus', function(event) {
		// if (window.external && window.external.onFocus) {
			window.external.onFocus('true');
		// }
	}).on('blur', function() {
		// if (window.external && window.external.onFocus) {
			window.external.onFocus('false');
		// }
	});

	//输入框内容变化时清除提示
	ui.inputs.on('input change', function(event) {
		ui.loginAlert.html('');
		ui.regAlert.html('');
		ui.settingsAlert.html('');
	});
	ui.inputs.on('keyup', function(event) {
		if (event.keyCode == "13") return;
		ui.loginAlert.html('');
		ui.regAlert.html('');
		ui.settingsAlert.html('');
	});
	ui.inputs.on('propertychange', function(event) {
		if (event.propertyName != 'value') return;
		ui.loginAlert.html('');
		ui.regAlert.html('');
		ui.settingsAlert.html('');
	});

	//处理 IE6/7 下 a:active 不自动取消的问题 
	ui.body.on('mouseup', 'a', function(event) {
		$(this).blur();
	});

	//去掉 IE 下 a 的焦点虚线框
	ui.a.attr('hidefocus', true);

	//初始化 tabs
	ui.tabs.tabs();

	//初始化下拉选择菜单
	ui.selectMenu.selectmenu();

	//按钮动作处理
	ui.login.on('click', function(event) {
		ui.mask.show();
		ui.login.html('正在登录...');
		ui.loginAlert.html('<span class="ui-icon-loading"></span><span>正在登录...</span>');
		var loginInfo = {
			account: ui.loginAccountBox.val(),
			password: ui.loginPasswordBox.val()
		};
		owner.loginCallback = function(rs) {
			if (rs) {
				ui.loginAlert.html(rs);
			}
			ui.login.html('登录');
			ui.mask.hide();
		};
		invoke.login(loginInfo, owner.loginCallback);
	});

	ui.loginAccountBox.on('keypress', function(event) {
		//document.title=($('.ui-autocomplete:first').is(':hidden'));
		if (event.keyCode == "13" && $('.ui-autocomplete:first').is(':hidden')) {
			ui.login.trigger('click');
		}
	});

	ui.loginPasswordBox.on('keypress', function(event) {
		if (event.keyCode == "13") {
			ui.login.trigger('click');
		}
	});

	ui.forgetPassword.on('click', function(event) {
		ui.mask.show();
		var loginInfo = {
			account: ui.loginAccountBox.val(),
			password: ui.loginPasswordBox.val()
		};
		owner.loginCallback = function(rs) {
			if (rs) {
				ui.loginAlert.html(rs);
			}
			ui.mask.hide();
		};
		invoke.forgetPassword(loginInfo, owner.loginCallback);
	});

	ui.register.on('click', function(event) {
		ui.mask.show();
		ui.register.html('正在注册...');
		ui.regAlert.html('<i class="ui-icon-loading"></i>正在注册...');
		var regInfo = {
			account: ui.regAccountBox.val(),
			password: ui.regPasswordBox.val()
		};
		owner.registerCallback = function(rs) {
			if (rs) {
				ui.regAlert.html(rs);
			}
			ui.mask.hide();
			ui.register.html('注册并登录');
		};
		invoke.register(regInfo, owner.registerCallback);
	});

	ui.regAccountBox.on('keypress', function(event) {
		if (event.keyCode == "13" && $('.ui-autocomplete:last').is(':hidden')) {
			ui.register.trigger('click');
		}
	});

	ui.regPasswordBox.on('keypress', function(event) {
		if (event.keyCode == "13") {
			ui.register.trigger('click');
		}
	});

	ui.proxySave.on('click', function(event) {
		ui.settingsAlert.html('<i class="ui-icon-loading"></i>正在保存设置...');
		var proxyInfo = {
			type: ui.proxyType.find('option:selected').val()
		};
		ui.proxyItems.each(function() {
			var item = $(this);
			proxyInfo[item.attr('data-name')] = item.val();
		});
		owner.saveProxyCallback = function(rs) {
			if (rs) {
				ui.settingsAlert.html(rs);
			} else {
				ui.settingsAlert.html('');
				hideSettings();
			}
		};
		invoke.saveProxy(proxyInfo, owner.saveProxyCallback);
	});

	ui.helpMenuItems.on('click', function(event) {
		var item = $(this);
		var url = item.attr('data-url');
		invoke.openUrl(url);
	});

	ui.close.on('click', function(event) {
		invoke.close();
	});

	ui.errorActionItems.on('click', function(event) {
		var item = $(this);
		var action = item.attr('data-action');
		invoke[action]();
	});

	//输入提示
	var domainArray = ["@qq.com", "@163.com", "@gmail.com", "@126.com", "@yahoo.com", "@sina.com", "@hotmail.com", "@foxmail.com"];
	ui.accountBox.each(function(i, box) {
		$(box).autocomplete({
			delay: 0,
			source: function(request, response) {
				if ('$history' == request.term) {
					owner.readHistoryCallback = function(rs) {
						response(rs);
					};
					invoke.readHistory(owner.readHistoryCallback);
					return;
				}
				var inputs = request.term.split('@');
				var buffer = [];
				$.each(domainArray, function(i, domain) {
					if (inputs[1] == null || domain.indexOf('@' + inputs[1]) == 0) {
						buffer.push({
							account: inputs[0],
							domain: domain,
							input: request.term
						});
					}
				});
				response(buffer);
			},
			focus: function(event, ui) {
				var text = ui.item.label || (ui.item.account + ui.item.domain)
				$(this).val(text).trigger('change');
				return false;
			},
			select: function(event, ui) {
				var text = ui.item.label || (ui.item.account + ui.item.domain)
				$(this).val(text).trigger('change');
				//$('.ui-autocomplete').hide();
				return false;
			}
		}).autocomplete("instance")._renderItem = function(ul, item) {
			var text = item.label || (item.account + item.domain).replace(item.input, '<strong>' + item.input + '</strong>');
			return $("<li>" + text + "</li>").appendTo(ul);
		};
	});
	//登录框下拉箭头
	ui.accountDown.on('click', function(event) {
		ui.loginAccountBox.autocomplete("search", "$history");
		return false;
	});

	ui.body.on('click', function() {
		setTimeout(function() {
			ui.loginAccountBox.autocomplete("close");
		}, 100);
	});

	var setViewTabState = function(showView) {
		ui.allControls.attr('tabIndex', '-1');
		showView.find('input,botton,a').attr('tabIndex', '1');
	};

	setViewTabState(ui.loginView);

	//登录注册切换
	ui.goReg.on('click', function(event) {
		ui.mask.show();
		ui.groupViewInner.animate({
			'margin-top': -viewHeight
		}, 450, 'swing', function() {
			setViewTabState(ui.regView);
			ui.mask.hide();
		});
	});
	ui.goLogin.on('click', function(event) {
		ui.mask.show();
		ui.groupViewInner.animate({
			'margin-top': 0
		}, 450, 'swing', function() {
			setViewTabState(ui.loginView);
			ui.mask.hide();
		});
	});

	var setInputState = function(proxyType) {
		var disabled = proxyType != 'ProxyUser';
		ui.proxyItems[disabled ? 'addClass' : 'removeClass']('ui-disabled');
		ui.proxyItems.prop('disabled', disabled);
	};

	var fillSettings = function() {
		invoke.readProxy(function(proxyInfo) {
			ui.proxyItems.each(function() {
				var item = $(this);
				item.val(proxyInfo[item.attr('data-name')]);
			});
			ui.proxyType.val(proxyInfo.type).selectmenu('refresh');
			setInputState(proxyInfo.type);
		});
	};

	var settingsIsShow = false;
	var showSettings = function() {
		ui.mask.show();
		if (window.isIE) {
			ui.groupView.fadeOut(300, function() {
				ui.settingsView.fadeIn(300, function() {
					ui.mask.hide();
				});
			});
		} else {
			transitions.change(ui.groupView, ui.settingsView, 32, function() {
				ui.mask.hide();
			});
		}
		settingsIsShow = true;
		fillSettings();
		setViewTabState(ui.settingsView);
	};

	var hideSettings = function() {
		ui.mask.show();
		if (window.isIE) {
			ui.settingsView.fadeOut(300, function() {
				ui.groupView.fadeIn(300, function() {
					ui.mask.hide();
				});
			});
		} else {
			transitions.change(ui.settingsView, ui.groupView, 33, function() {
				ui.mask.hide();
			});
		}
		settingsIsShow = false;
		setViewTabState(ui.loginView);
	};

	//切换设置界面
	ui.settings.on('click', function() {
		if (!settingsIsShow) {
			showSettings()
		} else {
			hideSettings();
		}
	});

	ui.proxyCancel.on('click', function(event) {
		hideSettings();
	});

	//代理设置
	var disabled = true;
	ui.proxyItems[disabled ? 'addClass' : 'removeClass']('ui-disabled');
	ui.proxyItems.prop('disabled', disabled);
	ui.proxyType.selectmenu({
		change: function(event, _ui) {
			setInputState(_ui.item.value);
		}
	});

	var helpTimer = null;
	//帮助菜单
	ui.helpBtn.on('mousemove', function(event) {
		if (helpTimer) clearTimeout(helpTimer);
		ui.helpMenu.fadeIn(300);
		helpTimer = null;
		return false;
	}).on('mousedown', function(event) {
		return false;
	});
	ui.body.on('mousemove', function(event) {
		if (helpTimer) return;
		helpTimer = setTimeout(function() {
			ui.helpMenu.fadeOut(300);
		}, 500);
	}).on('mousedown', function(event) {
		ui.helpMenu.fadeOut(300);
	});
	ui.helpMenu.on('mousemove', function(event) {
		if (helpTimer) clearTimeout(helpTimer);
		ui.helpMenu.fadeIn(300);
		helpTimer = null;
		return false;
	}).on('mousedown', function(event) {
		return false;
	});

	//显示UI
	ui.container.show();
}(jQuery, window));