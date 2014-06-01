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
	$('body').on('click', '.update-btn', function(){
		var btn = $(this);
		var form = btn.prev().prev();
		var newSt = form.find('input[name="question"]').val();
		if(newSt.length > 0) {
			form.find('input[type="number"]').each(function(){
				var elem = $(this);
				var value = parseInt(elem.val(), 10);
				value = isNaN(value) ? 0 : value;
				value = value < -5 ? -5 : value;
				value = value > 5 ? 5 : value;
				elem.val(value);
			});
			var status = btn.next().next().stop().html('Updating...').show().css('opacity','1');
			$.post('/admin/rounds/'+btn.prev().val()+'/update/', form.serialize(), function(){
				status.html('Updated!').fadeOut(4000);
			});
		}
	});
	$('body').on('click', '.delete-btn', function(){
		var btn = $(this);
		if (window.confirm("Confirm deletion")) { 
			$.post('/admin/rounds/'+btn.prev().prev().val()+'/delete/', function(){
				btn.parent().fadeOut(400, function(){$(this).remove();});
			});  			
		}
	});
}

rounds.DOM = {
	list: $('.rounds')
}

$(function(){
	rounds.init();
});