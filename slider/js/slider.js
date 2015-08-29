;(function(){
 
   'use strict' 



    function fadeIn(elem, delay) {
      var delay = delay || 100;
      if (!elem) {
        return;
      }
      //changeClass.addClass(elem, 'fade-style');
      elem.style.opacity = 0.1;
      elem.style.display = 'block';
      elem.style.visibility = 'visible';
      var op = 0.1;
      var timer = setInterval(function() {
        if (op >= 1) {
          clearInterval(timer);
          op = 1;
        }
        elem.style.opacity = op;
      }, delay);
    }

    function animation(func, speed) {
      var speed = speed || 100;
      var start = Date.now();
      if (!func) {
        return;
      }
      var timer = setInterval(function(){
        var timePassed = Date.now() - start;
        if (timePassed >= speed) {
          clearInterval(timer);
          return;
        }
        func(timePassed);
      })
    }

    /*function fade(element, speed, delay) {
      var speed = speed || 100;
      var delay = delay || 150;
      if (!elem) {
        return false;
      }
      var op = 1; 
      var timer = setInterval(function(){
        setTimeout(function(){
          if (op == 0){
            clearInterval(timer);
            element.style.display = 'none';
          }
          element.style.opacity = op;
          op -= op * 0.1;
        }, delay)
      }, speed);
    }*/




    var bind = (function(){
      function bind(obj, eventName, handler) {
        var handlerWraper = function(event) {
          event = event || window.event;
          if (!event.target && event.srcElement) {
            event.target || event.srcElement;
          }
          return handler.call(obj,event);
        };
        if (obj.addEventListener) {
          obj.addEventListener(eventName, handlerWraper, false);
        } else if (obj.attachEvent) {
          obj.attachEvent('on'+eventName, handlerWraper);
        }
        return handlerWraper;
      }
      return bind;
    })();


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
    	this.image = container.addElem('img', {className : "image", src : this.images[0], alt : "Image dont found"})
      container.addElem('div', {className : "div1"});
      container.addElem('div', {className : "div2"});
    }

    Slider.prototype.changeImg = function(){
    	if (this.step <= 0) {
      	this.currentIndex = this.currentIndex + this.step < 0 ? this.images.length + this.step : this.currentIndex + this.step;
    	} else {
      	this.currentIndex = this.currentIndex + this.step > this.images.length - this.step ? 0 : this.currentIndex + this.step;
    	}
    	this.image.src = this.images[this.currentIndex];
      //animation(fadeIn(this.image, this.swipeSpeed), this.swipeSpeed);
    }

    Slider.prototype.next = function(){
      this.step = 1;
      this.changeImg();
    }

    Slider.prototype.previous = function(){
      this.step = -1;
      this.changeImg();
    }

    Slider.prototype.touchEvents = function(){
      var v_this = this;
      var initialPoint;
      var finalPoint;
      bind(document, 'touchstart', function(event) {
        event.preventDefault();
        event.stopPropagation();
        initialPoint = event.changedTouches[0];
      });
      bind(document, 'touchend', function(event) {
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
    	switch (this.mode) {
        case 'auto':
        setInterval(function(){
          for (var i = 0; i <= v_this.images.length; i += 1) {
            v_this.next();
          }
        }, v_this.swipeDelay)
        break;

        case 'manual':
          bind(document.querySelector('.div1'), 'click', function(){
            v_this.previous();
          });   
          bind(document.querySelector('.div2'), 'click', function(){
            v_this.next();
          });
        break;

        case 'automanual':
          bind(document.querySelector('.div1'), 'click', function(){
            v_this.previous();
          });   
          bind(document.querySelector('.div2'), 'click', function(){
            v_this.next();
          });
          auto();
          var interval = setInterval(function(){
            for (var i = 0; i <= v_this.images.length; i += 1) {
              v_this.next();
            }  
          }, v_this.swipeDelay);

          document.querySelector('.container').onclick = function(event){
            clearInterval(interval);
          }
      break;
      default: break;
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
      mode: 'auto',
      swipeSpeed: 1000,
      swipeDelay: 2000
    });

	}

})();
