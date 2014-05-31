var rounds = rounds || {};

rounds.init = function() {
	$('.add-btn').click(function(){
		var btn = $(this);
		var newSt = btn.prev().val().trim();
		if(newSt.length > 0) {
			btn.attr('disabled','disabled');
			$.post('/admin/rounds/new/', {question: newSt}, function(d){
				rounds.DOM.list.append(d);
				btn.removeAttr('disabled');
				btn.prev().val('');
			});
		}
	});
}

rounds.DOM = {
	list: $('.statistics')
}

$(function(){
	rounds.init();
});