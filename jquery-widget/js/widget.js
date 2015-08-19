;(function(){

	'use strict';

	function templater(string, data){
		return string.replace(/\$([^\$]+)\$/g, function (match_string, param_name) {
			return data[param_name];
		});
	}


	var WidgetBox = function(widgetContainer, widgetData){
		this.box = $("<div class='box'></div>");
		this.data = widgetData;
		this.init();
		widgetContainer.append(this.box);
	};

	WidgetBox.prototype.init = function(){
		this.currentIndex = 0;
		this.slides = [];
		this.currentSlide = this.slides[this.currentIndex];
		this.createBox(this.data);
		this.addEvents();
		this.changeSlide(this.currentIndex);
	};

	WidgetBox.prototype.createBox = function(data) {
		this.data = data; 
		var boxContainer = $('<div class="box-container"></div>');
		var boxContent =  '<div class="box-img"><img src="$img$"><div class="box-title">$title$</div>'+
						  '<div class="box-description">$description$</div><div class="box-note hide-slide">$note$</div>'+
						  '<div class="box-productUrl hide-slide">$productUrl$</div></div>';
		for(var i = 0; i < this.data.length; i += 1) {
			var item = $(templater(boxContent, this.data[i]));
			boxContainer.append(item);
			this.slides.push(item);
		}
		this.box.append(boxContainer);
		this.box.append("<span class='str-show-details str'>Show details</span>"); 
		this.box.append("<span class='str-hide-details str hide-slide'>Hide details</span>"); 
		this.btnContainer = $("<div class='btn-container'></div>");
		this.btnContainer.append("<div class='btn-back'><span class= 'btn-pointer'></span><span class= 'btn-navig'>Back</span></div>");
		this.btnContainer.append("<div class='btn-next'><span class= 'btn-pointer'></span><span class= 'btn-navig'>Next</span></div>");
		this.btnContainer.append("<div class='btn-find'><span class= 'btn-navig'>Find A store</span></div");
		this.box.append(this.btnContainer);
	};


	WidgetBox.prototype.addEvents = function(){
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
        		$(v_this.currentSlide).find("img").hide();
    		});
	    	$(".str-hide-details").on("click", function() {
        		$(".str-show-details").show();
        		$(".str-hide-details").hide();
        		$(".box-note").addClass('hide-slide');
        		$(v_this.currentSlide).find("img").show();
    		});
		});
	};

	WidgetBox.prototype.setCurrentIndex = function() {
		if (this.step <= 0) {
      		this.currentIndex = this.currentIndex + this.step < 0 ? this.data.length + this.step : this.currentIndex + this.step;
    	} else {
      		this.currentIndex = this.currentIndex + this.step > this.data.length - this.step ? 0 : this.currentIndex + this.step;
    	}
    	this.changeSlide(this.currentIndex);
	};

	WidgetBox.prototype.changeSlide = function(index) {
		for (var i = 0; i < this.data.length; i += 1) {
			$(this.slides[i]).addClass('hide-slide');
		}
    	this.currentSlide = this.slides[index];
    	if (this.currentSlide) {
    		this.currentSlide.removeClass('hide-slide');
    	}
	};


 
	window.onload = function() {
		$(document).ready(function(){
			$(".btn").click(function(){
				$(function(){
					new WidgetBox($('body'), [
        				{
            				"title": "Time to Share: 6 for $3.99*",
            				"img": "img/comp_plate_promo1.png",
            				"description": "Lorem ipsum dolor sit amet. consectetur adipisicing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exefcitalion ullamoo laboris nisi ut aliquip ex ea commodo oonsequat.",
            				"note": "* At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga.",
            				"productUrl": "/products/promo1.html"
        				},
        				{
            				"title": "Rise 'n shine",
            				"img": "img/comp_plate_promo2.png",
            				"description": "Lorem ipsum dolor sit amet. consectetur adipisicing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exefcitalion ullamoo laboris nisi ut aliquip ex ea commodo oonsequat.",
            				"note": "* At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga.",
            				"productUrl": "/products/promo2.html"
        				},
        				{
            				"title": "PM Snackers: Brownie Bites",
            				"img": "img/comp_plate_promo3.png",
            				"description": "Lorem ipsum dolor sit amet. consectetur adipisicing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exefcitalion ullamoo laboris nisi ut aliquip ex ea commodo oonsequat.",
            				"note": "* At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga.",
            				"productUrl": "/products/promo3.html"
        				},
        				{
            				"title": "PM Snackers: Brownie Bites new",
            				"img": "img/comp_plate_promo4.png",
            				"description": "Lorem ipsum dolor sit amet. consectetur adipisicing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exefcitalion ullamoo laboris nisi ut aliquip ex ea commodo oonsequat.",
            				"note": "* At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga. * At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga.\n* At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga.\n* At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga.",
            				"productUrl": "/products/promo4.html"
        				}
    				]);
    			});
			})
		})
	}

})();