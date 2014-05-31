var statistics = statistics || {};

statistics.init = function() {
	$('.add-btn').click(function(){
		var btn = $(this);
		var newSt = btn.prev().val().trim();
		if(newSt.length > 0) {
			btn.attr('disabled','disabled');
			$.post('/admin/statistics/new/', {name: newSt}, function(d){
				statistics.DOM.list.append(d);
				btn.removeAttr('disabled');
				btn.prev().val('');
			});
		}
	});
	$('body').on('click', '.update-btn', function(){
		var btn = $(this);
		var newSt = btn.prev().prev().val().trim();
		if(newSt.length > 0) {
			var status = btn.next().next().stop().html('Updating...').show().css('opacity','1');
			$.post('/admin/statistics/'+btn.prev().val()+'/update/', {name: newSt}, function(){
				status.html('Updated!').fadeOut(4000);
			});
		}
	});
	$('body').on('click', '.delete-btn', function(){
		var btn = $(this);
		if (window.confirm("Confirm deletion")) { 
			$.post('/admin/statistics/'+btn.prev().prev().val()+'/delete/', function(){
				btn.parent().fadeOut(400, function(){$(this).remove();});
			});  			
		}
	});
}

statistics.DOM = {
	list: $('.statistics')
}

$(function(){
	statistics.init();
});