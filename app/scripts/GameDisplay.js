var GameDisplay = function () {
    this.data = {
        head: null,
        body: []
    };
    this.columns = 0;
};

GameDisplay.prototype.headers = function (arr) {
    this.columns = arr.length;
    this.data.head = arr;
};

GameDisplay.prototype.row = function (arr) {
    this.data.body.push(arr);
};

module.exports = GameDisplay;
