
var widgetBox = function(options, element){
	this.name = "Box";
	this.options = options;
	this.element = element;
	this.currentIndex = currentIndex || 0;
	this._init();
}

widgetBox.prototype = {
	_create: function(){
		$(body).append("<div id="box"></div>");

		$("#box").append("<div id="box-img">"this.divImg[currentIndex]"</div>");		//вставить картинку
		$("#box").append("<span id="box-title">"this.divTitle[currentIndex]"</span>"); //вставить название
		$("#box").append("<div id="box-description"></div>");
		$("#box").append("<span class="str-show-details">Show details</span>"); //сделать вначале видимым
		$("#box").append("<span class="str-hide-details">Hide details</span>"); //сделать вначале невидимым
		$("#box").append("<div id="box-details"></div>"); //вставить детали

		$("#box").append("<div class="btn-container"></div>");
		$(".btn-container").append("<div id="btn-back"></div>");
		$(".btn-container").append("<div id="btn-next"></div>");
		$(".btn-container").append("<div id="btn-find">Find A store</div");
	},

	_init: function(){
		$(document).ready(function(){
			$("#box").find("#btn-back").on('click', function() { 
				v_this.step = -1; 
				changeBox();
			});
			$("#box").find("#btn-next").on('click', function() { 
				v_this.step = 1; 
				changeBox();
			});

			$("#box").find("#btn-find").on("click", functin() { //сформировать ссылку
				window.location.assign("http://" + window.location.href + url);
			});

    		$(".str-show-details").click(function(){
    			$("#box-img").SlideUp()
        		$(".str-show-details").hide();
        		$(".str-hide-details").show();
        		$("#box-details").SlideDown();
    		});
	    	$(".str-hide-details").click(function(){
    			$("#box-img").SlideDown()
        		$(".str-show-details").show();
        		$(".str-hide-details").hide();
        		$("#box-details").SlideUp();
    		});
		})
	},

	getDataJSON: function(){
		var dataBase = C:\Users\Julia\Desktop\learn_projects\jquery-widget\data.json;
		$.getJSON(dataBase, function(data){
			this.title =  data.title;
			this.img = data.img;
			this.description = data.description;
			this.note = data.note;
			this.productUrl = data.productUrl;
		})
	},


	changeBox = function(){
		this.divTitle = this.title[this.currentIndex];
		this.divImg.src = this.img[this.currentIndex];
		this.divDescription = this.description[this.currentIndex];
		this.divNote = this.note[this.currentIndex];
		this.divProductUrl = this.productUrl[this.currentIndex];
	},


	determineCurrentIndex = function() {
    	if (this.step <= 0) {
      		this.currentIndex = this.currentIndex + this.step < 0 ? this.array.length + this.step : this.currentIndex + this.step;
    	} else {
      		this.currentIndex = this.currentIndex + this.step > this.array.length - this.step ? 0 : this.currentIndex + this.step;
    	} 
	};


 

$(document).ready(function(){
	$(".btn").click(function(){
		//create widget
	})
})