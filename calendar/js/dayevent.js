;(function(bind, addElem, moveObject){
 
    'use strict' 

    function validateEventTime(value) {
        if (!value) return;
        var regex = /^([0-1][0-9]|[2][0-3])(:([0-5][0-9])){1,2}$/i;
        regex.test(value) ? true : false; 
    }

    function DayEvent(objCallBack) {
        var objCallBack = objCallBack || {};
        this.dayEvent = {};
        this.actionForm = {
            callbackAdd: null,
            callbackRemove: null,
            callbackClose: null
        };
        for (var i in this.actionForm){
            if (this.actionForm.hasOwnProperty(i)) {
                var callback = objCallBack[i];
                if (callback && typeof callback === 'function') {
                    this.actionForm[i] = callback;
                }
            }
        }
        this.init();
    };

    DayEvent.prototype.init = function() {
        this.createForm();
        this.addEvent(); 
        moveObject.move(this.nodeDayEvent);
    };

    DayEvent.prototype.createForm = function() {
        this.nodeDayEvent = document.body.addElem("div", {className: "eventForm"});
        var close = this.nodeDayEvent.addElem("span", {id:"close", innerHTML: "&times"});
        var name = this.nodeDayEvent.addElem("input", {type: "text", id:"eventName", placeholder:"Событие"});
        var date = this.nodeDayEvent.addElem("input", {type: "text", id:"eventDate", placeholder:"Дата", disabled: true});
        var time = this.nodeDayEvent.addElem("input", {type: "text", id:"eventTime", placeholder:"Время"});
        var participants = this.nodeDayEvent.addElem("input", {type: "text", id:"eventParticipants", placeholder:"Участники"});
        var description = this.nodeDayEvent.addElem("input", {type: "textarea", id:"eventDescription", placeholder:"Описание"});
        var add = this.nodeDayEvent.addElem("div", {className:"but", id:"add", innerText: "Добавить"});
        var remove = this.nodeDayEvent.addElem("div", {className:"but", id:"remove", innerText:"Удалить", disabled: true}); 

        this.inputEventForm = {
            name: name,
            date: date,
            time: time, 
            participants: participants,
            description: description             
        };
        this.addEventForm = {
            date: date,
            time: time,
            add: add,
            remove: remove,
            close: close
        };
    }; 


    DayEvent.prototype.addEvent = function(objCallBack) {
        var v_this = this;
        bind(v_this.addEventForm['add'], 'click', function() {
            v_this.setValue();
            v_this.actionForm.callbackAdd(v_this.getValue());
        });
        bind(v_this.addEventForm['remove'], 'click', function() {
            v_this.setValue();
            v_this.actionForm.callbackRemove(v_this.getValue());
        });
        bind(v_this.addEventForm['close'], 'click', function() { 
            v_this.actionForm.callbackClose();
        });
    };

    DayEvent.prototype.setValue = function() {       
        this.dayEvent.name = this.inputEventForm.name.value;
        this.dayEvent.date = this.inputEventForm.date.value;
        if (validateEventTime(this.inputEventForm.time.value)) {
            this.dayEvent.time = this.inputEventForm.time.value;
        } else {
            this.dayEvent.time = '08:00';
        };               
        this.dayEvent.participants = this.inputEventForm.participants.value;
        this.dayEvent.description = this.inputEventForm.description.value; 
    };

    DayEvent.prototype.setDayEvent = function(obj) {
        var obj = obj || {};
        for (var i in this.inputEventForm){
            if (this.inputEventForm.hasOwnProperty(i)) {
                this.inputEventForm[i].value = obj[i] || '';
            }
        }
    };  
 
    DayEvent.prototype.getValue = function() { 
        return this.dayEvent;
    };

    DayEvent.prototype.getDayEvent = function() {
        return this.nodeDayEvent;
    }

    window.DayEvent = DayEvent;

})(window.app.bind, window.htmlHelper, window.moveObject);
