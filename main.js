$(function(){

	var quoteArray = [];

	$('#submit-quote-button').on('click', function(e){
		e.preventDefault();
		var quote = {};
		quote.quote = $('.quote').val();
		quote.author = $('.author').val();
		quote.rating = 0;
		quote.deleted = false;
		quote.timeStamp = 'quote_' + new Date().getTime().toString();
		quoteArray.push(quote);
		console.log(quoteArray);
		renderList();
	});



	var renderList = function(){
		
		var buildLi = function(quoteObj){
			var li = $('<li>\
						<section>\
						<blockquote>\
						<p>\"{quote}\"</p>\
						</blockquote>\
						<div class=\"clearfix\">\
						<div class=\"float-right\">{author}</div>\
						<div class=\"float-left\">\
						<img src=\"images/star-white.png\">\
						<img src=\"images/star-white.png\">\
						<img src=\"images/star-white.png\">\
						<img src=\"images/star-white.png\">\
						<img src=\"images/star-white.png\">\
						</div>\
						</div>\
						</section>\
						</li>'.supplant(quoteObj));
			return li;
		};

		$('#quote-list').empty();
		
		for (i=0; i<quoteArray.length; i++) {
			$('#quote-list').prepend(buildLi(quoteArray[i]));
		}
	};

















});