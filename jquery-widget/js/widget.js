;(function(){

	'use strict';

	function templater(string, data){
		return string.replace(/\$([^\$]+)\$/g, function (match_string, param_name) {
			return data[param_name];
		});
	}

	var WidgetBox = function(widgetContainer, widgetData, widgetAnimation){
		this.box = $("<div>").attr("class", "box");
		this.data = widgetData;
		this.dataAnimation = widgetAnimation;
		console.log(this.dataAnimation.animationEffect);
		widgetContainer.append(this.box);
		this._init();
	};


	WidgetBox.prototype = {
		_create: function(){
			var boxContainer = $("<div>").attr("class", "box-container");
			var boxContent =  '<div class="box-img"><img src="$img$"><div class="box-title">$title$</div>'+
						  	  '<div class="box-description">$description$</div><div class="box-note hide-slide">$note$</div>'+
						  	  '<div class="box-productUrl hide-slide">$productUrl$</div></div>';
			for(var i = 0; i < this.data.length; i += 1) {
				var item = $(templater(boxContent, this.data[i]));
				boxContainer.append(item);
				this.slides.push(item);
			}
			this.box.append(boxContainer);
			this.box.append($("<span>").attr("class", "str-show-details str").text("Show details"));
			this.box.append($("<span>").attr("class", "str-hide-details str hide-slide").text("Hide details"));
			var btnContainer = $("<div>").attr("class", "btn-container");
			btnContainer.append($("<div>").attr("class", "btn-back").html("<span class= 'btn-pointer-left'></span><span class= 'btn-text btn-navig-left'>Back</span>"));
			btnContainer.append($("<div>").attr("class", "btn-next").html("<span class= 'btn-pointer-right'></span><span class= 'btn-text btn-navig-right'>Next</span>"));
			btnContainer.append($("<div>").attr("class", "btn-find").html("<span class= 'btn-pointer-find'></span><span class= 'btn-text-find'> Find A store</span>"));
			this.box.append(btnContainer);
		},

		_init: function(){
			this.currentIndex = 0;
			this.slides = [];
			this.currentSlide = this.slides[this.currentIndex];
			this._create();
			this.addEvents();
			this.changeSlide(this.currentIndex);
		},

		addEvents: function(){
			var v_this = this;
			$(document).ready(function(){
				$(".btn-back").on('click', function() { 
					v_this.step = -1; 
					v_this.setCurrentIndex();
				});
				$(".btn-next").on('click', function() { 
					v_this.step = 1;
					v_this.setCurrentIndex();
				});

				$(".btn-find").on("click", function() {
					var productUrl = $(v_this.currentSlide).find(".box-productUrl").html();
					window.location.assign("http://" + window.location.href + productUrl);
				});

    			$(".str-show-details").on("click", function() {
           			$(".str-show-details").hide();
        			$(".str-hide-details").show();
        			$(".box-note").removeClass('hide-slide');
					$(v_this.currentSlide).find("img").animate(v_this.dataAnimation.properties, v_this.dataAnimation.options);
    			});
	    		$(".str-hide-details").on("click", function() {
        			$(".str-show-details").show();
        			$(".str-hide-details").hide();
        			$(".box-note").addClass('hide-slide');
        			$(v_this.currentSlide).find("img").animate(v_this.dataAnimation.properties, v_this.dataAnimation.options);

    			});
			});
		},

		setCurrentIndex: function(){
			if (this.step <= 0) {
      			this.currentIndex = this.currentIndex + this.step < 0 ? this.data.length + this.step : this.currentIndex + this.step;
    		} else {
      			this.currentIndex = this.currentIndex + this.step > this.data.length - this.step ? 0 : this.currentIndex + this.step;
    		}
    		this.changeSlide(this.currentIndex);
		},

		changeSlide: function(index){
			for (var i = 0; i < this.data.length; i += 1) {
				$(this.slides[i]).addClass('hide-slide');
			}
    		this.currentSlide = this.slides[index];
    		if (this.currentSlide) {
    			this.currentSlide.removeClass('hide-slide');
    		}
		}

	}
 
	window.WidgetBox = WidgetBox;

})();