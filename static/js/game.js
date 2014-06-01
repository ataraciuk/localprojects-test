var game = game || {};

game.init = function() {
	game.showQuestion();
	for(stat in game.statistics) {
		var val = game.statistics[stat];
		game.DOM.results.append('<tr id="'+stat+'"><td class="negative"><div class="negative-bar"></div></td><td class="sname">'+val.name+':</td><td class="score">'+0+'</td><td class="positive"><div class="positive-bar"></div></td></tr>');
	}
	$('.add-btn, .delete-btn').click(function(){
		console.log(game.currentRound);
		var choice = $(this).hasClass('add-btn') ? 'yes' : 'no';
		var roundChoice = game.rounds[game.currentRound][choice];
		for(stat in game.statistics) {
			var val = game.statistics[stat];
			var mod = roundChoice[stat] || 0;
			var negLength, posLength;
			val.score += mod;
			var row = game.DOM.results.find('tr#'+stat);
			row.find('td.score').html(val.score);
			if(val.score >= 0) {
				negLength = 0;
				posLength = val.score * 100 / game.maxScore;
			} else {
				negLength = -1 * val.score * 100 / game.maxScore;
				posLength = 0;
			}
			row.find('.negative-bar').animate({width: negLength+"%"});
			row.find('.positive-bar').animate({width: posLength+"%"});
		}
		$('#question, input[type="button"]').hide();
		game.currentRound++;
		if(game.currentRound < game.rounds.length) {
			game.showQuestion();
			game.DOM.question.fadeIn(400, function(){$('input[type="button"]').show();});
		} else {
			game.DOM.question.html('Finish!');
			game.DOM.question.fadeIn();
		}
	});
};

game.statistics = {};
game.rounds = [];
game.currentRound = 0;
game.DOM = {
	question: $("#question"),
	results: $('table')
};

game.showQuestion = function() {
	game.DOM.question.html(game.rounds[game.currentRound].question);
}