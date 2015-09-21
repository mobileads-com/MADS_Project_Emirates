var mads = function(){
	if (typeof custTracker == 'undefined' && typeof rma != 'undefined') {
		this.custTracker = rma.customize.custTracker;
	} else if (typeof custTracker != 'undefined') {
		this.custTracker = custTracker;
	} else {
		this.custTracker = [];
	}

	/* Unique ID on each initialise */
	this.id = this.uniqId();
	
	/* Tracked tracker */
	this.tracked = [];
	
	/* Body Tag */
	this.bodyTag = document.getElementsByTagName('body')[0];
	
	/* Head Tag */
	this.headTag = document.getElementsByTagName('head')[0];
	
	/* RMA Widget - Content Area */
	this.contentTag = document.getElementById('rma-widget');
	
	/* URL Path */
	this.path = typeof rma != 'undefined' ? rma.customize.src : '';
}

/* Generate unique ID */
mads.prototype.uniqId = function () { return new Date().getTime(); }

/* Link Opner */
mads.prototype.linkOpener = function (url) {
	if(typeof url != "undefined" && url !=""){
		if (typeof mraid !== 'undefined') {
			mraid.open(url);
		}else{
			window.open(url);
		}
	}
}

/* Tracker */
mads.prototype.tracker = function (tt, type, name) {
    /* 
    * name is used to make sure that particular tracker is tracked for only once 
    * there might have the same type in different location, so it will need the name to differentiate them
    */
    name = name || type; 
    
    if ( typeof this.custTracker != 'undefined' && this.custTracker != '' && this.tracked.indexOf(name) == -1 ) {
        for (var i = 0; i < this.custTracker.length; i++) {
            var img = document.createElement('img');
            
            /* Insert Macro */
            var src = this.custTracker[i].replace('{{type}}', type);
            src = src.replace('{{tt}}', tt);
            /* */
            img.src = src + '&' + this.id;
            
            img.style.display = 'none';
            this.bodyTag.appendChild(img);
            
            this.tracked.push(name);
        }
    }
};

/* Load JS File */
mads.prototype.loadJs = function (js, callback) {
    var script = document.createElement('script');
    script.src = js;
    
    if (typeof callback != 'undefined') {
        script.onload = callback;
    }
    
    this.headTag.appendChild(script);
}

/* Load CSS File */
mads.prototype.loadCss = function (href) {
    var link = document.createElement('link');
    link.href = href;
    link.setAttribute('type', 'text/css');
    link.setAttribute('rel', 'stylesheet');
    
    this.headTag.appendChild(link);
}

var emirates = function(){
	var _this = this;
	var app = new mads();
	app.loadCss(app.path + 'css/style.css');
	app.loadCss(app.path + 'css/bootstrap.min.css');
	
	this.data = {};

	app.contentTag.innerHTML ='<div class="background-large animated" id="widget"><div class="banner"><p>Emirates flies over 140 destinations over 6 continents</p><img src="'+ app.path +'img/logo.png" class="img-responsive" alt="Image"></div><div class="content-holder content-animated"><form id="form-location" name="form-location"><h3>Guess this beautiful European destination:</h3><div class="form-group"><input type="text" class="form-control" id="location" name="location" placeholder="" required autofocus></div><button type="submit" class="btn btn-default center-block">GO</button></form><form id="form-details" name="form-details" class="hidden"><h3>Submit your entry to stand a chance to win a return ticket to one of our beautiful European destinations.</h3><div class="form-group"><input type="text" class="form-control" id="name" placeholder="Name" required></div><div class="form-group"><input type="email" class="form-control" id="email" placeholder="Email" required></div><div class="form-group"><p class="text-center notify hidden">Hello</p></div><button type="submit" class="btn btn-default center-block" id="btn">SUBMIT</button></form></div><div class="thankyou hidden"><h2>Thank You</h2><br><h3>For Participating. Good Luck!</h3></div></div>';
	this.loadLeadgen = function () {
		app.loadJs(app.path + 'js/leadgen.js', function() {
			
			/* Form Submission */
			$('#form-details').leadgen({
				email : 'EmiratesInfo119@gmail.com',
				input : [{'fieldname':'text_1','value':'#name'}, {'fieldname':'text_4','value':'#email'}, {'fieldname':'text_5','value':'#location'}],
				tabId : 1,
				studioId : 2, 
				userId : 2947,
				successCallback : function(jsonObject){
					
					console.log(jsonObject);
					
					$('.animated').removeClass('background-large').addClass('background-ty');
					$('.content-holder, .banner').addClass('hidden');
					$('.thankyou').removeClass('hidden');
				},
				errorCallback : function () {
					$('.notify').removeClass('hidden').text('Please try again.');
					$('#form-details button').css('margin-top', '54px');
				}
			});
		});
	}
    app.loadJs(app.path + 'js/jquery-1.11.3.min.js', this.loadLeadgen);
    
	document.getElementById('location').focus();

	document.getElementById('form-location').addEventListener('submit', function(event){
		_this.data.location = $('#location').val();
		$('#form-location').addClass('hidden');
		$('#form-details').removeClass('hidden');
		$('#name').focus();
		event.preventDefault();
	});

	document.getElementById('form-details').addEventListener('submit', function(event){
		event.preventDefault();
		$('.notify').addClass('hidden').text('');
		$('#form-details button').css('margin-top', '92px');
        
		// _this.data.name = document.getElementById('name').value;
		// _this.data.email = document.getElementById('email').value;
		// $.post('sub.htm', { location: _this.data.location, name: _this.data.name, email: _this.data.email }).fail(function(){
		// 	$('.notify').removeClass('hidden').text('Please try again.');
		// 	$('#form-details button').css('margin-top', '54px');
		// }).done(function(){
		// 	document.getElementById('widget').removeEventListener('click', _this.eventHandler, false);
		// 	$('.animated').removeClass('background-large').addClass('background-ty');
		// 	$('.content-holder, .banner').addClass('hidden');
		// 	$('.thankyou').removeClass('hidden');
		// });
        
	});
}
var e = new emirates();