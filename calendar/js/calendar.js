;(function(addElem, mediator, bind, changeClass) {
 
	'use strict'  

	function Calendar(nodeCalendar, nodeControl, date) {
        if (!nodeCalendar || !nodeControl) return;
        this.nodeCalendar = document.querySelector(nodeCalendar);
        this.nodeControl = document.querySelector(nodeControl); 
        this.date = date || new Date();
        this.weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
        this.months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        this.DAYSWEEK = 7;
        this.addEvents();
    }

    Calendar.prototype.clearTable = function(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    };
    
    Calendar.prototype.addEvents = function() {
        var v_this = this;
        var previousMonth = v_this.nodeControl.querySelector('.previousMonth');
        var followingMonth = v_this.nodeControl.querySelector('.followingMonth');
        var currentDay = v_this.nodeControl.querySelector('.current');
        if (!previousMonth || !followingMonth || !currentDay) return;
        mediator.subscribe('createCalendar', function(date) {
            v_this.createCalendar(date); 
            mediator.publish('ShowEvent');
        });
        bind(currentDay, 'click', function() {
            mediator.publish('createCalendar', v_this.getDate());
        });
        bind(followingMonth, 'click', function() {
            mediator.publish('createCalendar', v_this.getFollowingMonth());
        });
        bind(previousMonth, 'click', function() {
            mediator.publish('createCalendar', v_this.getPreviousMonth());
        });
        mediator.publish('createCalendar', new Date());
    };

    Calendar.prototype.createCalendar = function(date) {
        this.date = date;
        if (this.nodeCalendar.firstChild) {
            this.clearTable(this.nodeCalendar);
        }
        var nodeMonth = document.querySelector('.currentMonth');
        if (!nodeMonth) return;
        nodeMonth.innerHTML = this.getMonthName();
        this.createTable();
    };

    Calendar.prototype.getDate = function() {
        return new Date();
    };

    Calendar.prototype.getMonth = function() {
        return this.date.getMonth();
    };

    Calendar.prototype.getYear = function() {
        return this.date.getFullYear();
    };

    Calendar.prototype.getFollowingMonth = function() {   
        return new Date(this.getYear(), this.getMonth() + 1, 1);
    };

    Calendar.prototype.getPreviousMonth = function() {
        return new Date(this.getYear(), this.getMonth() - 1, 1);
    };

    Calendar.prototype.getMonthName = function() {
        return this.months[this.getMonth()];
    };

    Calendar.prototype.getLastDayMonth = function() {
        return new Date(this.getYear(), this.getMonth() + 1, 0).getDate();
    };

    Calendar.prototype.getFirstDayMonth = function() {
        var firstDay = new Date(this.getYear(), this.getMonth(), 1);       
        return (firstDay.getDay() === 0) ? this.DAYSWEEK : firstDay.getDay();
    };

    Calendar.prototype.getTotalDays = function() {
        return this.getLastDayMonth();
    };

    Calendar.prototype.fullCell = function(td, day) {
        var div = td.addElem('div', {innerHTML: day, className : 'day'})
        if (td) {
            td.id = this.getYear() + '-' + (this.getMonth() + 1) + '-' + day;                                     
            this.currentDay(td, day);
        }
    };

    Calendar.prototype.currentDay = function(td, day) {
        var today = new Date();
        if (this.getYear() == today.getFullYear() && this.getMonth() == today.getMonth() && day == today.getDate()) {
            if (changeClass) {
                changeClass.addClass(td, 'today');
            }
            td.className = 'today';                     
        }
    };

    Calendar.prototype.emptyCell = function(td) {
        if (changeClass) {
            changeClass.addClass(td, 'empty');
        }
        td.className = 'empty';
    };

    Calendar.prototype.createTable = function() {
        var i;
        var table,
            td,
            tr,
            th;
        var countDays = 0;
        var totalDays = this.getTotalDays();

        table = this.nodeCalendar.addElem('table')
        tr = table.addElem('tr');  
        for (i = 0; i < this.DAYSWEEK; i += 1) {
            th = tr.addElem('th');
            var span = th.addElem('span', {innerHTML: this.weekDays[i]});
        }   
        tr = table.addElem('tr');
        for (i = 1; i <= this.DAYSWEEK; i += 1) {
            td = tr.addElem('td');                                           
            if (i < this.getFirstDayMonth(this.date)) {
                this.emptyCell(td);
            } else {
                this.fullCell(td, countDays += 1);
            }
        }
        while (countDays < totalDays) {
            tr = table.addElem('tr')
            for (i = 0; i < this.DAYSWEEK; i += 1) {
                td = tr.addElem('td');
                if (countDays < totalDays) {
                    this.fullCell(td, countDays += 1);
                } else {
                    this.emptyCell(td);
                }
            }                                            
        }
    };

    window.Calendar = Calendar;

})(window.htmlHelper, window.app.mediator, window.app.bind);
