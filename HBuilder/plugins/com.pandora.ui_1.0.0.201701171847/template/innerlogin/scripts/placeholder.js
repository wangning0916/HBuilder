/**
 * By Houfeng
 * Houfeng@DCloud.io
 * IE6/7/8/9 兼容 placeholder 支持
 * */
(function($) {
	var color = '#aaa';
	var items = $('[placeholder]');
	var guid = 0;
	items.each(function() {
		var item = $(this);
		var placeholder = item.attr('placeholder');
		var boxId = item.attr('id') || "input" + (++guid);
		var wrap = $("<label for='" + boxId + "'></label>");
		wrap.height(item.outerHeight()).width(item.outerWidth()).css({
			'display': 'inline-block',
			'zoom': '1',
			'line-height': item.outerHeight() + 'px',
			'position': 'relative',
			'margin-top': item.css('margin-top'),
			'margin-right': item.css('margin-right'),
			'margin-bottom': item.css('margin-bottom'),
			'margin-left': item.css('margin-left'),
			'color': color,
			'background-color': item.css('background-color'),
			'background': item.css('background'),
			//'padding-top': item.css('padding-top'),
			//'padding-right': item.css('padding-right'),
			//'padding-bottom': item.css('padding-bottom'),
			'padding-left': item.css('padding-left'),
			"font-size": item.css('font-size'),
			"font-family": item.css('font-family'),
			'cursor': 'text',
			'text-align': 'left'
		});
		item.wrap(wrap);
		item.css({
			'position': 'absolute',
			'left': '0px',
			'top': '0px',
			'background-color': 'transparent',
			'background': 'transparent',
			'z-index': '9'
		});
		item.parent().append("<span style='cursor:text;'>" + placeholder + "</span>");
		var inputHandler = function(event) {
			var box = $(this);
			var label = box.parent().find('span');
			var placeholder = box.attr('placeholder');
			label.text(box.val() == '' ? placeholder : '　');
		};
		item.on('propertychange input keyup change', inputHandler);
		item.attr('id', boxId);
	});
}(jQuery));