$(function(){

// an array of quote objects.
	var quoteArray = [];

// function to render entire quote list 
// sorted according to rating first, timestamp second.
	var renderList = function(){
		

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
			$('#quote-list').append(buildLi(quoteArray[j]));
		}
	};

	var buildLi = function(quoteObj){
		var li = '<li data-timestamp={timeStamp}>\
					<section>\
					<blockquote>\
					<p>\"{quote}\"</p>\
					</blockquote>\
					<div class=\"clearfix\">\
					<div class=\"float-right author-filter\">{author}</div>\
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


//submit form to create quote object.  
//adds timestamp as unique ID

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

///Set rating when clicking on any star
// and replacing parent li with newly rendered li
	$(document).on('click','.star',function(){
		var timeStamp = parseInt($(this).closest('li').attr('data-timestamp'));
				//console.log(timeStamp);
				//console.log(quoteArray[0].timeStamp);
		for (var k=0; k<quoteArray.length; k++) {
			if (quoteArray[k].timeStamp === timeStamp){
				quoteArray[k].rating = ($(this).parent().find("img").index(this) + 1);
				$(this).closest("li").replaceWith(buildLi(quoteArray[k]));
			}


		//console.log(quoteArray[k].rating);
		}
	});

		$(document).on('click','.author-filter',function(){
			//console.log($(this).text());
			//$(this);
			var containsAuthor = $(".author-filter:contains(" + $(this).text() + ")").closest("li");
			console.log(containsAuthor);
			var notContainsAuthor = $("#quote-list li").not(containsAuthor);
			$(notContainsAuthor).toggle();


	});

});