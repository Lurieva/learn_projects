;(function(){
 
   'use strict' 


    function Slider(param){
   		this.images = param.images;
   		this.mode = param.mode;
   		this.swipeSpeed = param.swipeSpeed;
   		this.swipeDelay = param.swipeDelay;
   		this.initSlider();
    }

    Slider.prototype.initSlider = function(){
    	this.currentIndex = 0;
    	this.createSlider();
    	this.addEvents();
      this.touchEvents();
    }

    Slider.prototype.createSlider = function(){
      var container = document.body.addElem('div', {className : "container"});
      //this.image = container.addElem('img', {className : "image", src : this.images[this.currentIndex]});
      this.imageFirst = container.addElem('img', {className : "imageFirst", src : this.images[0]});
    	this.image = container.addElem('img', {className : "image", src : this.images[this.currentIndex]});
      container.addElem('div', {className : "div1"});
      container.addElem('div', {className : "div2"});
    }


    Slider.prototype.previous = function(){
      this.currentIndex = this.currentIndex - 1 < 0 ? this.images.length - 1 : this.currentIndex - 1;
      this.image.src = this.images[this.currentIndex];
      this.imageFirst.src = this.images[this.currentIndex + 1 > this.images.length - 1 ? 0 : this.currentIndex + 1]; 
    }

    Slider.prototype.next = function(){
      this.currentIndex = this.currentIndex + 1 > this.images.length - 1 ? 0 : this.currentIndex + 1;
      this.image.src = this.images[this.currentIndex];
      this.imageFirst.src = this.images[this.currentIndex - 1 < 0 ? this.images.length - 1 : this.currentIndex - 1];
    }

    Slider.prototype.touchEvents = function(){
      var v_this = this;
      var initialPoint;
      var finalPoint;
      document.addEventListener('touchstart', function(event) {
        event.preventDefault();
        event.stopPropagation();
        initialPoint = event.changedTouches[0];
      });
      document.addEventListener('touchend', function(event) {
        event.preventDefault();
        event.stopPropagation();
        finalPoint = event.changedTouches[0];
        var x = Math.abs(initialPoint.pageX - finalPoint.pageX);
        var y = Math.abs(initialPoint.pageY - finalPoint.pageY);
        if (x > 20 || y > 20) {
          if (x > y) {
            if (finalPoint.pageX > initialPoint.pageX){
              v_this.previous();
            }
            else {
              v_this.next();
            }
          }
        }
      });
    }


    Slider.prototype.addEvents = function(){
      var v_this = this;
      if (v_this.mode.indexOf('manual') !== -1){
        document.querySelector('.div1').addEventListener('click', function(){
          v_this.previous();
        });   
        document.querySelector('.div2').addEventListener('click', function(){
          v_this.next();
        });
      }
      if (v_this.mode.indexOf('auto') !== -1) {
        var interval = setInterval(function(){
          v_this.next();
        }, v_this.swipeDelay);
      }
    }



	window.onload = function() {
    var config = new Slider({
      images: [
        '../slider/img/1.jpg',
        '../slider/img/2.jpg',
        '../slider/img/3.jpg',
        '../slider/img/4.jpg',
        '../slider/img/5.jpg'
      ],
      mode: 'manual',
      swipeSpeed: 1000,
      swipeDelay: 2000
    });

	}

})();
