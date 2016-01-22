function UndoItem (perform, data) {
    this.perform = perform;
    this.data = data;
}

function Store(self) {
    this.store = [];
    this.current = -1;
    this.self = self;
}

Store.prototype.push = function (perform, data) {
    this.current++;
    this.store.splice(this.current);
    this.store.push(new UndoItem(perform, data));
};

Store.prototype.undo = function () {
    var item;

    if (this.current >= 0) {
        item = this.store[this.current];
        item.perform.call(this.self, false, item.data);
        this.current--;
    } else {
        return false;       
    }
};

Store.prototype.redo = function () {
    var item;

    item = this.store[this.current + 1];
    if (item) {
        item.perform.call(this.self, true, item.data);
        this.current++;
    } else { 
        return false;
    }
};