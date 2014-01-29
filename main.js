$(function(){

// an array of quote objects.
	var quoteArray = [];
	var deletedArray = [];

// function to render entire quote list 
// sorted according to rating first, timestamp second.
	var renderList = function(){
		

		$('#quote-list').empty();

		quoteArray.sort(function(a,b){
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

	
		//console.log(quoteArray);

		for (var j=0; j<quoteArray.length; j++) {
			if (!quoteArray[j].deleted){
				$('#quote-list').append(buildLi(quoteArray[j]));
			}
		}
	};

	var buildLi = function(quoteObj){
		var li = '<li data-timestamp={timeStamp}>\
					<section>\
					<blockquote>\
					<p>\"{quote}\"</p>\
					</blockquote>\
					<div class=\"clearfix\">\
					<div class=\"float-right delete-button\"><button>deletinator</button></div>\
					<div class=\"float-right author-filter\">- {author} -</div>\
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
		return $(li);
	};


//submit form to create quote object.  
//adds timestamp as unique ID

	$('#submit-quote-button').on('click', function(e){
		e.preventDefault();
		if ($('.quote').val() === '') {
			$('.quote').attr('placeholder', 'curse you perry the platypus!');
			return;
		}
		if ($('.author').val() === '') {
			$('.author').attr('placeholder', 'Dr. Doofenshmirtz');
			return;
		}
		var quote = {};
		quote.quote = $('.quote').val();
		quote.author = $('.author').val();
		quote.rating = 0;
		quote.deleted = false;
		quote.timeStamp = new Date().getTime();
		quoteArray.push(quote);
		renderList();
	});

///Set rating when clicking on any star
// and replacing parent li with newly rendered li
	$(document).on('click','.star',function(){
		var timeStamp = parseInt($(this).closest('li').attr('data-timestamp'));
		for (var k=0; k<quoteArray.length; k++) {
			if (quoteArray[k].timeStamp === timeStamp){
				quoteArray[k].rating = ($(this).parent().find("img").index(this) + 1);
				$(this).closest("li").replaceWith(buildLi(quoteArray[k]));
			}

		}
	});

	$(document).on('click','.author-filter',function(){
		// var containsAuthor = $(".author-filter:contains(" + $(this).text() + ")").closest("li");
		// console.log(containsAuthor);
		// var notContainsAuthor = $("#quote-list li").not(containsAuthor);
		// $(notContainsAuthor).toggle();
		var author = $(this).text();
		$('.author-filter').filter(function(){
			return $(this).text() !== author;
		}).closest('li').toggle();


	});

	$(document).on('click','.delete-button',function(){
		// console.log("indeletedbuttonhandler");
		// console.log(deletedArray);
		var timeStamp = parseInt($(this).closest('li').attr('data-timestamp'));
		for (var k=0; k<quoteArray.length; k++) {
			if (quoteArray[k].timeStamp === timeStamp){
				quoteArray[k].deleted = true;
				deletedArray.push(quoteArray[k].timeStamp);
				
				renderList();
				$('#undo-button').show();
			}
		}
		// console.log(deletedArray);
	});

	$(document).on('click','#undo-button',function(){
		// console.log("inundobuttonhandler");
		// console.log(deletedArray);
		for (var g=0; g<quoteArray.length; g++) {
			if (quoteArray[g].timeStamp === deletedArray[deletedArray.length-1]){
				quoteArray[g].deleted = false;
				//console.log(deletedArray);
				renderList();
				
				if (deletedArray.length === 0){
					$('#undo-button').hide();
				}
			}
		}
		deletedArray.pop();
		// console.log(deletedArray);
	});

	$(document).on('click','#random-button',function(){
		var randomQuote = quoteArray[Math.floor(Math.random()*quoteArray.length)];
		$('.pop-up').find('p').text('"' + randomQuote.quote + '"');
		$('.pop-up').find('div').text('-' + randomQuote.author + '-');
		$('.pop-up').toggle();
	});

	$(document).on('click','#close-button',function(){
		$('.pop-up').toggle();
	});

});