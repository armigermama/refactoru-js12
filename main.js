$(function(){

	var quoteArray = [];

	$('#submit-quote-button').on('click', function(e){
		e.preventDefault();
		var quote = {};
		quote.quote = $('.quote').val();
		quote.author = $('.author').val();
		quote.rating = 0;
		quote.deleted = false;
		quote.timeStamp = new Date().getTime();
		quoteArray.push(quote);
		// console.log(quoteArray);
		renderList();
	});

	var renderList = function(){
		
		var buildLi = function(quoteObj){
			var li = '<li data-timestamp={timeStamp}>\
						<section>\
						<blockquote>\
						<p>\"{quote}\"</p>\
						</blockquote>\
						<div class=\"clearfix\">\
						<div class=\"float-right\">{author}</div>\
						<div class=\"float-left\">'.supplant(quoteObj);
				for (var i=0; i<quoteObj.rating; i++) {
					li+='<img class=\"star\" src=\"images/star-yellow.png\">';
				}

				for (i=quoteObj.rating; i<5; i++) {
					li+='<img class=\"star\" src=\"images/star-white.png\">';
				}

					li+='</div>\
						</div>\
						</section>\
						</li>';
						// console.log(li);
			return $(li);
		};

		$('#quote-list').empty();

		quoteArray.sort(function(a,b){
				//TODO  maybe sort by obj.timestamp
				if (a.rating === b.rating){
					if (a.timeStamp < b.timeStamp)
						return 1;
					if (a.timeStamp > b.timeStamp)
						return -1;
					return 0;
				}
				if (a.rating < b.rating)
					return 1;
				if (a.rating > b.rating)
					return -1;
				return 0;
			
		});

	
		console.log(quoteArray);

		for (var j=0; j<quoteArray.length; j++) {
			//console.log(quoteArray.length);
			$('#quote-list').prepend(buildLi(quoteArray[j]));
		}
	};

	$(document).on('click','.star',function(){
		var timeStamp = parseInt($(this).closest('li').attr('data-timestamp'));
				//console.log(timeStamp);
				//console.log(quoteArray[0].timeStamp);
		for (var k=0; k<quoteArray.length; k++) {
			if (quoteArray[k].timeStamp === timeStamp){

				quoteArray[k].rating = ($(this).parent().find("img").index(this) + 1);
			}


		//console.log(quoteArray[k].rating);
		}
	});






});