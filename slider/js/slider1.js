  'use strict' 

;(function(){
 
 
    function Slider(param){
   		this.images = param.images;
   		this.mode = param.mode;
   		this.swipeSpeed = param.swipeSpeed;
   		this.swipeDelay = param.swipeDelay;
   		this.initSlider();
    }

    Slider.prototype.initSlider = function(){
    	this.currentIndex = 0;
      this.position = 0;
    	this.createSlider();
      this.addOptions();
    	this.addEvents();
      this.touchEvents();
    }

    Slider.prototype.addOptions = function(){
      this.list.style.transition = "margin-left";
      this.list.style.transitionDuration = this.swipeSpeed + "ms"
      this.list.style.transitionDelay = this.swipeDelay + "ms";
    }

    Slider.prototype.createSlider = function(){
      var container = document.body.addElem('div', {className : "container"});
      var gallery = container.addElem('div', {className : "gallery"});
      this.list = gallery.addElem('ul', {className: "image"});
      this.widthOfImage = gallery.clientWidth;
      var imageWidthForStyle = this.widthOfImage/2 + "px";
      for (var i = 0; i < this.images.length; i += 1) {
        this.list.addElem('li', {className: "im"}).addElem('img', {className : "img", src : this.images[i]});     
      } 
      gallery.addElem('div', {className : "navig prev"}).style.width = imageWidthForStyle ;
      gallery.addElem('div', {className : "navig next"}).style.width = imageWidthForStyle ;
      document.querySelector('.next').style.left = imageWidthForStyle;
    }

    Slider.prototype.previous = function(){
      this.currentIndex = this.currentIndex - 1;
      this.position = this.position + this.widthOfImage;
      if (this.currentIndex == -1) {
        var img = document.createElement('li');
        img.className = 'im';
        var im = document.createElement('img');
        img.appendChild(im);
        im.className = 'img';
        im.src = this.images[this.images.length-1]
        var img = this.list.addElem('li', {className: "im"}).addElem('img', {className : "img", src : this.images[this.images.length-1]});
        
        this.list.insertBefore(img, this.list.firstChild);  
        console.log(this.list)
      }
      this.list.style.marginLeft = this.position + "px";
    }

    Slider.prototype.next = function(){
      this.currentIndex = this.currentIndex + 1;
      this.position = this.position - this.widthOfImage;
      if (this.currentIndex >= this.images.length) {
        var i = 0;
        var img = document.createElement('li');
        img.className = 'im';
        var im = document.createElement('img');
        img.appendChild(im);
        im.className = 'img';
        im.src = this.images[i + 1]; 
        this.list.appendChild(img);  
        console.log(this.list)
      }
      this.list.style.marginLeft = this.position + "px";
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
        document.querySelector('.prev').addEventListener('click', function(){
          v_this.previous();
        });   
        document.querySelector('.next').addEventListener('click', function(){
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
      swipeSpeed: 100,
      swipeDelay: 500
    });

	}

})();
