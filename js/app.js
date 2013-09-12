get_html = function(url) {
	return $.ajax({
		url: url,
		dataType: 'html',
		processData: false
	});
};

append_names = function(collection, el) {
	$(collection).each(function(k, v) {
		var name = $('<p/>', {
			html: $('<a/>', {
				href: $(v).closest('table').find('h3 a').prop('href'),
				html: $(v).closest('table').find('h3').text()
			})
		});

		if (collection.length > 50) {
			$(name).addClass('left');
		};

		$(el).children('div').append(name);
	});
};

$(function() {

	$("#loading").ajaxStart(function(){
	  	$(this).show();
	});

	$(document).ajaxStop(function(){
	  	$('#loading').hide();
	});

	var html, mythic, rare, uncommon, common, mythicElement, rareElement, uncommonElement, commonElement;

	$.when(get_html('get_html.php')).then(function(data, textStatus, jqXHR) {
		html = $(data);

		mythic = $(html).find('img[alt="Mythic Rare"]');
		rare = $(html).find('img[alt="Rare"]');
		uncommon = $(html).find('img[alt="Uncommon"]');
		common = $(html).find('img[alt="Common"]');

		mythicElement = $('<div/>', {
			class: 'mythic',
			html: $('<div/>').append($('<p/>', {
				html: mythic.length + '/15'
			}))
		});

		append_names(mythic, mythicElement);

		rareElement = $('<div/>', {
			class: 'rare',
			html: $('<div/>').append($('<p/>', {
				html: rare.length + '/53'
			}))
		});

		append_names(rare, rareElement);

		uncommonElement = $('<div/>', {
			class: 'uncommon',
			html: $('<div/>').append($('<p/>', {
				html: uncommon.length + '/80'
			}))
		});

		append_names(uncommon, uncommonElement);

		commonElement = $('<div/>', {
			class: 'common',
			html: $('<div/>').append($('<p/>', {
				html: common.length + '/101'
			}))
		});

		append_names(common, commonElement);

		$('#rarities').append([mythicElement, rareElement, uncommonElement, commonElement]);
	});

});